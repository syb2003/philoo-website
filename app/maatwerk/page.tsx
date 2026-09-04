import type { Metadata } from "next";
import { CustomSoftwarePage } from "@/components/site/CustomSoftwarePage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Maatwerk software & AI voor recruitment | Philoo",
  description: "Verminder handmatig werk met maatwerk software, AI en automatisering voor je recruitmentproces, passend bij je bestaande ATS, CRM en werkwijze.",
  alternates: {
    canonical: "/maatwerk",
    languages: { nl: "/maatwerk", en: "/en/custom-software" },
  },
  ...socialMetadata("Maatwerk software & AI voor recruitment | Philoo", "Verminder handmatig werk met maatwerk software, AI en automatisering voor je recruitmentproces, passend bij je bestaande ATS, CRM en werkwijze.", "/maatwerk", "nl_NL"),
};

export default function MaatwerkPage() { return <CustomSoftwarePage lang="nl" />; }
