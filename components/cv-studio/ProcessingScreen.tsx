"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, FileCheckIcon } from "@/components/Icons";
import type { DemoCandidate, DemoVariant } from "@/lib/cv-studio/demo-manifest";

const milestones = [
  { progress: 25, label: "Bron-cv ontvangen" },
  { progress: 55, label: "Huisstijl toegepast" },
  { progress: 80, label: "Versie voorbereid" },
  { progress: 100, label: "PDF en DOCX gereed" },
] as const;

export function ProcessingScreen({ candidate, variant }: { candidate: DemoCandidate; variant: DemoVariant }) {
  const router = useRouter();
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setProgress(25), 350),
      window.setTimeout(() => setProgress(55), 1150),
      window.setTimeout(() => setProgress(80), 1950),
      window.setTimeout(() => setProgress(100), 2700),
      window.setTimeout(() => router.replace(`/cv-studio/conversies/${candidate.id}?variant=${variant}`), 3250),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [candidate.id, router, variant]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-[720px] items-center justify-center py-8">
      <section className="w-full rounded-[1.75rem] border border-[#DEDDF0] bg-white p-6 text-center shadow-[0_24px_70px_rgba(26,34,80,0.1)] sm:p-10" aria-live="polite">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#F0EEFF] text-[#563DFF]">
          <FileCheckIcon className="h-8 w-8" />
        </span>
        <p className="mt-6 text-xs font-black tracking-[0.09em] text-[#563DFF]">CONVERSIE BEZIG</p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.045em]">Bluefin-cv wordt voorbereid</h1>
        <p className="mx-auto mt-3 max-w-[510px] text-base leading-7 text-[#626B87]">
          {candidate.name} · {variant === "anonymous" ? "Anonieme versie" : "Versie met naam"}
        </p>

        <div className="mt-8 h-3 overflow-hidden rounded-full bg-[#ECECF4]" aria-label={`${progress}% gereed`} role="progressbar" aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress}>
          <div className="h-full rounded-full bg-[linear-gradient(90deg,#563DFF,#2771F5)] transition-[width] duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-right text-sm font-bold text-[#563DFF]">{progress}%</p>

        <ol className="mt-6 grid gap-3 text-left sm:grid-cols-2">
          {milestones.map((milestone) => {
            const complete = progress >= milestone.progress;
            const label = milestone.progress === 80 && variant === "anonymous" ? "Anonieme versie voorbereid" : milestone.label;
            return (
              <li className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${complete ? "border-[#CFE9DA] bg-[#F5FCF8] text-[#276A49]" : "border-[#E5E7EF] bg-[#FAFAFC] text-[#8A91A6]"}`} key={milestone.progress}>
                <CheckCircleIcon className={`h-5 w-5 shrink-0 ${complete ? "text-[#28A66A]" : "text-[#C8CCD8]"}`} />
                {label}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
