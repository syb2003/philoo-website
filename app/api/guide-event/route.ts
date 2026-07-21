import {
  normalizeAttribution,
  normalizeGuideReferrer,
  recordGuideDirectDownload,
  resolveDownloadSource,
} from "@/lib/googleSheets";

const GUIDE_PAGE_PATH = "/meer-plaatsingen-met-hetzelfde-team";
const ALLOWED_EVENT = "guide_direct_download_clicked";

type GuideEventRequest = {
  event?: unknown;
  source?: unknown;
  referrer?: unknown;
  attribution?: unknown;
};

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

function isConfigError(error: unknown) {
  return error instanceof Error && error.message === "Missing Google Sheets guide configuration";
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

  const body = rawBody as GuideEventRequest;
  const event = cleanString(body.event, 100);

  if (event !== ALLOWED_EVENT) {
    return jsonResponse({ ok: false, error: "Ongeldig verzoek." }, 422);
  }

  const attribution = normalizeAttribution(body.attribution);
  const referrer = normalizeGuideReferrer(body.referrer);
  const source = resolveDownloadSource(attribution, referrer);

  try {
    await recordGuideDirectDownload({
      source,
      attribution,
      referrer,
      page: GUIDE_PAGE_PATH,
    });
  } catch (error) {
    return jsonResponse(
      { ok: false, error: "De download kon niet worden geregistreerd." },
      isConfigError(error) ? 500 : 502,
    );
  }

  return jsonResponse({ ok: true }, 200);
}
