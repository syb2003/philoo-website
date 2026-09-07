import { LogoutButton } from "@/components/cv-studio/LogoutButton";
import { PageHeader } from "@/components/cv-studio/PageHeader";
import { requireDemoSession } from "@/lib/cv-studio/session";

export default async function SettingsPage() {
  await requireDemoSession();
  return (
    <div className="mx-auto max-w-[820px]">
      <PageHeader description="De vaste instellingen voor deze tijdelijke demo." title="Instellingen" />
      <section className="mt-8 rounded-[1.5rem] border border-[#E0E3EC] bg-white p-6 shadow-[0_14px_40px_rgba(24,34,82,0.05)] sm:p-7">
        <dl className="divide-y divide-[#EAECF2]">
          <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]"><dt className="text-sm font-semibold text-[#747C95]">Workspace</dt><dd className="font-bold text-[#20284C]">Bluefin demo</dd></div>
          <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]"><dt className="text-sm font-semibold text-[#747C95]">Gebruiker</dt><dd className="font-bold text-[#20284C]">wouter@bluefin.nl</dd></div>
          <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr]"><dt className="text-sm font-semibold text-[#747C95]">Output</dt><dd className="font-bold text-[#20284C]">Bewerkbare DOCX + PDF</dd></div>
        </dl>
        <LogoutButton className="mt-6 min-h-11 rounded-xl border border-[#D9DCE8] bg-white px-4 text-sm font-bold text-[#323C5D] hover:bg-[#F7F8FB]" />
      </section>
    </div>
  );
}
