"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon } from "@/components/Icons";
import { getStoredConversions, type StoredDemoConversion } from "@/lib/cv-studio/browser-state";
import { demoCandidates, getDemoCandidate } from "@/lib/cv-studio/demo-manifest";

const sampleConversions: StoredDemoConversion[] = demoCandidates.map((candidate) => ({
  candidateId: candidate.id,
  variant: "named",
  sourceFile: candidate.source.fileName,
  createdAt: "2026-09-07T09:00:00.000Z",
}));

function fileUrl(candidateId: string, variant: string, format: "docx" | "pdf") {
  return `/cv-studio/api/files/${candidateId}/${variant}/${format}`;
}

export function ConversionsTable() {
  const [conversions, setConversions] = useState(sampleConversions);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = getStoredConversions();
      const keys = new Set(stored.map((item) => `${item.candidateId}:${item.variant}`));
      setConversions([...stored, ...sampleConversions.filter((item) => !keys.has(`${item.candidateId}:${item.variant}`))]);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[#E0E3EC] bg-white shadow-[0_14px_40px_rgba(24,34,82,0.05)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left text-sm">
          <thead className="bg-[#F6F7FB] text-xs uppercase tracking-[0.06em] text-[#707990]">
            <tr>
              <th className="px-5 py-4 font-black">Kandidaat</th>
              <th className="px-5 py-4 font-black">Bronbestand</th>
              <th className="px-5 py-4 font-black">Variant</th>
              <th className="px-5 py-4 font-black">Status</th>
              <th className="px-5 py-4 font-black">Bekijken</th>
              <th className="px-5 py-4 font-black">DOCX</th>
              <th className="px-5 py-4 font-black">PDF</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((conversion, index) => {
              const candidate = getDemoCandidate(conversion.candidateId);
              if (!candidate) return null;
              return (
                <tr className="border-t border-[#EAECF2] text-[#3E4869]" key={`${conversion.candidateId}-${conversion.variant}-${index}`}>
                  <td className="px-5 py-4"><span className="block font-bold text-[#172043]">{candidate.name}</span><span className="mt-1 block text-xs text-[#7A8298]">{candidate.role}</span></td>
                  <td className="max-w-[260px] break-all px-5 py-4 text-xs leading-5">{conversion.sourceFile}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-[#F0EEFF] px-2.5 py-1 text-xs font-bold text-[#563DFF]">{conversion.variant === "anonymous" ? "Anoniem" : "Met naam"}</span></td>
                  <td className="px-5 py-4"><span className="rounded-full bg-[#EAF8F0] px-2.5 py-1 text-xs font-bold text-[#25875A]">Voltooid</span></td>
                  <td className="px-5 py-4"><Link className="inline-flex items-center gap-1 font-bold text-[#4D38D3] hover:underline" href={`/cv-studio/conversies/${candidate.id}?variant=${conversion.variant}`}>Open <ArrowRightIcon className="h-4 w-4" /></Link></td>
                  <td className="px-5 py-4"><a className="font-bold text-[#354060] hover:underline" href={fileUrl(candidate.id, conversion.variant, "docx")}>DOCX</a></td>
                  <td className="px-5 py-4"><a className="font-bold text-[#354060] hover:underline" href={fileUrl(candidate.id, conversion.variant, "pdf")}>PDF</a></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
