import type { Metadata } from "next";
import { AutoSourcerPage } from "@/components/site/AutoSourcerPage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Automatisch kandidaten vinden | Auto Sourcer | Philoo",
  description: "Auto Sourcer zoekt eerst in je eigen database en kijkt daarna waar nodig buiten je CRM. Ontvang een onderbouwde selectie van geschikte kandidaten.",
  alternates: { canonical: "/auto-sourcer", languages: { nl: "/auto-sourcer", en: "/en/auto-sourcer" } },
  ...socialMetadata("Automatisch kandidaten vinden | Auto Sourcer | Philoo", "Auto Sourcer zoekt eerst in je eigen database en kijkt daarna waar nodig buiten je CRM. Ontvang een onderbouwde selectie van geschikte kandidaten.", "/auto-sourcer", "nl_NL"),
};

export default function DutchAutoSourcerPage() { return <AutoSourcerPage lang="nl" />; }
