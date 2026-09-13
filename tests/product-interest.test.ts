import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/product-interest/route.ts";

const managedEnvironmentKeys = [
  "GOOGLE_SHEETS_WEBHOOK_URL",
  "GOOGLE_SHEETS_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "SCOUT_UPDATES_NOTIFICATION_FROM",
  "SCOUT_UPDATES_NOTIFICATION_TIME_ZONE",
] as const;

function request(body: Record<string, unknown>) {
  return new Request("http://localhost/api/product-interest", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function scoutUpdate(overrides: Record<string, unknown> = {}) {
  return {
    name: "Syb Janmaat",
    email: "recruiter@example.com",
    company: "Philoo",
    website: "",
    interest_type: "scout_updates",
    language: "nl",
    page_path: "/",
    referrer: "https://example.org/bron",
    attribution: { utm_source: "linkedin", utm_campaign: "scout" },
    ...overrides,
  };
}

function configureSheets() {
  process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://sheets.example.invalid/webhook";
  process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "test-secret";
}

function configureMail() {
  process.env.RESEND_API_KEY = "re_test";
  process.env.SCOUT_UPDATES_NOTIFICATION_FROM = "Philoo Scout <notifications@philoo.nl>";
  process.env.SCOUT_UPDATES_NOTIFICATION_TIME_ZONE = "Europe/Amsterdam";
}

async function withEnvironment(run: () => Promise<void>) {
  const previousFetch = globalThis.fetch;
  const previousEnvironment = Object.fromEntries(managedEnvironmentKeys.map((key) => [key, process.env[key]]));
  try {
    await run();
  } finally {
    globalThis.fetch = previousFetch;
    for (const key of managedEnvironmentKeys) {
      const value = previousEnvironment[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("Scout update is stored and its internal email is accepted by Resend", async () => {
  await withEnvironment(async () => {
    configureSheets();
    configureMail();
    const calls: Array<{ url: string; init?: RequestInit }> = [];

    globalThis.fetch = async (input, init) => {
      const url = String(input);
      calls.push({ url, init });
      return url === "https://api.resend.com/emails"
        ? Response.json({ id: "email_123" })
        : Response.json({ ok: true });
    };

    const response = await POST(request(scoutUpdate()));
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(result, {
      ok: true,
      stored: true,
      notification: { status: "accepted", provider: "resend", messageId: "email_123" },
    });

    const storageCall = calls[0];
    const storageBody = JSON.parse(String(storageCall.init?.body)) as Record<string, unknown>;
    assert.equal(storageCall.url, "https://sheets.example.invalid/webhook");
    assert.equal(storageBody.source, "scout_updates");
    assert.equal(storageBody.interest_type, "scout_updates");

    const mailCall = calls[1];
    const mailBody = JSON.parse(String(mailCall.init?.body)) as Record<string, unknown>;
    const mailHeaders = new Headers(mailCall.init?.headers);
    assert.equal(mailCall.url, "https://api.resend.com/emails");
    assert.equal(mailBody.subject, "Nieuwe aanmelding voor Scout-updates");
    assert.deepEqual(mailBody.to, ["hello@philoo.nl"]);
    assert.equal(mailBody.from, "Philoo Scout <notifications@philoo.nl>");
    assert.equal(mailBody.reply_to, "recruiter@example.com");
    assert.match(String(mailBody.text), /Naam: Syb Janmaat/);
    assert.match(String(mailBody.text), /Bedrijf: Philoo/);
    assert.match(String(mailBody.text), /Pagina: \//);
    assert.match(String(mailBody.text), /Europe\/Amsterdam/);
    assert.match(mailHeaders.get("idempotency-key") ?? "", /^scout-updates\//);

    const statusBody = JSON.parse(String(calls[2].init?.body)) as { event?: { event?: string } };
    assert.equal(statusBody.event?.event, "scout_updates_notification_accepted");
  });
});

test("Scout update rejects an invalid email before calling storage or mail", async () => {
  await withEnvironment(async () => {
    let called = false;
    globalThis.fetch = async () => {
      called = true;
      return Response.json({ ok: true });
    };

    const response = await POST(request(scoutUpdate({ email: "geen-geldig-adres" })));

    assert.equal(response.status, 422);
    assert.equal(called, false);
  });
});

test("Scout update does not send mail when storage fails", async () => {
  await withEnvironment(async () => {
    configureSheets();
    configureMail();
    const urls: string[] = [];
    globalThis.fetch = async (input) => {
      urls.push(String(input));
      return new Response("failed", { status: 500 });
    };

    const response = await POST(request(scoutUpdate()));

    assert.equal(response.status, 502);
    assert.deepEqual(urls, ["https://sheets.example.invalid/webhook"]);
  });
});

test("A missing mail configuration is reported after storage and recorded for recovery", async () => {
  await withEnvironment(async () => {
    configureSheets();
    delete process.env.RESEND_API_KEY;
    delete process.env.SCOUT_UPDATES_NOTIFICATION_FROM;
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    globalThis.fetch = async (input, init) => {
      calls.push({ url: String(input), init });
      return Response.json({ ok: true });
    };

    const response = await POST(request(scoutUpdate()));
    const result = await response.json();

    assert.equal(response.status, 202);
    assert.deepEqual(result, {
      ok: true,
      stored: true,
      notification: { status: "failed", failureCode: "configuration" },
    });
    assert.equal(calls.length, 2);
    const statusBody = JSON.parse(String(calls[1].init?.body)) as { event?: { event?: string; email?: string } };
    assert.equal(statusBody.event?.event, "scout_updates_notification_failed_configuration");
    assert.equal(statusBody.event?.email, "recruiter@example.com");
  });
});

test("A Resend rejection preserves the lead and records a recoverable failure", async () => {
  await withEnvironment(async () => {
    configureSheets();
    configureMail();
    const calls: Array<{ url: string; init?: RequestInit }> = [];
    globalThis.fetch = async (input, init) => {
      const url = String(input);
      calls.push({ url, init });
      return url === "https://api.resend.com/emails"
        ? Response.json({ message: "rejected" }, { status: 403 })
        : Response.json({ ok: true });
    };

    const response = await POST(request(scoutUpdate()));
    const result = await response.json();

    assert.equal(response.status, 202);
    assert.equal(result.stored, true);
    assert.equal(result.notification.failureCode, "provider_rejected");
    const statusBody = JSON.parse(String(calls[2].init?.body)) as { event?: { event?: string } };
    assert.equal(statusBody.event?.event, "scout_updates_notification_failed_provider_rejected");
  });
});
