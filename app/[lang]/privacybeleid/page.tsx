import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacybeleid | Philoo",
};

export default async function DutchPrivacyPolicyPage({
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
      body="Deze pagina bevat binnenkort het privacybeleid van Philoo."
      lang="nl"
      smallText="Laatste update: wordt later aangevuld."
      title="Privacybeleid"
    />
  );
}
