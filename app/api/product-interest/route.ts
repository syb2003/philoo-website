const TEXT_MAX_LENGTH = 300;
const NAME_MAX_LENGTH = 120;
const COMPANY_MAX_LENGTH = 160;
const EMAIL_MAX_LENGTH = 254;
const WEBHOOK_TIMEOUT_MS = 8_000;
const interestTypes = ["cvstudio_early_access", "autosourcer_interest"] as const;
const languages = ["nl", "en"] as const;
const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type InterestRequest = Record<string, unknown>;

function respond(body: Record<string, unknown>, status: number) { return Response.json(body, { status, headers: { "cache-control": "no-store" } }); }
function clean(value: unknown, maxLength = TEXT_MAX_LENGTH) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }
function emailValid(email: string) { return Boolean(email) && email.length <= EMAIL_MAX_LENGTH && !email.includes("..") && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email); }
function attribution(value: unknown) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  return {
    landing_page: clean(source.landing_page, 300),
    ...Object.fromEntries(utmKeys.map((key) => [key, clean(source[key]).toLowerCase()])),
  };
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
  if (!name || !company || !emailValid(email) || !interestTypes.includes(interestType as (typeof interestTypes)[number]) || !languages.includes(language as (typeof languages)[number])) return respond({ ok: false, error: "Please check the required fields." }, 422);
  const webhookUrl = clean(process.env.GOOGLE_SHEETS_WEBHOOK_URL, 2_048);
  const webhookSecret = clean(process.env.GOOGLE_SHEETS_WEBHOOK_SECRET, 1_000);
  if (!webhookUrl || !webhookSecret) return respond({ ok: false, error: "The form is not configured yet." }, 500);
  const lead = { name, email, company, interest_type: interestType, language, page_path: clean(body.page_path, 300), referrer: clean(body.referrer, 300), ...attribution(body.attribution), timestamp: new Date().toISOString() };
  try {
    const upstream = await fetch(webhookUrl, { method: "POST", headers: { "content-type": "application/json", "x-webhook-secret": webhookSecret }, body: JSON.stringify({ type: "lead", source: interestType, secret: webhookSecret, ...lead }), cache: "no-store", signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS) });
    if (!upstream.ok) throw new Error();
    const text = await upstream.text();
    if (text) { const result: unknown = JSON.parse(text); if (!result || typeof result !== "object" || (result as { ok?: unknown }).ok !== true) throw new Error(); }
  } catch { return respond({ ok: false, error: "We could not send your request. Please try again." }, 502); }
  return respond({ ok: true }, 200);
}
