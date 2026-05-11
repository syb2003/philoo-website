"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [activeId, setActiveId] = useState<SectionId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const pendingActiveRef = useRef<SectionId | null>(null);
  const pendingUntilRef = useRef(0);
  const navItems = copy.items;

  function getNavbarHeight() {
    return headerRef.current?.offsetHeight ?? 88;
  }

  function syncNavbarHeight() {
    const navbarHeight = getNavbarHeight();
    document.documentElement.style.setProperty("--navbar-height", `${navbarHeight}px`);

    return navbarHeight;
  }

  function getSectionTop(sectionId: SectionId) {
    const section = document.getElementById(sectionId);

    if (!section) {
      return null;
    }

    return section.getBoundingClientRect().top + window.scrollY;
  }

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    function updateActiveSection() {
      const navbarHeight = syncNavbarHeight();
      const triggerLine = window.scrollY + navbarHeight + 80;

      let current = sectionIds[0];

      for (const id of sectionIds) {
        const sectionTop = getSectionTop(id);

        if (sectionTop === null) {
          continue;
        }

        if (sectionTop <= triggerLine) {
          current = id;
          continue;
        }

        break;
      }

      const pendingId = pendingActiveRef.current;

      if (pendingId && Date.now() < pendingUntilRef.current) {
        const pendingIndex = sectionIds.indexOf(pendingId);
        const nextPendingId = sectionIds[pendingIndex + 1];
        const pendingTop = getSectionTop(pendingId);
        const nextPendingTop = nextPendingId ? getSectionTop(nextPendingId) : null;

        if (
          pendingTop !== null &&
          triggerLine >= pendingTop &&
          (nextPendingTop === null || triggerLine < nextPendingTop)
        ) {
          setActiveId(pendingId);
          return;
        }

        if (pendingTop !== null && triggerLine < pendingTop) {
          setActiveId(pendingId);
          return;
        }
      }

      pendingActiveRef.current = null;
      setActiveId(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navItems]);

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

  function scrollToSection(sectionId: SectionId) {
    const sectionTop = getSectionTop(sectionId);

    if (sectionTop === null) {
      return;
    }

    const navbarHeight = syncNavbarHeight();
    const sectionIndex = navItems.findIndex((item) => item.id === sectionId);
    const nextSectionId = navItems[sectionIndex + 1]?.id;
    const nextSectionTop = nextSectionId ? getSectionTop(nextSectionId) : null;
    const desiredTop = sectionTop - navbarHeight - 40;
    const maxTopBeforeNext =
      nextSectionTop !== null ? nextSectionTop - navbarHeight - 92 : desiredTop;
    const top = Math.min(desiredTop, maxTopBeforeNext);

    pendingActiveRef.current = sectionId;
    pendingUntilRef.current = Date.now() + 900;
    setActiveId(sectionId);
    setMenuOpen(false);
    window.history.replaceState(null, "", `#${sectionId}`);
    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  }

  return (
    <header ref={headerRef} className="sticky top-3 z-[70] px-3 sm:top-4 sm:px-4 lg:px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1620px] items-center justify-between rounded-[16px] border border-white/12 border-b-white/18 bg-[linear-gradient(135deg,rgba(22,24,81,0.96),rgba(20,36,58,0.98))] px-4 py-3 shadow-[0_22px_56px_rgba(15,23,54,0.24),0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-6 lg:grid lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-6 lg:px-7 lg:py-[0.82rem] xl:gap-8"
      >
        <a
          aria-label="Philoo"
          className="text-[1.75rem] font-black leading-none tracking-[0] text-white sm:text-[2.15rem]"
          href={`/${lang}`}
        >
          Philoo
        </a>

        <div className="hidden items-center justify-self-center lg:flex">
          <div className="flex items-center gap-2 xl:gap-3">
            {navItems.map((item) => (
              <a
                aria-current={activeId === item.id ? "location" : undefined}
                className={`rounded-full border px-4 py-[0.82rem] text-sm font-extrabold leading-none transition-colors xl:px-5 ${
                  activeId === item.id
                    ? "border-[#D6C48A]/80 bg-[#D6C48A]/12 text-[#D6C48A]"
                    : "border-transparent text-white hover:border-white/10 hover:bg-white/5"
                }`}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-self-end gap-4 xl:gap-5 lg:flex">
          <LanguageToggle
            ariaLabel={copy.language}
            currentLanguage={lang}
            onSelect={saveLanguage}
          />

          <a
            className="inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#D6C48A] px-5 py-4 text-sm font-extrabold text-[#0F1736] shadow-[0_12px_26px_rgba(214,196,138,0.26)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#161851] xl:px-6"
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
          className="mx-auto mt-2 max-w-[1620px] rounded-[14px] border border-[#E6E8EF] bg-white/96 p-3 shadow-[0_18px_45px_rgba(15,23,54,0.14)] backdrop-blur lg:hidden"
          id="mobile-navigation"
        >
          <div className="grid gap-1">
            {navItems.map((item) => (
              <a
                aria-current={activeId === item.id ? "location" : undefined}
                className={`rounded-[10px] border px-4 py-3 text-sm font-extrabold transition-colors ${
                  activeId === item.id
                    ? "border-[#D6C48A]/75 bg-[#D6C48A]/16 text-[#161851]"
                    : "border-transparent text-[#0F1736] hover:bg-[#F7F8FA]"
                }`}
                href={`#${item.id}`}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.id);
                }}
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
