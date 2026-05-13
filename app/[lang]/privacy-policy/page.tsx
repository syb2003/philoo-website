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
      body="This page will soon contain Philoo’s privacy policy."
      lang="en"
      smallText="Last updated: to be added later."
      title="Privacy Policy"
    />
  );
}
