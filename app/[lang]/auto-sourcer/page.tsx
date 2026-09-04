import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutoSourcerPage } from "@/components/site/AutoSourcerPage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Find Candidates Automatically | Auto Sourcer | Philoo",
  description: "Auto Sourcer searches your own database first and expands beyond your CRM when needed, giving you candidates with clear reasons to review.",
  alternates: { canonical: "/en/auto-sourcer", languages: { nl: "/auto-sourcer", en: "/en/auto-sourcer" } },
  ...socialMetadata("Find Candidates Automatically | Auto Sourcer | Philoo", "Auto Sourcer searches your own database first and expands beyond your CRM when needed, giving you candidates with clear reasons to review.", "/en/auto-sourcer", "en_GB"),
};

export default async function EnglishAutoSourcerPage({ params }: { params: Promise<{ lang: string }> }) {
  if ((await params).lang !== "en") notFound();
  return <AutoSourcerPage lang="en" />;
}
