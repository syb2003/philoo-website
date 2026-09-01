import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Philoo",
};

export default async function EnglishTermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (lang !== "en") {
    notFound();
  }

  return (
    <LegalPage
      backLabel="Back to home"
      lang="en"
      title="Terms & Conditions"
    >
      <h2 className="text-xl font-black text-[#161851]">Coming soon</h2>
      <p>Our full terms and conditions will be published shortly.</p>
      <p><strong>Philoo Pte. Ltd.</strong><br />68 Circular Road, #02-01<br />049422 Singapore<br /><a className="font-bold text-[#161851] underline decoration-[#D6C48A] decoration-2 underline-offset-4" href="mailto:hello@philoo.nl">hello@philoo.nl</a></p>
    </LegalPage>
  );
}
