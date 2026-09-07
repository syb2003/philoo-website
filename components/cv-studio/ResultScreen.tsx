"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRightIcon, CheckCircleIcon, FileCheckIcon } from "@/components/Icons";
import { completePendingConversion } from "@/lib/cv-studio/browser-state";
import type { DemoCandidate, DemoVariant } from "@/lib/cv-studio/demo-manifest";

function fileUrl(candidateId: string, variant: DemoVariant, format: "docx" | "pdf", inline = false) {
  const base = `/cv-studio/api/files/${candidateId}/${variant}/${format}`;
  return inline ? `${base}?disposition=inline` : base;
}

export function ResultScreen({ candidate, initialVariant }: { candidate: DemoCandidate; initialVariant: DemoVariant }) {
  const [variant, setVariant] = useState<DemoVariant>(initialVariant);
  const assetSet = candidate[variant];
  const pdfPreviewUrl = useMemo(() => fileUrl(candidate.id, variant, "pdf", true), [candidate.id, variant]);

  useEffect(() => {
    completePendingConversion({
      candidateId: candidate.id as "marieke" | "thomas" | "sophie",
      variant: initialVariant,
      sourceFile: candidate.source.fileName,
      createdAt: new Date().toISOString(),
    });
  }, [candidate, initialVariant]);

  return (
    <div className="mx-auto max-w-[1200px]">
      <section className="rounded-[1.6rem] border border-[#DCE8E2] bg-[linear-gradient(140deg,#FFFFFF,#F6FCF8)] p-5 shadow-[0_14px_38px_rgba(24,83,58,0.05)] sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#E7F7EE] text-[#23975E]">
              <CheckCircleIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-black tracking-[0.09em] text-[#27875A]">CONVERSIE GEREED</p>
              <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em]">{candidate.name}</h1>
              <p className="mt-2 max-w-[650px] text-base leading-7 text-[#5C6680]">De kandidaat-cv is omgezet naar een professioneel opgemaakte Bluefin-cv.</p>
            </div>
          </div>

          <div aria-label="Uitvoervariant" className="inline-flex w-fit rounded-xl bg-[#EDEEF4] p-1" role="group">
            <button className={`min-h-10 rounded-lg px-4 text-sm font-bold transition ${variant === "named" ? "bg-white text-[#231B68] shadow-sm" : "text-[#68718B]"}`} onClick={() => setVariant("named")} type="button">Met naam</button>
            <button className={`min-h-10 rounded-lg px-4 text-sm font-bold transition ${variant === "anonymous" ? "bg-white text-[#231B68] shadow-sm" : "text-[#68718B]"}`} onClick={() => setVariant("anonymous")} type="button">Anoniem</button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-5 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.23)] transition hover:bg-[#4930E7]" href={fileUrl(candidate.id, variant, "docx")}>
            <FileCheckIcon className="h-5 w-5" />
            Download bewerkbare DOCX
          </a>
          <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFCBEF] bg-white px-5 text-base font-bold text-[#37258D] transition hover:bg-[#F7F5FF]" href={fileUrl(candidate.id, variant, "pdf")}>
            Download PDF
            <ArrowRightIcon className="h-5 w-5" />
          </a>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl px-4 text-sm font-bold text-[#56607E] hover:bg-white" href="/cv-studio/conversies/nieuw">Nieuwe conversie</Link>
        </div>

        <p className="mt-4 break-all text-sm text-[#727B94]">
          {variant === "anonymous" ? "Anonieme versie" : "Versie met naam"} · {assetSet.docx.fileName}
        </p>
      </section>

      <section className="mt-6 overflow-hidden rounded-[1.6rem] border border-[#DFE2EC] bg-white shadow-[0_18px_50px_rgba(24,34,82,0.07)]" aria-labelledby="preview-heading">
        <div className="flex flex-col gap-3 border-b border-[#E5E7EF] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold tracking-[-0.025em]" id="preview-heading">PDF-preview</h2>
            <p className="mt-1 break-all text-sm text-[#778098]">{assetSet.pdf.fileName}</p>
          </div>
          <a className="inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-[#DADDEA] px-3.5 text-sm font-bold text-[#3F4868] hover:bg-[#F7F8FB]" href={pdfPreviewUrl} rel="noopener noreferrer" target="_blank">
            PDF openen
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
        <iframe className="h-[560px] w-full bg-[#EEF0F4] sm:h-[760px]" key={pdfPreviewUrl} src={pdfPreviewUrl} title={`Preview van ${assetSet.pdf.fileName}`} />
      </section>
    </div>
  );
}
