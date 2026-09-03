export const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Record<(typeof utmKeys)[number], string> & {
  landing_page: string;
  initial_referrer: string;
};

const storageKey = "philoo:first-touch:v1";
const textMaxLength = 300;

function clean(value: string | null) {
  return (value ?? "").trim().slice(0, textMaxLength).toLowerCase();
}

function referrerHostname(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "").toLowerCase().slice(0, textMaxLength);
  } catch {
    return "";
  }
}

function currentAttribution(): Attribution {
  const search = new URLSearchParams(window.location.search);
  return {
    utm_source: clean(search.get("utm_source")),
    utm_medium: clean(search.get("utm_medium")),
    utm_campaign: clean(search.get("utm_campaign")),
    utm_content: clean(search.get("utm_content")),
    utm_term: clean(search.get("utm_term")),
    landing_page: window.location.pathname,
    initial_referrer: referrerHostname(document.referrer),
  };
}

function isAttribution(value: unknown): value is Attribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Partial<Attribution>;
  return typeof candidate.landing_page === "string" && typeof candidate.initial_referrer === "string" && utmKeys.every((key) => typeof candidate[key] === "string");
}

export function getFirstTouchAttribution(): Attribution {
  if (typeof window === "undefined") {
    return { utm_source: "", utm_medium: "", utm_campaign: "", utm_content: "", utm_term: "", landing_page: "", initial_referrer: "" };
  }

  try {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (isAttribution(parsed)) return parsed;
    }

    const created = currentAttribution();
    window.localStorage.setItem(storageKey, JSON.stringify(created));
    return created;
  } catch {
    return currentAttribution();
  }
}
