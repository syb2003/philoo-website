"use client";

import { useRef } from "react";
import { trackEvent } from "@/components/site/Analytics";
import type { Language } from "@/lib/i18n";

export type CvStudioDemoEvent = "play" | "halfway" | "complete";

type CvStudioDemoProps = {
  label: string;
  source: string;
  language: Language;
  onEvent?: (event: CvStudioDemoEvent) => void;
};

export function CvStudioDemo({ label, source, language, onEvent }: CvStudioDemoProps) {
  const hasReachedHalfway = useRef(false);
  const hasPlayed = useRef(false);
  const hasCompleted = useRef(false);

  function report(event: CvStudioDemoEvent) {
    onEvent?.(event);
    trackEvent(event === "play" ? "cvstudio_demo_play" : event === "halfway" ? "cvstudio_demo_50" : "cvstudio_demo_complete", { language });
  }

  return (
    <video
      aria-label={label}
      className="aspect-video w-full rounded-[1.15rem] bg-[#0A1236] object-contain"
      controls
      onEnded={() => {
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          report("complete");
        }
      }}
      onPlay={() => {
        if (!hasPlayed.current) {
          hasPlayed.current = true;
          report("play");
        }
      }}
      onTimeUpdate={(event) => {
        const video = event.currentTarget;
        if (!hasReachedHalfway.current && video.duration && video.currentTime / video.duration >= 0.5) {
          hasReachedHalfway.current = true;
          report("halfway");
        }
      }}
      playsInline
      preload="metadata"
    >
      <source src={source} type="video/mp4" />
      Your browser does not support the video element.
    </video>
  );
}
