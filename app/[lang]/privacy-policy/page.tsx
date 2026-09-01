import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Philoo",
};

export default async function EnglishPrivacyPolicyPage({
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
      title="Privacy Policy"
    >
      <h2 className="text-xl font-black text-[#161851]">Coming soon</h2>
      <p>We are currently preparing our full privacy policy.</p>
      <p><strong>Philoo Pte. Ltd.</strong><br />68 Circular Road, #02-01<br />049422 Singapore<br /><a className="font-bold text-[#161851] underline decoration-[#D6C48A] decoration-2 underline-offset-4" href="mailto:hello@philoo.nl">hello@philoo.nl</a></p>
      <p>For questions about your personal data, or to request access or deletion, contact us at <a className="font-bold text-[#161851] underline decoration-[#D6C48A] decoration-2 underline-offset-4" href="mailto:hello@philoo.nl">hello@philoo.nl</a>.</p>
    </LegalPage>
  );
}
