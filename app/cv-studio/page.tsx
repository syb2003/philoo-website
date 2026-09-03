import type { Metadata } from "next";
import { CvStudioPage } from "@/components/site/CvStudioPage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CV Studio voor recruitmentbureaus | Philoo",
  description: "Maak van één bron-CV snel de juiste versie voor je bureau, opdrachtgever of aanbesteding. Brongetrouw, controleerbaar en klaar voor gebruik.",
  alternates: { canonical: "/cv-studio", languages: { nl: "/cv-studio", en: "/en/cv-studio" } },
  ...socialMetadata("CV Studio voor recruitmentbureaus | Philoo", "Maak van één bron-CV snel de juiste versie voor je bureau, opdrachtgever of aanbesteding. Brongetrouw, controleerbaar en klaar voor gebruik.", "/cv-studio", "nl_NL"),
};

export default function DutchCvStudioPage() { return <CvStudioPage lang="nl" />; }
