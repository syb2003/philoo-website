"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckCircleIcon, FileCheckIcon, UserIcon } from "@/components/Icons";
import { storePendingConversion } from "@/lib/cv-studio/browser-state";
import { cvStudioDemoConfig } from "@/lib/cv-studio/demo-display-config";
import {
  demoCandidates,
  getDemoCandidate,
  resolveCandidateIdBySourceHash,
  type DemoCandidateId,
} from "@/lib/cv-studio/demo-manifest";

const unknownFileMessage = "Dit bestand is niet onderdeel van deze demo. Gebruik één van de drie demo-cv's.";

async function sha256(file: File) {
  const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function NewConversion() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [candidateId, setCandidateId] = useState<DemoCandidateId | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [checkingFile, setCheckingFile] = useState(false);
  const [error, setError] = useState("");
  const selectedCandidate = candidateId ? getDemoCandidate(candidateId) : null;

  async function checkFile(file: File | undefined) {
    if (!file) return;
    setSelectedFileName(file.name);
    setCandidateId(null);
    setError("");
    setCheckingFile(true);

    try {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "pdf" && extension !== "docx") {
        setError(unknownFileMessage);
        return;
      }

      const matchedCandidateId = resolveCandidateIdBySourceHash(await sha256(file));
      if (!matchedCandidateId) {
        setError(unknownFileMessage);
        return;
      }

      setCandidateId(matchedCandidateId);
    } catch {
      setError("Het bestand kon niet worden gecontroleerd. Kies het bestand opnieuw.");
    } finally {
      setCheckingFile(false);
    }
  }

  function chooseCandidate(id: DemoCandidateId) {
    const candidate = getDemoCandidate(id);
    if (!candidate) return;
    setCandidateId(id);
    setSelectedFileName(candidate.source.fileName);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function generate() {
    if (!candidateId || !selectedCandidate) return;
    const variant = anonymous ? "anonymous" : "named";
    storePendingConversion({
      candidateId,
      variant,
      sourceFile: selectedFileName || selectedCandidate.source.fileName,
      createdAt: new Date().toISOString(),
    });
    router.push(`/cv-studio/conversies/${candidateId}/verwerken?variant=${variant}`);
  }

  return (
    <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-5">
        <section className="rounded-[1.5rem] border border-[#E0E3ED] bg-white p-5 shadow-[0_14px_38px_rgba(24,34,82,0.045)] sm:p-6" aria-labelledby="house-style-heading">
          <div className="flex items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EDEAFF] text-sm font-bold text-[#563DFF]">1</span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold tracking-[-0.03em]" id="house-style-heading">Huisstijl</h2>
              <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-[#D9D6FF] bg-[#F8F7FF] p-4">
                <div>
                  <p className="font-bold text-[#20284C]">{cvStudioDemoConfig.templateName}</p>
                  <p className="mt-1 text-sm text-[#66708C]">Actieve huisstijl voor deze conversie.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#3B9A68] shadow-sm">
                  <CheckCircleIcon className="h-4 w-4" /> Geselecteerd
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-[#E0E3ED] bg-white p-5 shadow-[0_14px_38px_rgba(24,34,82,0.045)] sm:p-6" aria-labelledby="candidate-cv-heading">
          <div className="flex items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EDEAFF] text-sm font-bold text-[#563DFF]">2</span>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold tracking-[-0.03em]" id="candidate-cv-heading">Kandidaat-cv</h2>
              <div className="mt-4 grid gap-5 lg:grid-cols-2">
                <div>
                  <div
                    className={`relative flex min-h-[210px] flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                      error ? "border-[#E7AAA4] bg-[#FFF9F8]" : candidateId ? "border-[#9FD2B7] bg-[#F8FFFB]" : "border-[#CFCBEF] bg-[#FAFAFF] hover:border-[#8C7BFF]"
                    }`}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      void checkFile(event.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      id="candidate-file"
                      onChange={(event) => void checkFile(event.target.files?.[0])}
                      onClick={(event) => { event.currentTarget.value = ""; }}
                      ref={inputRef}
                      type="file"
                    />
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#563DFF] shadow-[0_10px_24px_rgba(50,43,128,0.1)]">
                      <FileCheckIcon className="h-6 w-6" />
                    </span>
                    <p className="mt-4 font-bold text-[#20284C]">Sleep je cv hiernaartoe</p>
                    <p className="mt-1 text-sm text-[#6A728C]">of klik om te uploaden</p>
                    <p className="mt-3 text-xs text-[#8A91A6]">PDF of DOCX</p>
                  </div>
                  {selectedFileName ? (
                    <p className="mt-3 break-all text-sm font-semibold text-[#3E4869]">
                      {checkingFile ? "Bestand controleren..." : selectedFileName}
                    </p>
                  ) : null}
                  {error ? <p className="mt-3 rounded-xl bg-[#FFF1F0] px-4 py-3 text-sm font-semibold leading-5 text-[#A23A31]" role="alert">{error}</p> : null}
                </div>

                <fieldset>
                  <legend className="text-sm font-bold text-[#3C4667]">Of kies een demo-kandidaat</legend>
                  <div className="mt-3 space-y-2.5">
                    {demoCandidates.map((candidate) => {
                      const selected = candidate.id === candidateId;
                      return (
                        <button
                          aria-pressed={selected}
                          className={`flex min-h-[64px] w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                            selected ? "border-[#7D6AFF] bg-[#F3F1FF] shadow-[0_8px_20px_rgba(86,61,255,0.08)]" : "border-[#E0E3EC] bg-white hover:border-[#BEB7F7] hover:bg-[#FCFBFF]"
                          }`}
                          key={candidate.id}
                          onClick={() => chooseCandidate(candidate.id)}
                          type="button"
                        >
                          <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${selected ? "bg-white text-[#563DFF]" : "bg-[#F4F5F9] text-[#65708C]"}`}>
                            <UserIcon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-bold text-[#182044]">{candidate.name}</span>
                            <span className="mt-0.5 block text-xs leading-4 text-[#66708C]">{candidate.role}</span>
                          </span>
                          <span className={`ml-auto h-4 w-4 shrink-0 rounded-full border-2 ${selected ? "border-[#563DFF] bg-[#563DFF] shadow-[inset_0_0_0_3px_white]" : "border-[#C9CDDA]"}`} />
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.5rem] border border-[#E0E3ED] bg-white p-5 shadow-[0_14px_38px_rgba(24,34,82,0.045)] sm:p-6" aria-labelledby="output-options-heading">
          <div className="flex items-start gap-4">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EDEAFF] text-sm font-bold text-[#563DFF]">3</span>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-5">
              <div>
                <h2 className="text-xl font-bold tracking-[-0.03em]" id="output-options-heading">Outputopties</h2>
                <p className="mt-1.5 font-bold text-[#283153]">Naam anonimiseren</p>
                <p className="mt-1 text-sm text-[#68718B]">Verberg persoonsgegevens in het eind-cv.</p>
              </div>
              <button
                aria-checked={anonymous}
                aria-label="Naam anonimiseren"
                className={`relative h-8 w-14 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF] ${anonymous ? "bg-[#563DFF]" : "bg-[#CDD1DD]"}`}
                onClick={() => setAnonymous((value) => !value)}
                role="switch"
                type="button"
              >
                <span className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${anonymous ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <aside className="h-fit rounded-[1.5rem] border border-[#DCD9FF] bg-[linear-gradient(145deg,#FFFFFF,#F5F3FF)] p-5 shadow-[0_18px_46px_rgba(63,47,170,0.09)] sm:p-6 xl:sticky xl:top-28">
        <p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">OVERZICHT</p>
        <h2 className="mt-3 text-xl font-bold tracking-[-0.03em]">Eind-cv</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="text-[#7A829A]">Huisstijl</dt>
            <dd className="mt-1 font-bold text-[#273052]">{cvStudioDemoConfig.templateName}</dd>
          </div>
          <div>
            <dt className="text-[#7A829A]">Kandidaat</dt>
            <dd className="mt-1 font-bold text-[#273052]">{selectedCandidate?.name ?? "Nog niet gekozen"}</dd>
          </div>
          <div>
            <dt className="text-[#7A829A]">Variant</dt>
            <dd className="mt-1 font-bold text-[#273052]">{anonymous ? "Anoniem" : "Met naam"}</dd>
          </div>
          <div>
            <dt className="text-[#7A829A]">Output</dt>
            <dd className="mt-1 font-bold text-[#273052]">Bewerkbare DOCX + PDF</dd>
          </div>
        </dl>
        <button
          className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-5 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.23)] transition hover:bg-[#4930E7] disabled:cursor-not-allowed disabled:bg-[#C6C3D8] disabled:shadow-none"
          disabled={!candidateId || checkingFile}
          onClick={generate}
          type="button"
        >
          Genereer cv
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </aside>
    </div>
  );
}
