import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isCvStudioDemoEnabled } from "@/lib/cv-studio/config";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.philoo.nl"),
  title: "Bluefin CV Studio demo | Philoo",
  description: "Tijdelijke besloten CV Studio demo voor Bluefin.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/apple-icon.png" },
};

export default function CvStudioLayout({ children }: { children: ReactNode }) {
  if (!isCvStudioDemoEnabled()) notFound();
  return <html className="font-sans antialiased" lang="nl"><body>{children}</body></html>;
}
