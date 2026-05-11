import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhilooLanding } from "@/components/PhilooLanding";
import { isLanguage, languages } from "@/lib/i18n";
import { siteCopy } from "@/lib/copy";

type LanguagePageProps = {
  params: Promise<{ lang: string }>;
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    return {};
  }

  const metadata = siteCopy[lang].metadata;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        nl: "/nl",
        en: "/en",
      },
    },
  };
}

export default async function LanguagePage({ params }: LanguagePageProps) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  return <PhilooLanding copy={siteCopy[lang]} lang={lang} />;
}
