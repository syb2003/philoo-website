import Link from "next/link";
import { PhilooLogo } from "@/components/site/PhilooLogo";
import type { Language } from "@/lib/i18n";

const footerCopy = {
  nl: { copyright: "© 2026 Philoo. Alle rechten voorbehouden.", aboutLabel: "Over Philoo", aboutHref: "/over", privacyLabel: "Privacybeleid", privacyHref: "/nl/privacybeleid", termsLabel: "Algemene voorwaarden", termsHref: "/nl/algemene-voorwaarden" },
  en: { copyright: "© 2026 Philoo. All rights reserved.", aboutLabel: "About Philoo", aboutHref: "/en/about", privacyLabel: "Privacy Policy", privacyHref: "/en/privacy-policy", termsLabel: "Terms and Conditions", termsHref: "/en/terms-and-conditions" },
} as const;

export function SiteFooter({ lang }: { lang: Language }) {
  const copy = footerCopy[lang];

  return (
    <footer className="border-t border-[#E8E9F1] bg-white">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Philoo", url: "https://www.philoo.nl" }),
        }}
        type="application/ld+json"
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <PhilooLogo href={lang === "nl" ? "/" : "/en"} />
        <div className="flex flex-col gap-3 text-sm text-[#596180] sm:flex-row sm:items-center sm:gap-6">
          <span>{copy.copyright}</span>
          <a className="font-semibold text-[#30395F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href="mailto:hello@philoo.nl">hello@philoo.nl</a>
          <Link className="font-semibold text-[#30395F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href={copy.aboutHref}>{copy.aboutLabel}</Link>
          <Link className="font-semibold text-[#30395F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href={copy.privacyHref}>{copy.privacyLabel}</Link>
          <Link className="font-semibold text-[#30395F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href={copy.termsHref}>{copy.termsLabel}</Link>
        </div>
      </div>
    </footer>
  );
}
