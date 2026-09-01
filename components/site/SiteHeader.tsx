"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, MenuIcon, XIcon } from "@/components/Icons";
import { trackEvent } from "@/components/site/Analytics";
import { PhilooLogo } from "@/components/site/PhilooLogo";
import { CALENDLY_URL, type Language } from "@/lib/i18n";

type HeaderCopy = {
  products: string;
  productLinks: Array<{ href: string; label: string }>;
  customSoftware: { href: string; label: string };
  contact: string;
  menu: string;
  close: string;
  language: string;
};

type LanguageHrefs = Record<Language, string>;

const homeLanguageHrefs: LanguageHrefs = { nl: "/", en: "/en" };

const headerCopy: Record<Language, HeaderCopy> = {
  nl: {
    products: "Producten",
    productLinks: [
      { href: "/cv-studio", label: "CV Studio" },
      { href: "/auto-sourcer", label: "Automatisch kandidaten vinden" },
    ],
    customSoftware: { href: "/maatwerk", label: "Maatwerk" },
    contact: "Kennismaken",
    menu: "Menu openen",
    close: "Menu sluiten",
    language: "Taal wisselen",
  },
  en: {
    products: "Products",
    productLinks: [
      { href: "/en/cv-studio", label: "CV Studio" },
      { href: "/en/auto-sourcer", label: "Auto Sourcer" },
    ],
    customSoftware: { href: "/en/custom-software", label: "Custom Software" },
    contact: "Get in touch",
    menu: "Open menu",
    close: "Close menu",
    language: "Switch language",
  },
};

function LanguageLinks({ lang, hrefs, onNavigate }: { lang: Language; hrefs: LanguageHrefs; onNavigate?: () => void }) {
  const links = [{ href: hrefs.nl, label: "NL" }, { href: hrefs.en, label: "EN" }];

  return (
    <div aria-label={headerCopy[lang].language} className="flex items-center gap-1.5" role="group">
      {links.map((link) => (
        <Link
          aria-current={link.label.toLowerCase() === lang ? "page" : undefined}
          className={`grid min-h-11 min-w-11 place-items-center rounded-lg px-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF] ${
            link.label.toLowerCase() === lang ? "bg-[#F0EEFF] text-[#563DFF]" : "text-[#505777] hover:bg-[#F7F7FC]"
          }`}
          href={link.href}
          key={link.label}
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function SiteHeader({ lang, languageHrefs = homeLanguageHrefs }: { lang: Language; languageHrefs?: LanguageHrefs }) {
  const copy = headerCopy[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E9F1]/90 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <PhilooLogo href={lang === "nl" ? "/" : "/en"} />

        <nav aria-label="Primary navigation" className="hidden items-center gap-2 lg:flex">
          <div className="relative">
            <button
              aria-expanded={productsOpen}
              aria-haspopup="menu"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-4 text-sm font-bold text-[#11183B] transition-colors hover:bg-[#F7F7FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]"
              onClick={() => setProductsOpen((open) => !open)}
              type="button"
            >
              {copy.products}
              <span aria-hidden="true" className={`text-base transition-transform ${productsOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            {productsOpen ? (
              <div className="absolute left-0 top-[calc(100%+0.6rem)] w-64 rounded-2xl border border-[#E5E3FF] bg-white p-2 shadow-[0_20px_55px_rgba(43,37,114,0.14)]" role="menu">
                {copy.productLinks.map((item) => (
                  <Link
                    className="block rounded-xl px-4 py-3 text-sm font-bold text-[#171D45] transition-colors hover:bg-[#F4F2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]"
                    href={item.href}
                    key={item.href}
                    onClick={() => setProductsOpen(false)}
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-bold text-[#11183B] transition-colors hover:bg-[#F7F7FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" href={copy.customSoftware.href}>
            {copy.customSoftware.label}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageLinks hrefs={languageHrefs} lang={lang} />
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#091238] px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(9,18,56,0.16)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]"
            href={CALENDLY_URL}
            onClick={() => trackEvent("calendly_cta_click", { language: lang, sourceCategory: "calendly" })}
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.contact}
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? copy.close : copy.menu}
          className="grid min-h-11 min-w-11 place-items-center rounded-xl border border-[#E4E5ED] text-[#11183B] transition-colors hover:bg-[#F7F7FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF] lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen ? (
        <div aria-modal="true" className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto border-t border-[#E8E9F1] bg-white px-5 py-6 sm:px-8 lg:hidden" id="mobile-navigation" ref={panelRef} role="dialog" tabIndex={-1}>
          <nav aria-label="Mobile navigation" className="mx-auto grid max-w-xl gap-2">
            <p className="px-3 pb-1 pt-2 text-xs font-black uppercase tracking-[0.08em] text-[#684EFF]">{copy.products}</p>
            {copy.productLinks.map((item) => (
              <Link className="min-h-12 rounded-xl px-4 py-3 text-base font-bold text-[#11183B] hover:bg-[#F5F4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link className="min-h-12 rounded-xl px-4 py-3 text-base font-bold text-[#11183B] hover:bg-[#F5F4FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href={copy.customSoftware.href} onClick={() => setMenuOpen(false)}>
              {copy.customSoftware.label}
            </Link>
            <div className="mt-4 border-t border-[#EAEBF2] pt-4">
              <LanguageLinks hrefs={languageHrefs} lang={lang} onNavigate={() => setMenuOpen(false)} />
            </div>
            <a className="mt-3 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#563DFF] px-5 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" href={CALENDLY_URL} onClick={() => trackEvent("calendly_cta_click", { language: lang, sourceCategory: "calendly" })} rel="noopener noreferrer" target="_blank">
              {copy.contact}
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
