import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.philoo.nl"),
  title: "Philoo | Software & AI voor recruitmentbureaus",
  description: "Philoo bouwt software en AI voor recruitmentbureaus die handmatig werk verminderen.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
      <html className="font-sans antialiased" lang="nl">
      <body>{children}</body>
    </html>
  );
}
