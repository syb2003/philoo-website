"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type TrackedGuideDownloadLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "download" | "onClick"> & {
  children: ReactNode;
  href: string;
  download: string;
};

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function getAttribution() {
  const searchParams = new URLSearchParams(window.location.search);

  return Object.fromEntries(utmKeys.map((key) => [key, searchParams.get(key) ?? ""]));
}

function trackGuideDownloadClick() {
  const payload = JSON.stringify({
    event: "guide_direct_download_clicked",
    source: "landing-page-direct-download",
    referrer: document.referrer,
    attribution: getAttribution(),
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/guide-event", blob);
    return;
  }

  fetch("/api/guide-event", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Tracking must never block the direct guide download.
  });
}

export function TrackedGuideDownloadLink({ children, download, href, ...props }: TrackedGuideDownloadLinkProps) {
  return (
    <a download={download} href={href} onClick={trackGuideDownloadClick} {...props}>
      {children}
    </a>
  );
}
