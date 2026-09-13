import { createHash } from "node:crypto";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const EMAIL_TIMEOUT_MS = 8_000;
const NOTIFICATION_TO = "hello@philoo.nl";
const DEFAULT_TIME_ZONE = "Europe/Amsterdam";

export type ScoutUpdateLead = {
  name: string;
  email: string;
  company: string;
  interest_type: string;
  language: string;
  page_path: string;
  referrer: string;
  landing_page: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  timestamp: string;
};

export type NotificationFailureCode = "configuration" | "network" | "provider_rejected" | "invalid_response";

export class ScoutNotificationError extends Error {
  readonly code: NotificationFailureCode;

  constructor(
    message: string,
    code: NotificationFailureCode,
  ) {
    super(message);
    this.name = "ScoutNotificationError";
    this.code = code;
  }
}

function clean(value: string) {
  return value.trim();
}

function configuredSender() {
  const apiKey = clean(process.env.RESEND_API_KEY ?? "");
  const from = clean(process.env.SCOUT_UPDATES_NOTIFICATION_FROM ?? "");

  if (!apiKey || !from) {
    throw new ScoutNotificationError(
      "RESEND_API_KEY and SCOUT_UPDATES_NOTIFICATION_FROM are required.",
      "configuration",
    );
  }

  const address = (from.match(/<([^<>]+)>$/)?.[1] ?? from).trim().toLowerCase();
  if (!address.endsWith("@philoo.nl")) {
    throw new ScoutNotificationError(
      "SCOUT_UPDATES_NOTIFICATION_FROM must be a verified @philoo.nl sender.",
      "configuration",
    );
  }

  const timeZone = clean(process.env.SCOUT_UPDATES_NOTIFICATION_TIME_ZONE ?? DEFAULT_TIME_ZONE);
  try {
    new Intl.DateTimeFormat("nl-NL", { timeZone }).format(new Date());
  } catch {
    throw new ScoutNotificationError(
      "SCOUT_UPDATES_NOTIFICATION_TIME_ZONE is not a valid IANA time zone.",
      "configuration",
    );
  }

  return { apiKey, from, timeZone };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formattedDate(timestamp: string, timeZone: string) {
  return `${new Intl.DateTimeFormat("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).format(new Date(timestamp))} (${timeZone})`;
}

function messageRows(lead: ScoutUpdateLead, timeZone: string) {
  const rows: Array<[string, string]> = [];
  if (lead.name) rows.push(["Naam", lead.name]);
  rows.push(["E-mailadres", lead.email]);
  if (lead.company) rows.push(["Bedrijf", lead.company]);
  rows.push(["Datum en tijd", formattedDate(lead.timestamp, timeZone)]);
  rows.push(["Pagina", lead.page_path || "Niet geregistreerd"]);
  if (lead.language) rows.push(["Taal", lead.language.toUpperCase()]);
  if (lead.referrer) rows.push(["Verwijzer", lead.referrer]);
  if (lead.landing_page) rows.push(["Eerste landingspagina", lead.landing_page]);
  if (lead.utm_source) rows.push(["UTM-bron", lead.utm_source]);
  if (lead.utm_medium) rows.push(["UTM-medium", lead.utm_medium]);
  if (lead.utm_campaign) rows.push(["UTM-campagne", lead.utm_campaign]);
  if (lead.utm_content) rows.push(["UTM-content", lead.utm_content]);
  if (lead.utm_term) rows.push(["UTM-term", lead.utm_term]);
  return rows;
}

function idempotencyKey(lead: ScoutUpdateLead) {
  const calendarDay = lead.timestamp.slice(0, 10);
  const fingerprint = createHash("sha256")
    .update([lead.interest_type, lead.email, lead.page_path, calendarDay].join("|"))
    .digest("hex")
    .slice(0, 40);
  return `scout-updates/${calendarDay}/${fingerprint}`;
}

export function notificationFailureCode(error: unknown): NotificationFailureCode {
  return error instanceof ScoutNotificationError ? error.code : "network";
}

export async function sendScoutUpdatesNotification(lead: ScoutUpdateLead) {
  const { apiKey, from, timeZone } = configuredSender();
  const rows = messageRows(lead, timeZone);
  const text = [
    "Nieuwe aanmelding voor Scout-updates",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const htmlRows = rows
    .map(([label, value]) => `<tr><th align="left" style="padding:6px 16px 6px 0;color:#596180;vertical-align:top">${escapeHtml(label)}</th><td style="padding:6px 0;color:#091238">${escapeHtml(value)}</td></tr>`)
    .join("");

  let response: Response;
  try {
    response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "idempotency-key": idempotencyKey(lead),
      },
      body: JSON.stringify({
        from,
        to: [NOTIFICATION_TO],
        reply_to: lead.email,
        subject: "Nieuwe aanmelding voor Scout-updates",
        text,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.5"><h1 style="font-size:22px;color:#091238">Nieuwe aanmelding voor Scout-updates</h1><table role="presentation" style="border-collapse:collapse">${htmlRows}</table></div>`,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });
  } catch {
    throw new ScoutNotificationError("The Resend request could not be completed.", "network");
  }

  if (!response.ok) {
    throw new ScoutNotificationError(`Resend rejected the message with status ${response.status}.`, "provider_rejected");
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new ScoutNotificationError("Resend returned an invalid response.", "invalid_response");
  }

  const messageId = result && typeof result === "object" && typeof (result as { id?: unknown }).id === "string"
    ? (result as { id: string }).id
    : "";
  if (!messageId) {
    throw new ScoutNotificationError("Resend did not return a message ID.", "invalid_response");
  }

  return {
    provider: "resend" as const,
    status: "accepted" as const,
    messageId,
    recipient: NOTIFICATION_TO,
  };
}
