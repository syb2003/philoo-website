"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MenuIcon, XIcon } from "@/components/Icons";
import { PhilooMark } from "@/components/site/PhilooMark";
import { ScoutTrackedLink } from "@/components/scout/ScoutTracking";
import type { Language } from "@/lib/i18n";
import { scoutPaths, scoutUi, type ScoutPageKey } from "@/lib/scout";
import styles from "@/components/scout/scout.module.css";

export function ScoutShell({ children, currentPage, lang }: { children: ReactNode; currentPage: ScoutPageKey; lang: Language }) {
  return (
    <div className={styles.site}>
      <a className={styles.skipLink} href="#main-content">
        {lang === "nl" ? "Ga naar inhoud" : "Skip to content"}
      </a>
      <ScoutHeader currentPage={currentPage} lang={lang} />
      {children}
      <ScoutFooter lang={lang} />
    </div>
  );
}

function ScoutLogo({ lang }: { lang: Language }) {
  return (
    <Link aria-label={lang === "nl" ? "Philoo Scout home" : "Philoo Scout home"} className={styles.logo} href={scoutPaths.home[lang]}>
      <PhilooMark className={styles.logoMark} priority sizes="34px" />
      <span className={styles.logoWord}>philoo</span>
      <span className={styles.logoProduct}>Scout</span>
    </Link>
  );
}

function ScoutHeader({ currentPage, lang }: { currentPage: ScoutPageKey; lang: Language }) {
  const copy = scoutUi[lang];
  const contactHref = currentPage === "home" ? "#contact" : `${scoutPaths.home[lang]}#contact`;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const audienceRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = Array.from(
      mobilePanelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
    );
    focusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const languageLinks = (
    <div aria-label={copy.language} className={styles.languageLinks} role="group">
      {(["nl", "en"] as const).map((language) => (
        <Link
          aria-current={language === lang ? "page" : undefined}
          className={language === lang ? styles.languageActive : styles.languageLink}
          href={scoutPaths[currentPage][language]}
          key={language}
          onClick={() => setMenuOpen(false)}
        >
          {language.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <ScoutLogo lang={lang} />

          <nav aria-label={copy.primaryNavigation} className={styles.desktopNav}>
            <ScoutTrackedLink
              aria-current={currentPage === "howItWorks" ? "page" : undefined}
              className={styles.navLink}
              event="scout_how_it_works_click"
              href={scoutPaths.howItWorks[lang]}
              language={lang}
              placement="header"
            >
              {copy.howItWorks}
            </ScoutTrackedLink>
            <details
              className={styles.audienceMenu}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  audienceRef.current?.removeAttribute("open");
                  audienceRef.current?.querySelector<HTMLElement>("summary")?.focus();
                }
              }}
              ref={audienceRef}
            >
              <summary className={styles.navLink}>
                {copy.audience}
                <span aria-hidden="true" className={styles.chevron}>⌄</span>
              </summary>
              <div className={styles.audiencePanel}>
                <ScoutTrackedLink
                  aria-current={currentPage === "companies" ? "page" : undefined}
                  className={styles.audienceLink}
                  event="scout_audience_navigation"
                  href={scoutPaths.companies[lang]}
                  language={lang}
                  placement="header-companies"
                >
                  <strong>{copy.companies}</strong>
                  <span>{lang === "nl" ? "Voor leidinggevenden en interne recruiters" : "For hiring managers and in-house recruiters"}</span>
                </ScoutTrackedLink>
                <ScoutTrackedLink
                  aria-current={currentPage === "agencies" ? "page" : undefined}
                  className={styles.audienceLink}
                  event="scout_audience_navigation"
                  href={scoutPaths.agencies[lang]}
                  language={lang}
                  placement="header-agencies"
                >
                  <strong>{copy.agencies}</strong>
                  <span>{lang === "nl" ? "Voor bureaus die zoeken voor klanten" : "For agencies sourcing for clients"}</span>
                </ScoutTrackedLink>
              </div>
            </details>
            <Link className={styles.navLink} href={contactHref}>
              {copy.contact}
            </Link>
          </nav>

          <div className={styles.headerActions}>
            {languageLinks}
            <ScoutTrackedLink className={styles.primaryButtonSmall} event="scout_primary_cta_click" href={scoutPaths.demo[lang]} language={lang} placement="header">
              {copy.demo}
            </ScoutTrackedLink>
          </div>

          <button
            aria-controls="scout-mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.close : copy.menu}
            className={styles.mobileMenuButton}
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButtonRef}
            type="button"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div aria-modal="true" className={styles.mobilePanel} id="scout-mobile-navigation" ref={mobilePanelRef} role="dialog" tabIndex={-1}>
          <nav aria-label={copy.mobileNavigation} className={styles.mobileNav}>
            <ScoutTrackedLink
              aria-current={currentPage === "howItWorks" ? "page" : undefined}
              className={styles.mobileNavLink}
              event="scout_how_it_works_click"
              href={scoutPaths.howItWorks[lang]}
              language={lang}
              onClick={() => setMenuOpen(false)}
              placement="mobile-menu"
            >
              {copy.howItWorks}
            </ScoutTrackedLink>
            <p className={styles.mobileNavLabel}>{copy.audience}</p>
            <ScoutTrackedLink aria-current={currentPage === "companies" ? "page" : undefined} className={styles.mobileNavLink} event="scout_audience_navigation" href={scoutPaths.companies[lang]} language={lang} onClick={() => setMenuOpen(false)} placement="mobile-companies">
              {copy.companies}
            </ScoutTrackedLink>
            <ScoutTrackedLink aria-current={currentPage === "agencies" ? "page" : undefined} className={styles.mobileNavLink} event="scout_audience_navigation" href={scoutPaths.agencies[lang]} language={lang} onClick={() => setMenuOpen(false)} placement="mobile-agencies">
              {copy.agencies}
            </ScoutTrackedLink>
            <Link className={styles.mobileNavLink} href={contactHref} onClick={() => setMenuOpen(false)}>
              {copy.contact}
            </Link>
            <div className={styles.mobileLanguage}>{languageLinks}</div>
            <ScoutTrackedLink className={styles.primaryButton} event="scout_primary_cta_click" href={scoutPaths.demo[lang]} language={lang} onClick={() => setMenuOpen(false)} placement="mobile-menu">
              {copy.demo}
            </ScoutTrackedLink>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function ScoutFooter({ lang }: { lang: Language }) {
  const copy = scoutUi[lang];
  const privacyHref = lang === "nl" ? "/nl/privacybeleid" : "/en/privacy-policy";
  const termsHref = lang === "nl" ? "/nl/algemene-voorwaarden" : "/en/terms-and-conditions";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <ScoutLogo lang={lang} />
          <span>{copy.copyright}</span>
        </div>
        <nav aria-label={copy.footerNavigation} className={styles.footerLinks}>
          <a href="mailto:hello@philoo.nl">hello@philoo.nl</a>
          <Link href={privacyHref}>{copy.privacy}</Link>
          <Link href={termsHref}>{copy.terms}</Link>
        </nav>
      </div>
    </footer>
  );
}
