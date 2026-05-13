import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | Philoo",
};

export default async function DutchTermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "nl") {
    notFound();
  }

  return (
    <LegalPage
      backLabel="Terug naar home"
      body="Deze pagina bevat binnenkort de algemene voorwaarden van Philoo."
      lang="nl"
      smallText="Laatste update: wordt later aangevuld."
      title="Algemene voorwaarden"
    />
  );
}
