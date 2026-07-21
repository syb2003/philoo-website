const EMAIL_MAX_LENGTH = 254;
const GUIDE_FORM_SOURCE = "landing-page-email-form";
const WEBHOOK_TIMEOUT_MS = 8_000;
const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type GuideLeadRequest = {
  email?: unknown;
  website?: unknown;
  source?: unknown;
  referrer?: unknown;
  attribution?: unknown;
};

type GuideAttribution = Record<(typeof utmKeys)[number], string>;

function jsonResponse(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(email: string) {
  if (!email || email.length > EMAIL_MAX_LENGTH || email.includes("..")) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function normalizeAttribution(attribution: unknown): GuideAttribution {
  const source = attribution && typeof attribution === "object" && !Array.isArray(attribution) ? attribution : {};
  const values = source as Partial<Record<(typeof utmKeys)[number], unknown>>;

  return Object.fromEntries(
    utmKeys.map((key) => [key, cleanString(values[key], 300).toLowerCase()]),
  ) as GuideAttribution;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ ok: false, error: "Ongeldig verzoek." }, 415);
  }

  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "Ongeldig verzoek." }, 400);
  }

  if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
    return jsonResponse({ ok: false, error: "Ongeldig verzoek." }, 400);
  }

  const body = rawBody as GuideLeadRequest;
  const honeypot = cleanString(body.website, 200);

  if (honeypot) {
    return jsonResponse({ ok: true }, 200);
  }

  const email = cleanString(body.email, EMAIL_MAX_LENGTH).toLowerCase();

  if (!isValidEmail(email)) {
    return jsonResponse({ ok: false, error: "Vul een geldig e-mailadres in." }, 422);
  }

  const attribution = normalizeAttribution(body.attribution);
  const webhookUrl = cleanString(process.env.GOOGLE_SHEETS_WEBHOOK_URL, 2_048);
  const webhookSecret = cleanString(process.env.GOOGLE_SHEETS_WEBHOOK_SECRET, 1_000);

  if (!webhookUrl || !webhookSecret) {
    return jsonResponse({ ok: false, error: "De gids kon niet worden klaargezet." }, 500);
  }

  const payload = {
    secret: webhookSecret,
    type: "lead",
    email,
    source: GUIDE_FORM_SOURCE,
    referrer: "",
    attribution,
  };

  try {
    const upstreamResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    const upstreamBody = await upstreamResponse.text();

    if (!upstreamResponse.ok) {
      return jsonResponse({ ok: false, error: "De gids kon niet worden klaargezet." }, 502);
    }

    let upstreamJson: unknown;

    try {
      upstreamJson = JSON.parse(upstreamBody);
    } catch {
      return jsonResponse({ ok: false, error: "De gids kon niet worden klaargezet." }, 502);
    }

    if (!upstreamJson || typeof upstreamJson !== "object" || Array.isArray(upstreamJson) || (upstreamJson as { ok?: unknown }).ok !== true) {
      return jsonResponse({ ok: false, error: "De gids kon niet worden klaargezet." }, 502);
    }
  } catch {
    return jsonResponse({ ok: false, error: "De gids kon niet worden klaargezet." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
