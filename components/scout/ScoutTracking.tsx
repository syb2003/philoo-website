"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/components/site/Analytics";
import type { Language } from "@/lib/i18n";

type TrackedProps = {
  children: ReactNode;
  event: AnalyticsEvent;
  language: Language;
  placement: string;
};

type ScoutTrackedLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & TrackedProps & {
  onClick?: ComponentProps<typeof Link>["onClick"];
};

export function ScoutTrackedLink({ children, event, language, onClick, placement, ...props }: ScoutTrackedLinkProps) {
  return (
    <Link {...props} onClick={(browserEvent) => {
      trackEvent(event, { language, sourceCategory: `scout:${placement}` });
      onClick?.(browserEvent);
    }}>
      {children}
    </Link>
  );
}

type ScoutTrackedAnchorProps = Omit<ComponentProps<"a">, "onClick"> & TrackedProps & {
  alsoTrackBookingClick?: boolean;
};

export function ScoutTrackedAnchor({ alsoTrackBookingClick = false, children, event, language, placement, ...props }: ScoutTrackedAnchorProps) {
  return (
    <a {...props} onClick={() => {
      trackEvent(event, { language, sourceCategory: `scout:${placement}` });
      if (alsoTrackBookingClick) {
        trackEvent("scout_booking_link_click", { language, sourceCategory: `scout:${placement}` });
      }
    }}>
      {children}
    </a>
  );
}
