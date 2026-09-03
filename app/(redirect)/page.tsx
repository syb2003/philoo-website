import type { Metadata } from "next";
import { HomePage } from "@/components/site/HomePage";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Philoo | Software & AI voor recruitmentbureaus",
  description: "Philoo bouwt software en AI voor recruitmentbureaus die handmatig werk verminderen.",
  alternates: { canonical: "/", languages: { nl: "/", en: "/en" } },
  ...socialMetadata("Philoo | Software & AI voor recruitmentbureaus", "Philoo bouwt software en AI voor recruitmentbureaus die handmatig werk verminderen.", "/", "nl_NL"),
};

export default function RootRedirectPage() {
  return <HomePage lang="nl" />;
}
