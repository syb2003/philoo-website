import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomSoftwarePage as CustomSoftwareContent } from "@/components/site/CustomSoftwarePage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Custom Recruitment Software & AI | Philoo",
  description: "Custom software, AI and automation for recruitment agencies, built around the ATS, CRM and process you already use.",
  alternates: {
    canonical: "/en/custom-software",
    languages: { nl: "/maatwerk", en: "/en/custom-software" },
  },
  ...socialMetadata("Custom Recruitment Software & AI | Philoo", "Custom software, AI and automation for recruitment agencies, built around the ATS, CRM and process you already use.", "/en/custom-software", "en_GB"),
};

export default async function CustomSoftwarePage({ params }: { params: Promise<{ lang: string }> }) {
  if ((await params).lang !== "en") notFound();
  return <CustomSoftwareContent lang="en" />;
}
