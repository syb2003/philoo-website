import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Philoo",
  description: "Smart AI workflows for practical B2B teams.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html className="font-sans antialiased" lang="en">
      <body>{children}</body>
    </html>
  );
}
