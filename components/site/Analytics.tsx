"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { getFirstTouchAttribution } from "@/lib/attribution";
import type { Language } from "@/lib/i18n";

export type AnalyticsEvent =
  | "site_page_view"
  | "homepage_maatwerk_click"
  | "homepage_cvstudio_click"
  | "homepage_autosourcer_click"
  | "calendly_cta_click"
  | "cvstudio_page_view"
  | "cvstudio_demo_play"
  | "cvstudio_demo_50"
  | "cvstudio_demo_complete"
  | "cvstudio_early_access_click"
  | "cvstudio_early_access_submit"
  | "autosourcer_page_view"
  | "autosourcer_interest_click"
  | "autosourcer_interest_submit"
  | "maatwerk_demo_play"
  | "maatwerk_demo_50"
  | "maatwerk_demo_complete";

type TrackOptions = { language: Language; sourceCategory?: string };

export function trackEvent(event: AnalyticsEvent, { language, sourceCategory = "website" }: TrackOptions) {
  if (typeof window === "undefined") return;
  const attribution = getFirstTouchAttribution();
  const payload = JSON.stringify({
    event,
    language,
    page_path: window.location.pathname,
    referrer: attribution.initial_referrer,
    attribution,
    source_category: sourceCategory,
  });

  fetch("/api/analytics-event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Measurement must never affect page interaction.
  });
}

export function AnalyticsPageView({ event, language }: { event: AnalyticsEvent; language: Language }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent(event, { language });
  }, [event, language]);
  return null;
}

type TrackedLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  children: ReactNode;
  event: AnalyticsEvent;
  language: Language;
};

export function TrackedLink({ children, event, language, ...props }: TrackedLinkProps) {
  return <Link {...props} onClick={() => trackEvent(event, { language })}>{children}</Link>;
}

type TrackedAnchorProps = Omit<ComponentProps<"a">, "onClick"> & { event: AnalyticsEvent; language: Language; sourceCategory?: string };

export function TrackedAnchor({ event, language, sourceCategory, ...props }: TrackedAnchorProps) {
  return <a {...props} onClick={() => trackEvent(event, { language, sourceCategory })} />;
}
