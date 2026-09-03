import type { Metadata } from "next";

export const SITE_URL = "https://www.philoo.nl";

export function socialMetadata(title: string, description: string, path: string, locale: "nl_NL" | "en_GB"): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { type: "website", siteName: "Philoo", title, description, url: path, locale },
    twitter: { card: "summary", title, description },
  };
}
