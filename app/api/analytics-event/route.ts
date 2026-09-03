import { normalizeAttribution, normalizeGuideReferrer, recordSiteAnalyticsEvent, type SiteAnalyticsEventName } from "@/lib/googleSheets";

const allowedEvents = new Set<SiteAnalyticsEventName>([
  "site_page_view", "homepage_maatwerk_click", "homepage_cvstudio_click", "homepage_autosourcer_click", "calendly_cta_click", "cvstudio_page_view", "cvstudio_demo_play", "cvstudio_demo_50", "cvstudio_demo_complete", "cvstudio_early_access_click", "cvstudio_early_access_submit", "autosourcer_page_view", "autosourcer_interest_click", "autosourcer_interest_submit", "maatwerk_demo_play", "maatwerk_demo_50", "maatwerk_demo_complete",
]);

function respond(body: Record<string, unknown>, status: number) { return Response.json(body, { status, headers: { "cache-control": "no-store" } }); }
function clean(value: unknown, maxLength: number) { return typeof value === "string" ? value.trim().slice(0, maxLength) : ""; }

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return respond({ ok: false }, 415);
  let body: Record<string, unknown>;
  try { const parsed: unknown = await request.json(); if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(); body = parsed as Record<string, unknown>; } catch { return respond({ ok: false }, 400); }
  const event = clean(body.event, 100) as SiteAnalyticsEventName;
  if (!allowedEvents.has(event)) return respond({ ok: false }, 422);
  try {
    await recordSiteAnalyticsEvent({
      event,
      source: clean(body.source_category, 80) || "website",
      attribution: normalizeAttribution(body.attribution),
      referrer: normalizeGuideReferrer(body.referrer),
      page: clean(body.page_path, 300),
    });
  } catch {
    // Analytics should be best-effort and never affect a visitor's interaction.
    return respond({ ok: true }, 202);
  }
  return respond({ ok: true }, 200);
}
