import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions | Philoo",
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
      body="This page will soon contain Philoo’s terms and conditions."
      lang="en"
      smallText="Last updated: to be added later."
      title="Terms and Conditions"
    />
  );
}
