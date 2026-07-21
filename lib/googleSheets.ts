import "server-only";

import { google, type sheets_v4 } from "googleapis";

const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TEXT_MAX_LENGTH = 300;
const REFERRER_MAX_LENGTH = 300;

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

export type GuideEventInput = {
  event: GuideEventName;
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

type GoogleSheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
};

type SheetsContext = {
  sheets: sheets_v4.Sheets;
  spreadsheetId: string;
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

function getGoogleSheetsConfig(): GoogleSheetsConfig {
  const clientEmail = cleanString(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, 500);
  const privateKey = cleanString(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, 10_000).replace(/\\n/g, "\n");
  const spreadsheetId = cleanString(process.env.GUIDE_SPREADSHEET_ID, 200);

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Missing Google Sheets guide configuration");
  }

  return {
    clientEmail,
    privateKey,
    spreadsheetId,
  };
}

async function getSheetsContext(): Promise<SheetsContext> {
  const config = getGoogleSheetsConfig();
  const auth = new google.auth.JWT({
    email: config.clientEmail,
    key: config.privateKey,
    scopes: [GOOGLE_SHEETS_SCOPE],
  });

  return {
    sheets: google.sheets({ version: "v4", auth }),
    spreadsheetId: config.spreadsheetId,
  };
}

async function ensureSheetExists(context: SheetsContext, title: string, existingTitles: Set<string>) {
  if (existingTitles.has(title)) {
    return;
  }

  await context.sheets.spreadsheets.batchUpdate({
    spreadsheetId: context.spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title,
            },
          },
        },
      ],
    },
  });

  existingTitles.add(title);
}

async function ensureHeaderRow(context: SheetsContext, title: string, headers: readonly string[]) {
  const response = await context.sheets.spreadsheets.values.get({
    spreadsheetId: context.spreadsheetId,
    range: `${title}!1:1`,
  });

  if ((response.data.values ?? []).length > 0) {
    return;
  }

  await context.sheets.spreadsheets.values.update({
    spreadsheetId: context.spreadsheetId,
    range: `${title}!A1`,
    valueInputOption: "RAW",
    requestBody: {
      values: [Array.from(headers)],
    },
  });
}

async function ensureGuideSheets(context: SheetsContext) {
  const response = await context.sheets.spreadsheets.get({
    spreadsheetId: context.spreadsheetId,
    fields: "sheets(properties(title))",
  });
  const existingTitles = new Set((response.data.sheets ?? []).map((sheet) => sheet.properties?.title).filter(Boolean) as string[]);

  await ensureSheetExists(context, "Leads", existingTitles);
  await ensureSheetExists(context, "Events", existingTitles);
  await ensureHeaderRow(context, "Leads", leadHeaders);
  await ensureHeaderRow(context, "Events", eventHeaders);
}

async function appendEvent(context: SheetsContext, input: GuideEventInput) {
  const timestamp = input.timestamp ?? new Date().toISOString();

  await context.sheets.spreadsheets.values.append({
    spreadsheetId: context.spreadsheetId,
    range: "Events!A:K",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          timestamp,
          input.event,
          input.source,
          input.email ?? "",
          input.attribution.utm_source,
          input.attribution.utm_medium,
          input.attribution.utm_campaign,
          input.attribution.utm_content,
          input.attribution.utm_term,
          input.referrer,
          input.page,
        ],
      ],
    },
  });
}

function parseRequestCount(value: unknown) {
  const parsed = Number.parseInt(typeof value === "string" ? value : "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

async function upsertLead(context: SheetsContext, input: GuideLeadInput, timestamp: string) {
  const response = await context.sheets.spreadsheets.values.get({
    spreadsheetId: context.spreadsheetId,
    range: "Leads!A:Q",
  });
  const rows = response.data.values ?? [];
  const existingIndex = rows.findIndex((row, index) => index > 0 && String(row[1] ?? "").toLowerCase() === input.email);

  if (existingIndex === -1) {
    await context.sheets.spreadsheets.values.append({
      spreadsheetId: context.spreadsheetId,
      range: "Leads!A:Q",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            timestamp,
            input.email,
            input.source,
            input.source,
            input.attribution.utm_source,
            input.attribution.utm_source,
            input.attribution.utm_medium,
            input.attribution.utm_medium,
            input.attribution.utm_campaign,
            input.attribution.utm_campaign,
            input.attribution.utm_content,
            input.attribution.utm_content,
            input.attribution.utm_term,
            input.attribution.utm_term,
            input.referrer,
            input.referrer,
            "1",
          ],
        ],
      },
    });
    return;
  }

  const rowNumber = existingIndex + 1;
  const row = rows[existingIndex] ?? [];
  const updated = Array.from({ length: leadHeaders.length }, (_, index) => String(row[index] ?? ""));

  updated[0] = timestamp;
  updated[3] = input.source;
  updated[5] = input.attribution.utm_source;
  updated[7] = input.attribution.utm_medium;
  updated[9] = input.attribution.utm_campaign;
  updated[11] = input.attribution.utm_content;
  updated[13] = input.attribution.utm_term;
  updated[15] = input.referrer;
  updated[16] = String(parseRequestCount(row[16]) + 1);

  await context.sheets.spreadsheets.values.update({
    spreadsheetId: context.spreadsheetId,
    range: `Leads!A${rowNumber}:Q${rowNumber}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [updated],
    },
  });
}

export async function recordGuideDirectDownload(input: Omit<GuideEventInput, "event" | "email">) {
  const context = await getSheetsContext();

  await ensureGuideSheets(context);
  await appendEvent(context, {
    ...input,
    event: "guide_direct_download_clicked",
    email: "",
  });
}

export async function recordGuideLead(input: GuideLeadInput) {
  const context = await getSheetsContext();
  const timestamp = new Date().toISOString();

  await ensureGuideSheets(context);
  await upsertLead(context, input, timestamp);

  try {
    await appendEvent(context, {
      event: "guide_email_submitted",
      source: input.source,
      email: input.email,
      attribution: input.attribution,
      referrer: input.referrer,
      page: input.page,
      timestamp,
    });
  } catch {
    console.warn("Guide lead stored, but guide_email_submitted event append failed.");
  }
}

export async function recordGuideFormDownloadStarted(input: Omit<GuideEventInput, "event">) {
  const context = await getSheetsContext();

  await ensureGuideSheets(context);
  await appendEvent(context, {
    ...input,
    event: "guide_email_form_download_started",
  });
}
