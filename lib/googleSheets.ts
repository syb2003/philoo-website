import "server-only";

const TEXT_MAX_LENGTH = 300;
const REFERRER_MAX_LENGTH = 300;
const WEBHOOK_TIMEOUT_MS = 8_000;

export const GUIDE_DOWNLOAD_PATH = "/downloads/meer-plaatsingen-met-hetzelfde-team-philoo.pdf";

export const leadHeaders = [
  "Timestamp",
  "Email",
  "First source",
  "Last source",
  "First UTM source",
  "Last UTM source",
  "First UTM medium",
  "Last UTM medium",
  "First UTM campaign",
  "Last UTM campaign",
  "First UTM content",
  "Last UTM content",
  "First UTM term",
  "Last UTM term",
  "First referrer",
  "Last referrer",
  "Request count",
] as const;

export const eventHeaders = [
  "Timestamp",
  "Event",
  "Source",
  "Email",
  "UTM source",
  "UTM medium",
  "UTM campaign",
  "UTM content",
  "UTM term",
  "Referrer",
  "Page",
] as const;

export type GuideAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

export type GuideEventName =
  | "guide_direct_download_clicked"
  | "guide_email_submitted"
  | "guide_email_form_download_started";

export type SiteAnalyticsEventName =
  | "site_page_view"
  | "homepage_maatwerk_click"
  | "homepage_cvstudio_click"
  | "homepage_autosourcer_click"
  | "calendly_cta_click"
  | "cvstudio_page_view"
  | "cvstudio_demo_play"
  | "cvstudio_demo_50"
  | "cvstudio_demo_complete"
  | "cvstudio_early_access_click"
  | "cvstudio_early_access_submit"
  | "autosourcer_page_view"
  | "autosourcer_interest_click"
  | "autosourcer_interest_submit";

export type GuideEventInput = {
  event: GuideEventName | SiteAnalyticsEventName;
  source: string;
  email?: string;
  attribution: GuideAttribution;
  referrer: string;
  page: string;
  timestamp?: string;
};

export type GuideLeadInput = {
  email: string;
  source: string;
  attribution: GuideAttribution;
  referrer: string;
  page: string;
};

type GuideWebhookPayload =
  | {
      action: "record_event";
      event: GuideEventInput;
    }
  | {
      action: "record_lead";
      lead: GuideLeadInput;
      event: GuideEventInput;
    };

type GuideWebhookRequest = GuideWebhookPayload & {
  secret: string;
  schema: {
    leadsTab: "Leads";
    eventsTab: "Events";
    leadHeaders: readonly string[];
    eventHeaders: readonly string[];
  };
};

function cleanString(value: unknown, maxLength = TEXT_MAX_LENGTH) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeUtm(value: string) {
  return value.trim().toLowerCase().slice(0, TEXT_MAX_LENGTH);
}

function normalizeReferrer(value: string) {
  if (!value) {
    return "";
  }

  try {
    return new URL(value).hostname.replace(/^www\./, "").toLowerCase().slice(0, REFERRER_MAX_LENGTH);
  } catch {
    return "";
  }
}

export function normalizeAttribution(attribution: unknown): GuideAttribution {
  const source = attribution && typeof attribution === "object" && !Array.isArray(attribution) ? attribution : {};
  const values = source as Partial<Record<keyof GuideAttribution, unknown>>;

  return {
    utm_source: normalizeUtm(cleanString(values.utm_source)),
    utm_medium: normalizeUtm(cleanString(values.utm_medium)),
    utm_campaign: normalizeUtm(cleanString(values.utm_campaign)),
    utm_content: normalizeUtm(cleanString(values.utm_content)),
    utm_term: normalizeUtm(cleanString(values.utm_term)),
  };
}

export function normalizeGuideReferrer(value: unknown) {
  return normalizeReferrer(cleanString(value, 2_048));
}

export function resolveDownloadSource(attribution: GuideAttribution, referrer: string) {
  if (attribution.utm_source) {
    return attribution.utm_source;
  }

  if (referrer.includes("linkedin.")) {
    return "linkedin";
  }

  if (referrer.includes("google.")) {
    return "google";
  }

  if (referrer) {
    return referrer;
  }

  return "direct";
}

function getWebhookConfig() {
  const url = cleanString(process.env.GOOGLE_SHEETS_WEBHOOK_URL, 2_048);
  const secret = cleanString(process.env.GOOGLE_SHEETS_WEBHOOK_SECRET, 1_000);

  if (!url || !secret) {
    throw new Error("Missing Google Sheets guide configuration");
  }

  return { url, secret };
}

async function callGuideWebhook(payload: GuideWebhookPayload) {
  const { url, secret } = getWebhookConfig();
  const requestBody: GuideWebhookRequest = {
    ...payload,
    secret,
    schema: {
      leadsTab: "Leads",
      eventsTab: "Events",
      leadHeaders,
      eventHeaders,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-webhook-secret": secret,
    },
    body: JSON.stringify(requestBody),
    cache: "no-store",
    signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error("Google Sheets webhook failed");
  }

  const responseText = await response.text();

  if (!responseText) {
    return;
  }

  try {
    const responseJson = JSON.parse(responseText) as { ok?: unknown; success?: unknown; error?: unknown };

    if (responseJson.ok === false || responseJson.success === false || responseJson.error) {
      throw new Error("Google Sheets webhook rejected request");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return;
    }

    throw error;
  }
}

export async function recordGuideDirectDownload(input: Omit<GuideEventInput, "event" | "email">) {
  await callGuideWebhook({
    action: "record_event",
    event: {
      ...input,
      event: "guide_direct_download_clicked",
      email: "",
      timestamp: input.timestamp ?? new Date().toISOString(),
    },
  });
}

export async function recordGuideLead(input: GuideLeadInput) {
  const timestamp = new Date().toISOString();

  await callGuideWebhook({
    action: "record_lead",
    lead: input,
    event: {
      event: "guide_email_submitted",
      source: input.source,
      email: input.email,
      attribution: input.attribution,
      referrer: input.referrer,
      page: input.page,
      timestamp,
    },
  });
}

export async function recordGuideFormDownloadStarted(input: Omit<GuideEventInput, "event">) {
  await callGuideWebhook({
    action: "record_event",
    event: {
      ...input,
      event: "guide_email_form_download_started",
      timestamp: input.timestamp ?? new Date().toISOString(),
    },
  });
}

export async function recordSiteAnalyticsEvent(input: Omit<GuideEventInput, "event" | "email"> & { event: SiteAnalyticsEventName }) {
  await callGuideWebhook({
    action: "record_event",
    event: {
      ...input,
      email: "",
      timestamp: input.timestamp ?? new Date().toISOString(),
    },
  });
}
