import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { HomePage } from "@/components/site/HomePage";
import { isLanguage, languages } from "@/lib/i18n";
import { socialMetadata } from "@/lib/seo";

type LanguagePageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LanguagePageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    return {};
  }

  if (lang === "en") {
    return {
      title: "Philoo | Software & AI for Recruitment Agencies",
      description: "Philoo builds software and AI for recruitment agencies that reduce manual work.",
      alternates: { canonical: "/en", languages: { nl: "/", en: "/en" } },
      ...socialMetadata("Philoo | Software & AI for Recruitment Agencies", "Philoo builds software and AI for recruitment agencies that reduce manual work.", "/en", "en_GB"),
    };
  }

  return { robots: { index: false, follow: false } };
}

export default async function LanguagePage({ params, searchParams }: LanguagePageProps) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  if (lang === "nl") {
    const paramsToKeep = await searchParams;
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(paramsToKeep)) {
      if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
      else if (value) query.set(key, value);
    }
    redirect(query.size ? `/?${query.toString()}` : "/");
  }

  return <HomePage lang="en" />;
}
