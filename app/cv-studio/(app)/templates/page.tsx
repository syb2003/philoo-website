import { ReceiptIcon } from "@/components/Icons";
import { PageHeader } from "@/components/cv-studio/PageHeader";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function TemplatesPage() {
  await requireDemoSession();
  return (
    <div className="mx-auto max-w-[920px]">
      <PageHeader description="De huisstijl die beschikbaar is in deze tijdelijke demo." title="Templates" />
      <section className="mt-8 rounded-[1.5rem] border border-[#DCD8FF] bg-white p-6 shadow-[0_16px_42px_rgba(49,40,126,0.06)] sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#F0EEFF] text-[#563DFF]"><ReceiptIcon className="h-6 w-6" /></span>
            <div><h2 className="text-xl font-bold tracking-[-0.03em]">Bluefin</h2><p className="mt-2 text-base leading-7 text-[#626B87]">Vooraf ingestelde Bluefin-opmaak voor deze demo.</p></div>
          </div>
          <span className="w-fit rounded-full bg-[#EAF8F0] px-3 py-1.5 text-xs font-bold text-[#25875A]">Actief</span>
        </div>
        <button className="mt-7 min-h-11 rounded-xl border border-[#E0E2EB] bg-[#F7F8FA] px-4 text-sm font-bold text-[#9A9FAF]" disabled type="button">Nieuwe huisstijl toevoegen — binnenkort</button>
      </section>
    </div>
  );
}
