import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { defaultLanguage, isLanguage, languages } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.philoo.nl"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

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
