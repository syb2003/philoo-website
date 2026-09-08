import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon, FileCheckIcon, ReceiptIcon } from "@/components/Icons";
import { PageHeader } from "@/components/cv-studio/PageHeader";
import { demoCandidates } from "@/lib/cv-studio/demo-manifest";
import { cvStudioDemoConfig } from "@/lib/cv-studio/demo-display-config";
import { requireDemoSession } from "@/lib/cv-studio/session";

const steps = [
  { title: "Huisstijl kiezen", body: `${cvStudioDemoConfig.templateName} staat voor je klaar.`, icon: ReceiptIcon },
  { title: "Kandidaat-cv uploaden", body: "Kies één van de drie demo-cv's.", icon: FileCheckIcon },
  { title: "Eind-cv downloaden", body: "Ontvang bewerkbare DOCX en PDF.", icon: CheckCircleIcon },
] as const;

export default async function DashboardPage() {
  await requireDemoSession();
  return (
    <div className="mx-auto max-w-[1180px]">
      <PageHeader title="Dashboard" />
      <section className="mt-8 rounded-[1.7rem] border border-[#DCD8FF] bg-[linear-gradient(135deg,#FFFFFF,#F2F0FF)] p-6 shadow-[0_18px_48px_rgba(62,47,165,0.08)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.09em] text-[#563DFF]">PHILOO CV STUDIO</p>
            <h2 className="mt-3 max-w-[620px] text-[clamp(2rem,4vw,3.3rem)] font-bold leading-[1.04] tracking-[-0.045em]">Snel van kandidaat-cv naar eind-cv</h2>
          </div>
          <Link className="inline-flex min-h-12 w-fit items-center gap-2 rounded-xl bg-[#563DFF] px-5 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.23)]" href="/cv-studio/conversies/nieuw">Nieuwe conversie <ArrowRightIcon className="h-5 w-5" /></Link>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ title, body, icon: Icon }, index) => (
            <li className="rounded-2xl border border-white bg-white/85 p-5 shadow-[0_10px_28px_rgba(28,34,82,0.05)]" key={title}>
              <div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#EDEAFF] text-sm font-bold text-[#563DFF]">{index + 1}</span><Icon className="h-5 w-5 text-[#563DFF]" /></div>
              <h3 className="mt-4 font-bold text-[#182044]">{title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-[#68718B]">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8" aria-labelledby="demo-candidates-heading">
        <h2 className="text-xl font-bold tracking-[-0.03em]" id="demo-candidates-heading">Demo-kandidaten</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {demoCandidates.map((candidate) => (
            <article className="rounded-2xl border border-[#E0E3EC] bg-white p-5" key={candidate.id}>
              <h3 className="font-bold text-[#182044]">{candidate.name}</h3>
              <p className="mt-1 text-sm leading-5 text-[#68718B]">{candidate.role}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
