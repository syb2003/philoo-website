import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/product-interest/route.ts";

function request(body: Record<string, unknown>) {
  return new Request("http://localhost/api/product-interest", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("Scout update accepts an email-only lead and keeps its own source", async () => {
  const previousUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const previousSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  const previousFetch = globalThis.fetch;
  let webhookBody: Record<string, unknown> | undefined;

  process.env.GOOGLE_SHEETS_WEBHOOK_URL = "https://example.invalid/webhook";
  process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "test-secret";
  globalThis.fetch = async (_input, init) => {
    webhookBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return Response.json({ ok: true });
  };

  try {
    const response = await POST(request({
      name: "",
      email: "recruiter@example.com",
      company: "",
      website: "",
      interest_type: "scout_updates",
      language: "nl",
      page_path: "/",
      attribution: {},
    }));

    assert.equal(response.status, 200);
    assert.equal(webhookBody?.source, "scout_updates");
    assert.equal(webhookBody?.interest_type, "scout_updates");
    assert.notEqual(webhookBody?.source, "cvstudio_early_access");
    assert.notEqual(webhookBody?.source, "autosourcer_interest");
  } finally {
    globalThis.fetch = previousFetch;
    if (previousUrl === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = previousUrl;
    if (previousSecret === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    else process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = previousSecret;
  }
});

test("Scout update rejects an invalid email before calling the webhook", async () => {
  const previousFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ ok: true });
  };

  try {
    const response = await POST(request({
      email: "geen-geldig-adres",
      interest_type: "scout_updates",
      language: "nl",
    }));

    assert.equal(response.status, 422);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = previousFetch;
  }
});
