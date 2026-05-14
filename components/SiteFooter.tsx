import Link from "next/link";
import type { Language } from "@/lib/i18n";

const footerCopy = {
  nl: {
    copyright: "© 2026 Philoo. Alle rechten voorbehouden.",
    privacyLabel: "Privacybeleid",
    privacyHref: "/nl/privacybeleid",
    termsLabel: "Algemene voorwaarden",
    termsHref: "/nl/algemene-voorwaarden",
  },
  en: {
    copyright: "© 2026 Philoo. All rights reserved.",
    privacyLabel: "Privacy Policy",
    privacyHref: "/en/privacy-policy",
    termsLabel: "Terms and Conditions",
    termsHref: "/en/terms-and-conditions",
  },
} as const;

export function SiteFooter({ lang }: { lang: Language }) {
  const copy = footerCopy[lang];

  return (
    <footer className="mt-6 border-t border-[#E6E8EF]/14 bg-[#14243A]">
      <div className="mx-auto max-w-[1620px] px-4 py-5 sm:px-6 lg:px-10 xl:px-12 2xl:px-14">
        <div className="flex flex-col gap-3 text-sm text-white/82 sm:flex-row sm:items-center sm:justify-between">
          <p>{copy.copyright}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <Link className="transition-colors hover:text-[#D6C48A] hover:underline" href={copy.privacyHref}>
              {copy.privacyLabel}
            </Link>
            <Link className="transition-colors hover:text-[#D6C48A] hover:underline" href={copy.termsHref}>
              {copy.termsLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
