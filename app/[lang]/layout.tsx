import type { ReactNode } from "react";
import "../globals.css";
import { defaultLanguage, isLanguage, languages } from "@/lib/i18n";

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const htmlLang = isLanguage(lang) ? lang : defaultLanguage;

  return (
    <html className="font-sans antialiased" lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
