import type { Metadata } from "next";
import { AboutPage } from "@/components/site/AboutPage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = { title: "Over Philoo | Software voor recruitment", description: "Philoo bouwt software, AI en automatisering voor recruiters en recruitmentbureaus. Lees meer over onze focus en aanpak.", alternates: { canonical: "/over", languages: { nl: "/over", en: "/en/about" } }, ...socialMetadata("Over Philoo | Software voor recruitment", "Philoo bouwt software, AI en automatisering voor recruiters en recruitmentbureaus. Lees meer over onze focus en aanpak.", "/over", "nl_NL") };
export default function OverPage() { return <AboutPage lang="nl" />; }
