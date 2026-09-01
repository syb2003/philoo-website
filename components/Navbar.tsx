import { SiteHeader } from "@/components/site/SiteHeader";
import type { SiteCopy } from "@/lib/copy";
import type { Language } from "@/lib/i18n";

type NavbarProps = {
  lang: Language;
  copy: SiteCopy["nav"];
};

/** Backwards-compatible entry point for the retired one-page landing component. */
export function Navbar({ lang }: NavbarProps) {
  return <SiteHeader lang={lang} />;
}
