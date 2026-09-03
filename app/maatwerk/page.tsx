import type { Metadata } from "next";
import { CustomSoftwarePage } from "@/components/site/CustomSoftwarePage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Maatwerk software & AI voor recruitment | Philoo",
  description: "Philoo bouwt maatwerk software, AI en automatisering voor recruitmentprocessen. Minder handmatig werk, passend bij je bestaande ATS, CRM en werkwijze.",
  alternates: {
    canonical: "/maatwerk",
    languages: { nl: "/maatwerk", en: "/en/custom-software" },
  },
  ...socialMetadata("Maatwerk software & AI voor recruitment | Philoo", "Philoo bouwt maatwerk software, AI en automatisering voor recruitmentprocessen. Minder handmatig werk, passend bij je bestaande ATS, CRM en werkwijze.", "/maatwerk", "nl_NL"),
};

export default function MaatwerkPage() { return <CustomSoftwarePage lang="nl" />; }
