import type { DemoCandidateId, DemoVariant } from "@/lib/cv-studio/demo-manifest";

export type StoredDemoConversion = {
  candidateId: DemoCandidateId;
  variant: DemoVariant;
  sourceFile: string;
  createdAt: string;
};

const PENDING_KEY = "philoo-cv-studio-pending";
const CONVERSIONS_KEY = "philoo-cv-studio-conversions";

function isStoredConversion(value: unknown): value is StoredDemoConversion {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<StoredDemoConversion>;
  return (
    (item.candidateId === "marieke" || item.candidateId === "thomas" || item.candidateId === "sophie") &&
    (item.variant === "named" || item.variant === "anonymous") &&
    typeof item.sourceFile === "string" &&
    typeof item.createdAt === "string"
  );
}

export function storePendingConversion(conversion: StoredDemoConversion) {
  window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(conversion));
}

export function completePendingConversion(fallback: StoredDemoConversion) {
  let completed = fallback;
  const pending = window.sessionStorage.getItem(PENDING_KEY);

  if (pending) {
    try {
      const parsed = JSON.parse(pending) as unknown;
      if (isStoredConversion(parsed) && parsed.candidateId === fallback.candidateId) completed = parsed;
    } catch {
      // Ignore malformed temporary browser state.
    }
  }

  const conversions = getStoredConversions().filter(
    (item) => !(item.candidateId === completed.candidateId && item.variant === completed.variant),
  );
  window.localStorage.setItem(CONVERSIONS_KEY, JSON.stringify([completed, ...conversions].slice(0, 12)));
  window.sessionStorage.removeItem(PENDING_KEY);
}

export function getStoredConversions() {
  const raw = window.localStorage.getItem(CONVERSIONS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isStoredConversion) : [];
  } catch {
    return [];
  }
}
