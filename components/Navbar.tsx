"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, MenuIcon, XIcon } from "@/components/Icons";
import { languageStorageKey, type Language } from "@/lib/i18n";
import type { SectionId } from "@/lib/copy";

type NavCopy = {
  items: Array<{
    id: SectionId;
    label: string;
  }>;
  cta: string;
  menu: string;
  close: string;
  language: string;
};

type NavbarProps = {
  lang: Language;
  copy: NavCopy;
};

export function Navbar({ lang, copy }: NavbarProps) {
  const [activeId, setActiveId] = useState<SectionId>("examples");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = copy.items.map((item) => item.id);

    function updateActiveSection() {
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= 156) {
          current = id;
        }
      }

      const nearPageEnd =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 160;
      const lastSection = document.getElementById(sectionIds[sectionIds.length - 1]);
      const lastSectionIsVisible =
        !!lastSection && lastSection.getBoundingClientRect().top <= window.innerHeight * 0.78;

      if (nearPageEnd || lastSectionIsVisible) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveId(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [copy.items]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function saveLanguage(nextLanguage: Language) {
    window.localStorage.setItem(languageStorageKey, nextLanguage);
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4 lg:px-5">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1440px] items-center justify-between rounded-[16px] border border-white/10 bg-[linear-gradient(135deg,#161851,#14243A)] px-4 py-3 shadow-[0_18px_50px_rgba(15,23,54,0.18)] sm:px-6 lg:px-8"
      >
        <a
          aria-label="Philoo"
          className="text-[1.75rem] font-black leading-none tracking-[0] text-white sm:text-[2.15rem]"
          href={`/${lang}`}
        >
          Philoo
        </a>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-4">
            {copy.items.map((item) => (
              <a
                aria-current={activeId === item.id ? "location" : undefined}
                className={`rounded-full border px-5 py-3 text-sm font-extrabold leading-none transition-colors ${
                  activeId === item.id
                    ? "border-[#D6C48A]/80 bg-[#D6C48A]/12 text-[#D6C48A]"
                    : "border-transparent text-white hover:border-white/10 hover:bg-white/5"
                }`}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.label}
              </a>
            ))}
          </div>

          <LanguageToggle
            ariaLabel={copy.language}
            currentLanguage={lang}
            onSelect={saveLanguage}
          />

          <a
            className="inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#D6C48A] px-5 py-4 text-sm font-extrabold text-[#0F1736] shadow-[0_12px_26px_rgba(214,196,138,0.26)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#161851]"
            href="mailto:hello@philoo.nl"
          >
            {copy.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle
            ariaLabel={copy.language}
            currentLanguage={lang}
            onSelect={saveLanguage}
          />
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.close : copy.menu}
            className="grid h-11 w-11 place-items-center rounded-[10px] border border-white/12 bg-white/6 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#D6C48A]"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className="mx-auto mt-2 max-w-[1440px] rounded-[14px] border border-[#E6E8EF] bg-white/96 p-3 shadow-[0_18px_45px_rgba(15,23,54,0.14)] backdrop-blur lg:hidden"
          id="mobile-navigation"
        >
          <div className="grid gap-1">
            {copy.items.map((item) => (
              <a
                aria-current={activeId === item.id ? "location" : undefined}
                className={`rounded-[10px] border px-4 py-3 text-sm font-extrabold transition-colors ${
                  activeId === item.id
                    ? "border-[#D6C48A]/75 bg-[#D6C48A]/16 text-[#161851]"
                    : "border-transparent text-[#0F1736] hover:bg-[#F7F8FA]"
                }`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <a
            className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-[10px] bg-[#161851] px-5 py-4 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(22,24,81,0.18)]"
            href="mailto:hello@philoo.nl"
            onClick={() => setMenuOpen(false)}
          >
            {copy.cta}
            <ArrowRightIcon className="h-4 w-4 text-[#D6C48A]" />
          </a>
        </div>
      ) : null}
    </header>
  );
}

function LanguageToggle({
  ariaLabel,
  currentLanguage,
  onSelect,
}: {
  ariaLabel: string;
  currentLanguage: Language;
  onSelect: (language: Language) => void;
}) {
  return (
    <div
      aria-label={ariaLabel}
      className="flex items-center gap-2 text-sm font-black leading-none"
      role="group"
    >
      <Link
        aria-current={currentLanguage === "nl" ? "page" : undefined}
        className={currentLanguage === "nl" ? "text-[#D6C48A]" : "text-white/82 hover:text-white"}
        href="/nl"
        onClick={() => onSelect("nl")}
      >
        NL
      </Link>
      <span aria-hidden="true" className="text-white/45">
        |
      </span>
      <Link
        aria-current={currentLanguage === "en" ? "page" : undefined}
        className={currentLanguage === "en" ? "text-[#D6C48A]" : "text-white/82 hover:text-white"}
        href="/en"
        onClick={() => onSelect("en")}
      >
        EN
      </Link>
    </div>
  );
}
