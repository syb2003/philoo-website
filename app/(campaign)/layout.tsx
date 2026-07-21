import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function CampaignLayout({ children }: { children: ReactNode }) {
  return (
    <html className="font-sans antialiased" lang="nl">
      <body className="bg-[#F7F8FA]" style={{ minWidth: 0 }}>
        {children}
      </body>
    </html>
  );
}
