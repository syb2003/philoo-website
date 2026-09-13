import {
  notificationFailureCode,
  sendScoutUpdatesNotification,
  type ScoutUpdateLead,
} from "../../../lib/scoutUpdatesNotification.ts";

const TEXT_MAX_LENGTH = 300;
const NAME_MAX_LENGTH = 120;
const COMPANY_MAX_LENGTH = 160;
const EMAIL_MAX_LENGTH = 254;
const WEBHOOK_TIMEOUT_MS = 8_000;
const interestTypes = ["cvstudio_early_access", "autosourcer_interest", "scout_updates"] as const;
const languages = ["nl", "en"] as const;
type InterestRequest = Record<string, unknown>;

const sheetSchema = {
  leadsTab: "Leads",
  eventsTab: "Events",
  leadHeaders: ["Timestamp", "Email", "First source", "Last source", "First UTM source", "Last UTM source", "First UTM medium", "Last UTM medium", "First UTM campaign", "Last UTM campaign", "First UTM content", "Last UTM content", "First UTM term", "Last UTM term", "First referrer", "Last referrer", "Request count"],
  eventHeaders: ["Timestamp", "Event", "Source", "Email", "UTM source", "UTM medium", "UTM campaign", "UTM content", "UTM term", "Referrer", "Page"],
} as const;

function respond(body: Record<string, unknown>, status: number) { return Response.json(body, { status, headers: { "cache-control": "no-store" } }); }
function clean(value: unknown, maxLength = TEXT_MAX_LENGTH) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }
function emailValid(email: string) { return Boolean(email) && email.length <= EMAIL_MAX_LENGTH && !email.includes("..") && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); }
function attribution(value: unknown) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  return {
    landing_page: clean(source.landing_page, 300),
    utm_source: clean(source.utm_source).toLowerCase(),
    utm_medium: clean(source.utm_medium).toLowerCase(),
    utm_campaign: clean(source.utm_campaign).toLowerCase(),
    utm_content: clean(source.utm_content).toLowerCase(),
    utm_term: clean(source.utm_term).toLowerCase(),
  };
}

async function callSheetsWebhook(webhookUrl: string, webhookSecret: string, payload: Record<string, unknown>) {
  const upstream = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json", "x-webhook-secret": webhookSecret },
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });
  if (!upstream.ok) throw new Error("Google Sheets webhook failed");
  const text = await upstream.text();
  if (text) {
    const result: unknown = JSON.parse(text);
    if (!result || typeof result !== "object" || (result as { ok?: unknown }).ok !== true) throw new Error("Google Sheets webhook rejected request");
  }
}

async function recordNotificationStatus(
  webhookUrl: string,
  webhookSecret: string,
  lead: ScoutUpdateLead,
  event: string,
) {
  await callSheetsWebhook(webhookUrl, webhookSecret, {
    action: "record_event",
    event: {
      event,
      source: lead.interest_type,
      email: lead.email,
      attribution: {
        utm_source: lead.utm_source,
        utm_medium: lead.utm_medium,
        utm_campaign: lead.utm_campaign,
        utm_content: lead.utm_content,
        utm_term: lead.utm_term,
      },
      referrer: lead.referrer,
      page: lead.page_path,
      timestamp: lead.timestamp,
    },
    secret: webhookSecret,
    schema: sheetSchema,
  });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return respond({ ok: false, error: "Invalid request." }, 415);
  let body: InterestRequest;
  try { const parsed: unknown = await request.json(); if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(); body = parsed as InterestRequest; } catch { return respond({ ok: false, error: "Invalid request." }, 400); }
  if (clean(body.website, 200)) return respond({ ok: true }, 200);
  const name = clean(body.name, NAME_MAX_LENGTH);
  const email = clean(body.email, EMAIL_MAX_LENGTH).toLowerCase();
  const company = clean(body.company, COMPANY_MAX_LENGTH);
  const interestType = clean(body.interest_type, 80);
  const language = clean(body.language, 8);
  const knownInterestType = interestTypes.includes(interestType as (typeof interestTypes)[number]);
  const scoutUpdate = interestType === "scout_updates";
  if ((!scoutUpdate && (!name || !company)) || !emailValid(email) || !knownInterestType || !languages.includes(language as (typeof languages)[number])) return respond({ ok: false, error: "Please check the required fields." }, 422);
  const webhookUrl = clean(process.env.GOOGLE_SHEETS_WEBHOOK_URL, 2_048);
  const webhookSecret = clean(process.env.GOOGLE_SHEETS_WEBHOOK_SECRET, 1_000);
  if (!webhookUrl || !webhookSecret) return respond({ ok: false, error: "The form is not configured yet." }, 500);
  const lead: ScoutUpdateLead = { name, email, company, interest_type: interestType, language, page_path: clean(body.page_path, 300), referrer: clean(body.referrer, 300), ...attribution(body.attribution), timestamp: new Date().toISOString() };
  try {
    await callSheetsWebhook(webhookUrl, webhookSecret, { type: "lead", source: interestType, secret: webhookSecret, ...lead });
  } catch { return respond({ ok: false, error: "We could not send your request. Please try again." }, 502); }

  if (!scoutUpdate) return respond({ ok: true, stored: true }, 200);

  try {
    const notification = await sendScoutUpdatesNotification(lead);
    console.info("Scout updates notification accepted", {
      email,
      messageId: notification.messageId,
      provider: notification.provider,
    });
    try {
      await recordNotificationStatus(webhookUrl, webhookSecret, lead, "scout_updates_notification_accepted");
    } catch (statusError) {
      console.error("Could not record Scout notification acceptance", { email, error: String(statusError) });
    }
    return respond({ ok: true, stored: true, notification: { status: "accepted", provider: notification.provider, messageId: notification.messageId } }, 200);
  } catch (error) {
    const failureCode = notificationFailureCode(error);
    console.error("Scout updates notification failed", { email, failureCode, error: String(error) });
    try {
      await recordNotificationStatus(webhookUrl, webhookSecret, lead, `scout_updates_notification_failed_${failureCode}`);
    } catch (statusError) {
      console.error("Could not record Scout notification failure", { email, failureCode, error: String(statusError) });
    }
    return respond({ ok: true, stored: true, notification: { status: "failed", failureCode } }, 202);
  }
}
