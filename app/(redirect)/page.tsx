"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLanguage, isLanguage, languageStorageKey, type Language } from "@/lib/i18n";

function detectBrowserLanguage(): Language {
  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const prefersDutch = browserLanguages.some((language) => language.toLowerCase().startsWith("nl"));

  return prefersDutch ? "nl" : defaultLanguage;
}

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(languageStorageKey);
    const language = savedLanguage && isLanguage(savedLanguage) ? savedLanguage : detectBrowserLanguage();

    router.replace(`/${language}`);
  }, [router]);

  return (
    <main className="grid min-h-svh place-items-center bg-[#F7F8FA] px-6 text-center text-[#161851]">
      <div>
        <p className="text-4xl font-black tracking-[0]">Philoo</p>
        <span className="sr-only">Loading preferred language</span>
      </div>
    </main>
  );
}
