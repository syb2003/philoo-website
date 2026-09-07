import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CvStudioPage } from "@/components/site/CvStudioPage";
import { isLanguage } from "@/lib/i18n";
import { socialMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (lang === "nl") {
    const title = "CV Studio voor recruitmentbureaus | Philoo";
    const description = "Maak van één bron-CV snel de juiste versie voor je bureau, opdrachtgever of aanbesteding. Brongetrouw, controleerbaar en klaar voor gebruik.";
    return {
      title,
      description,
      alternates: { canonical: "/nl/cv-studio", languages: { nl: "/nl/cv-studio", en: "/en/cv-studio" } },
      ...socialMetadata(title, description, "/nl/cv-studio", "nl_NL"),
    };
  }

  if (lang === "en") {
    const title = "CV Studio for recruitment agencies | Philoo";
    const description = "Turn one candidate CV into the right version for your agency, client or tender.";
    return {
      title,
      description,
      alternates: { canonical: "/en/cv-studio", languages: { nl: "/nl/cv-studio", en: "/en/cv-studio" } },
      ...socialMetadata(title, description, "/en/cv-studio", "en_GB"),
    };
  }

  return {};
}

export default async function PublicCvStudioPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();
  return <CvStudioPage lang={lang} />;
}
