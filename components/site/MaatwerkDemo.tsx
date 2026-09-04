"use client";

import { useRef } from "react";
import { trackEvent } from "@/components/site/Analytics";
import type { Language } from "@/lib/i18n";

const videoSource = "/videos/philoo-maatwerk-interne-sourcing-nl.mp4";

const supportingPoints = [
  {
    title: "Vacature als startpunt",
    body: "De vacature en belangrijkste criteria vormen het vertrekpunt.",
  },
  {
    title: "Eerst je eigen database benutten",
    body: "De oplossing zoekt binnen de bestaande kandidaatdata naar relevante kandidaten.",
  },
  {
    title: "Recruiter beoordeelt de selectie",
    body: "De recruiter houdt controle en bepaalt wat er daarna gebeurt.",
  },
] as const;

export function MaatwerkDemo({ language }: { language: Language }) {
  const hasPlayed = useRef(false);
  const hasReachedHalfway = useRef(false);
  const hasCompleted = useRef(false);

  return (
    <section
      aria-labelledby="maatwerk-demo-heading"
      className="border-y border-[#E8E9F4] bg-[linear-gradient(135deg,#FBFAFF,#F7F6FF_55%,#FCFCFF)] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16"
      id="maatwerk-demo"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="max-w-[760px]">
          <p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">EEN VOORBEELD UIT DE PRAKTIJK</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.35rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239]" id="maatwerk-demo-heading">
            Van vacature naar kandidaten uit je eigen database.
          </h2>
          <p className="mt-5 max-w-[700px] text-[1rem] leading-7 text-[#596180] sm:text-[1.08rem]">
            Bekijk in 80 seconden hoe een maatwerkproces kandidaten uit je bestaande database kan selecteren.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-[1040px] overflow-hidden rounded-[1.5rem] border border-[#DED9FF] bg-[#0A1236] p-1.5 shadow-[0_20px_52px_rgba(58,43,168,0.14)] sm:mt-10 sm:p-2">
          <video
            aria-label="Demo van een Philoo maatwerkproces voor kandidaten zoeken in je bestaande database."
            className="block aspect-video w-full rounded-[1.05rem] bg-[#0A1236] object-contain"
            controls
            onEnded={() => {
              if (hasCompleted.current) return;
              hasCompleted.current = true;
              trackEvent("maatwerk_demo_complete", { language });
            }}
            onPlay={() => {
              if (hasPlayed.current) return;
              hasPlayed.current = true;
              trackEvent("maatwerk_demo_play", { language });
            }}
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (hasReachedHalfway.current || !video.duration || video.currentTime / video.duration < 0.5) return;
              hasReachedHalfway.current = true;
              trackEvent("maatwerk_demo_50", { language });
            }}
            playsInline
            preload="metadata"
          >
            <source src={videoSource} type="video/mp4" />
            Je browser ondersteunt deze video niet.
          </video>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
          {supportingPoints.map((point) => (
            <li className="rounded-[1.25rem] border border-[#E1E4F2] bg-white/80 p-5 shadow-[0_10px_26px_rgba(30,37,92,0.04)] sm:p-6" key={point.title}>
              <h3 className="text-[1.05rem] font-black leading-[1.2] tracking-[-0.025em] text-[#11183B]">{point.title}</h3>
              <p className="mt-2 text-[0.94rem] leading-6 text-[#596180]">{point.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-sm leading-6 text-[#596180]">Dit is één voorbeeld. Maatwerk verschilt per proces en recruitmentomgeving.</p>
      </div>
    </section>
  );
}
