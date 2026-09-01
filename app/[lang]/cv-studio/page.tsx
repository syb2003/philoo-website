import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvStudioPage } from "@/components/site/CvStudioPage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CV Studio for recruitment agencies | Philoo",
  description: "Turn one source CV into the right version for your agency, client or tender.",
  alternates: { canonical: "/en/cv-studio", languages: { nl: "/cv-studio", en: "/en/cv-studio" } },
  ...socialMetadata("CV Studio for recruitment agencies | Philoo", "Turn one source CV into the right version for your agency, client or tender.", "/en/cv-studio", "en_GB"),
};

export default async function EnglishCvStudioPage({ params }: { params: Promise<{ lang: string }> }) {
  if ((await params).lang !== "en") notFound();
  return <CvStudioPage lang="en" />;
}
