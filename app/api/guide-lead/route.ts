const PUBLIC_SITE_URL = "https://www.philoo.nl";
const GUIDE_SLUG = "meer-plaatsingen-met-hetzelfde-team";
const GUIDE_TITLE = "Minder administratie. Meer plaatsingen.";
const EMAIL_MAX_LENGTH = 254;
const WEBHOOK_TIMEOUT_MS = 8_000;
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

type GuideLeadRequest = {
  email?: unknown;
  website?: unknown;
  page?: {
    referrer?: unknown;
  };
  attribution?: Partial<Record<(typeof attributionKeys)[number], unknown>>;
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
    },
  });
}

function isValidEmail(email: string) {
  if (!email || email.length > EMAIL_MAX_LENGTH || email.includes("..")) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
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

  const webhookUrl = process.env.GUIDE_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return jsonResponse({ ok: false, error: "De e-mailservice is niet beschikbaar." }, 503);
  }

  const attribution = Object.fromEntries(
    attributionKeys.map((key) => [key, cleanString(body.attribution?.[key], 200)]),
  );
  const payload = {
    event: "guide_requested",
    email,
    guide: {
      slug: GUIDE_SLUG,
      title: GUIDE_TITLE,
      downloadUrl: `${PUBLIC_SITE_URL}/downloads/meer-plaatsingen-met-hetzelfde-team-philoo.pdf`,
    },
    source: "guide-email-form",
    page: {
      path: `/${GUIDE_SLUG}`,
      url: `${PUBLIC_SITE_URL}/${GUIDE_SLUG}`,
      referrer: cleanString(body.page?.referrer, 2_048),
    },
    attribution,
    submittedAt: new Date().toISOString(),
  };
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  const webhookSecret = process.env.GUIDE_LEAD_WEBHOOK_SECRET;

  if (webhookSecret) {
    headers["x-webhook-secret"] = webhookSecret;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      return jsonResponse({ ok: false, error: "De gids kon niet worden verstuurd." }, 502);
    }
  } catch {
    return jsonResponse({ ok: false, error: "De gids kon niet worden verstuurd." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
