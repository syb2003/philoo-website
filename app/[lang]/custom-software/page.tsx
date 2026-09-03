import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomSoftwarePage as CustomSoftwareContent } from "@/components/site/CustomSoftwarePage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Custom Recruitment Software & AI | Philoo",
  description: "Philoo builds custom software, AI and automation for recruitment processes, reducing manual work around your existing ATS, CRM and way of working.",
  alternates: {
    canonical: "/en/custom-software",
    languages: { nl: "/maatwerk", en: "/en/custom-software" },
  },
  ...socialMetadata("Custom Recruitment Software & AI | Philoo", "Philoo builds custom software, AI and automation for recruitment processes, reducing manual work around your existing ATS, CRM and way of working.", "/en/custom-software", "en_GB"),
};

export default async function CustomSoftwarePage({ params }: { params: Promise<{ lang: string }> }) {
  if ((await params).lang !== "en") notFound();
  return <CustomSoftwareContent lang="en" />;
}
