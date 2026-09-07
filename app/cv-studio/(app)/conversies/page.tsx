import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import { ConversionsTable } from "@/components/cv-studio/ConversionsTable";
import { PageHeader } from "@/components/cv-studio/PageHeader";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function ConversionsPage() {
  await requireDemoSession();
  return (
    <div className="mx-auto max-w-[1280px]">
      <PageHeader
        action={<Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.22)]" href="/cv-studio/conversies/nieuw">Nieuwe conversie <ArrowRightIcon className="h-4 w-4" /></Link>}
        description="Bekijk de vaste demo-uitvoer en conversies die je in deze browser hebt gemaakt."
        title="Conversies"
      />
      <ConversionsTable />
    </div>
  );
}
