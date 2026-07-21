import { Resend } from "resend";

const PUBLIC_SITE_URL = "https://www.philoo.nl";
const GUIDE_DOWNLOAD_URL = `${PUBLIC_SITE_URL}/downloads/meer-plaatsingen-met-hetzelfde-team-philoo.pdf`;
const GUIDE_EMAIL_SUBJECT = "Hier is de gids: Meer plaatsingen met hetzelfde team";
const GUIDE_REPLY_TO = "syb@philoo.nl";
const DEFAULT_NOTIFICATION_EMAIL = "syb@philoo.nl";
const EMAIL_MAX_LENGTH = 254;

type GuideLeadRequest = {
  email?: unknown;
  website?: unknown;
};

type SendGuideEmailInput = {
  apiKey: string;
  email: string;
  from: string;
  notificationEmail: string;
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

function buildGuideEmailText() {
  return `Hi,

Zoals beloofd: hieronder vind je de gids Meer plaatsingen met hetzelfde team.

In 5–10 minuten zie je waar recruitmentbureaus tijd verliezen, welke werkzaamheden steeds terugkomen en waar de meeste winst te behalen is.

Download de gids:
${GUIDE_DOWNLOAD_URL}

Benieuwd waar jullie team nu de meeste tijd aan kwijt is? Je kunt gewoon op deze e-mail reageren.

Groet,

Syb
Philoo
${PUBLIC_SITE_URL}`;
}

function buildGuideEmailHtml() {
  return `<!doctype html>
<html lang="nl">
  <body style="margin:0;background:#F7F8FA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#0F1736;">
    <div style="margin:0 auto;max-width:620px;border:1px solid #E6E8EF;border-radius:16px;background:#FFFFFF;padding:32px;box-shadow:0 18px 50px rgba(15,23,54,0.08);">
      <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#0F1736;">Hi,</p>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#0F1736;">Zoals beloofd: hieronder vind je de gids <strong>Meer plaatsingen met hetzelfde team</strong>.</p>
      <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:#0F1736;">In 5–10 minuten zie je waar recruitmentbureaus tijd verliezen, welke werkzaamheden steeds terugkomen en waar de meeste winst te behalen is.</p>
      <p style="margin:0 0 24px;">
        <a href="${GUIDE_DOWNLOAD_URL}" style="display:inline-block;border-radius:10px;background:#161851;padding:14px 22px;color:#FFFFFF;font-size:16px;font-weight:700;text-decoration:none;">Download de gids</a>
      </p>
      <p style="margin:0 0 28px;font-size:14px;line-height:1.6;color:#0F1736;">Werkt de knop niet? Gebruik dan deze link:<br><a href="${GUIDE_DOWNLOAD_URL}" style="color:#161851;text-decoration:underline;">${GUIDE_DOWNLOAD_URL}</a></p>
      <p style="margin:0 0 28px;font-size:16px;line-height:1.65;color:#0F1736;">Benieuwd waar jullie team nu de meeste tijd aan kwijt is? Je kunt gewoon op deze e-mail reageren.</p>
      <p style="margin:0;font-size:16px;line-height:1.65;color:#0F1736;">Groet,<br><br>Syb<br>Philoo<br><a href="${PUBLIC_SITE_URL}" style="color:#161851;text-decoration:underline;">${PUBLIC_SITE_URL}</a></p>
    </div>
  </body>
</html>`;
}

async function sendGuideEmail({ apiKey, email, from, notificationEmail }: SendGuideEmailInput) {
  const resend = new Resend(apiKey);

  return resend.emails.send({
    from,
    to: [email],
    bcc: [notificationEmail],
    replyTo: GUIDE_REPLY_TO,
    subject: GUIDE_EMAIL_SUBJECT,
    html: buildGuideEmailHtml(),
    text: buildGuideEmailText(),
  });
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

  const resendApiKey = cleanString(process.env.RESEND_API_KEY, 1_000);
  const guideFromEmail = cleanString(process.env.GUIDE_FROM_EMAIL, 300);
  const notificationEmail = cleanString(process.env.GUIDE_NOTIFICATION_EMAIL, EMAIL_MAX_LENGTH) || DEFAULT_NOTIFICATION_EMAIL;

  if (!resendApiKey || !guideFromEmail || !isValidEmail(notificationEmail)) {
    return jsonResponse({ ok: false, error: "De e-mailservice is niet beschikbaar." }, 500);
  }

  try {
    const response = await sendGuideEmail({
      apiKey: resendApiKey,
      email,
      from: guideFromEmail,
      notificationEmail,
    });

    if (response.error || !response.data?.id) {
      return jsonResponse({ ok: false, error: "De gids kon niet worden verstuurd." }, 502);
    }
  } catch {
    return jsonResponse({ ok: false, error: "De gids kon niet worden verstuurd." }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
