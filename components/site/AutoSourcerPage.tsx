import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CubeIcon,
  FileCheckIcon,
  LightningIcon,
  SearchIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { AnalyticsPageView, TrackedLink } from "@/components/site/Analytics";
import { ProductInterestForm } from "@/components/site/ProductInterestForm";
import { PhilooMark } from "@/components/site/PhilooMark";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Language } from "@/lib/i18n";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Card = { title: string; body: string; icon: Icon };

type AutoSourcerCopy = {
  hero: { eyebrow: string; status: string; title: string; body: string; primary: string; secondary: string };
  internal: string;
  external: string;
  candidates: string[];
  sources: string[];
  principles: Card[];
  steps: { eyebrow: string; title: string; items: Card[] };
  development: { eyebrow: string; title: string; body: string };
  interest: { title: string; body: string; cta: string };
};

const pairedLanguageHrefs = { nl: "/auto-sourcer", en: "/en/auto-sourcer" };

const pageCopy: Record<Language, AutoSourcerCopy> = {
  nl: {
    hero: {
      eyebrow: "AUTOMATISCH KANDIDATEN VINDEN",
      status: "In ontwikkeling",
      title: "Vind sneller geschikte kandidaten.",
      body: "Auto Sourcer zoekt eerst in je eigen database en kijkt pas daarna buiten je CRM. Zo krijg je sneller een onderbouwde selectie van kandidaten.",
      primary: "Meld interesse",
      secondary: "Volg de ontwikkeling",
    },
    internal: "Interne database",
    external: "Externe bronnen",
    candidates: ["Kandidaat 1", "Kandidaat 2", "Kandidaat 3"],
      sources: ["Professionele netwerken", "Openbare profielen", "Andere relevante bronnen"],
    principles: [
      { title: "Eerst intern zoeken", body: "Auto Sourcer doorzoekt eerst je eigen database op relevante kandidaten.", icon: LightningIcon },
      { title: "Ook buiten je CRM", body: "Als intern niet genoeg oplevert, kan de zoektocht worden uitgebreid naar geselecteerde externe bronnen.", icon: SearchIcon },
      { title: "Onderbouwde selectie", body: "Je krijgt kandidaten met uitleg waarom ze mogelijk passen bij de vacature.", icon: FileCheckIcon },
      { title: "Recruiter houdt controle", body: "Jij beoordeelt de resultaten en bepaalt wat er daarna gebeurt.", icon: ShieldIcon },
    ],
    steps: {
      eyebrow: "HOE HET WERKT",
      title: "Van vacature naar een selectie om te beoordelen.",
      items: [
        { title: "Je deelt de vacature", body: "Je geeft de vacature, wensen en belangrijke criteria door.", icon: FileCheckIcon },
        { title: "Auto Sourcer zoekt intern en extern", body: "Eerst in je eigen database. Als dat niet genoeg oplevert, wordt de zoektocht uitgebreid naar geselecteerde externe bronnen.", icon: SearchIcon },
        { title: "Je krijgt een selectie om te beoordelen", body: "Je ontvangt een onderbouwde selectie van kandidaten en bepaalt zelf de vervolgstap.", icon: CheckCircleIcon },
      ],
    },
    development: {
      eyebrow: "IN ONTWIKKELING",
      title: "We bouwen Auto Sourcer stap voor stap.",
      body: "We ontwikkelen Auto Sourcer samen met recruitmentbureaus en testen welke aanpak in de praktijk het meeste helpt.",
    },
    interest: {
      title: "Wil je op de hoogte blijven?",
      body: "Laat weten dat je interesse hebt. We nemen contact op wanneer er een geschikte mogelijkheid is om Auto Sourcer te testen.",
      cta: "Meld interesse",
    },
  },
  en: {
    hero: {
      eyebrow: "AUTO SOURCER",
      status: "In development",
      title: "Find suitable candidates faster.",
      body: "Auto Sourcer searches your own database first and only expands beyond your CRM when needed. This gives you a faster, better-supported selection of candidates.",
      primary: "Join the waitlist",
      secondary: "Follow development",
    },
    internal: "Internal database",
    external: "External sources",
    candidates: ["Candidate 1", "Candidate 2", "Candidate 3"],
      sources: ["Professional networks", "Public profiles", "Other relevant sources"],
    principles: [
      { title: "Search internal candidates first", body: "Auto Sourcer checks your own database first for relevant candidates.", icon: LightningIcon },
      { title: "Also search beyond your CRM", body: "If internal results are not enough, the search can expand to selected external sources.", icon: SearchIcon },
      { title: "Supported selection", body: "You receive candidates with clear reasons why they may fit the vacancy.", icon: FileCheckIcon },
      { title: "Recruiter stays in control", body: "You review the results and decide what happens next.", icon: ShieldIcon },
    ],
    steps: {
      eyebrow: "HOW IT WORKS",
      title: "From vacancy to a selection to review.",
      items: [
        { title: "Share the vacancy", body: "Provide the vacancy, preferences and important criteria.", icon: FileCheckIcon },
        { title: "Auto Sourcer searches internally and externally", body: "It starts in your own database. If that is not enough, the search expands to selected external sources.", icon: SearchIcon },
        { title: "Review the selection", body: "You receive a supported selection of candidates and decide the next step.", icon: CheckCircleIcon },
      ],
    },
    development: {
      eyebrow: "IN DEVELOPMENT",
      title: "We are building Auto Sourcer step by step.",
      body: "We are developing Auto Sourcer together with recruitment agencies and testing which approach provides the most practical value.",
    },
    interest: {
      title: "Want to stay informed?",
      body: "Let us know you are interested. We will get in touch when there is a suitable opportunity to try Auto Sourcer.",
      cta: "Join the waitlist",
    },
  },
};

export function AutoSourcerPage({ lang }: { lang: Language }) {
  const copy = pageCopy[lang];
  return (
    <div className="site-page overflow-x-clip">
      <SiteHeader lang={lang} languageHrefs={pairedLanguageHrefs} />
      <AnalyticsPageView event="autosourcer_page_view" language={lang} />
      <main>
        <section className="relative overflow-hidden border-b border-[#EDEEFA]">
          <div className="hero-ambient absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] gap-7 px-5 pb-9 pt-9 sm:px-8 sm:pb-11 sm:pt-12 lg:grid-cols-[minmax(0,.82fr)_minmax(480px,1.18fr)] lg:items-center lg:px-10 lg:py-12 xl:gap-14">
            <div className="min-w-0 w-full max-w-[650px]">
              <div className="flex flex-wrap items-center gap-3"><p className="text-[0.72rem] font-black tracking-[0.075em] text-[#563DFF] sm:text-xs">{copy.hero.eyebrow}</p><span className="rounded-full bg-[#F0EEFF] px-3 py-1 text-xs font-bold text-[#563DFF]">{copy.hero.status}</span></div>
              <h1 className="mt-4 w-full max-w-[620px] break-words text-[clamp(2.65rem,4.7vw,4.65rem)] font-bold leading-[1.01] tracking-[-0.04em] text-[#091238]">{copy.hero.title}</h1>
              <p className="mt-5 w-full max-w-[615px] break-words text-[1rem] leading-7 text-[#4D5679] sm:text-[1.08rem] sm:leading-8">{copy.hero.body}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-6 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.24)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" event="autosourcer_interest_click" href="#interesse" language={lang}>{copy.hero.primary}<ArrowRightIcon className="h-5 w-5" /></TrackedLink>
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFC8FF] bg-white/85 px-6 text-base font-bold text-[#563DFF] transition-colors hover:bg-[#F5F3FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" href="#interesse">{copy.hero.secondary}<ArrowRightIcon className="h-5 w-5" /></Link>
              </div>
            </div>
            <SearchVisual copy={copy} />
          </div>
        </section>

        <section aria-label={lang === "nl" ? "Kernprincipes" : "Core principles"} className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {copy.principles.map(({ title, body, icon: Icon }) => <article className="rounded-[1.45rem] border border-[#E1E4F2] bg-white p-5 shadow-[0_12px_30px_rgba(30,37,92,0.04)] sm:p-6" key={title}><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-[1.1rem] w-[1.1rem]" /></span><h2 className="mt-4 text-[1.12rem] font-bold leading-[1.18] tracking-[-0.03em] text-[#11183B]">{title}</h2><p className="mt-2.5 text-[0.94rem] leading-6 text-[#56607E]">{body}</p></article>)}
          </div>
        </section>

        <section aria-labelledby="how-it-works-heading" className="border-y border-[#E8EAF3] bg-[#FCFCFF] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-[1240px]"><SectionIntro centered eyebrow={copy.steps.eyebrow} title={copy.steps.title} tier="compact" /><ol className="mt-7 grid gap-4 lg:grid-cols-3 lg:gap-5">{copy.steps.items.map(({ title, body, icon: Icon }, index) => <li className="rounded-[1.45rem] border border-[#E2E5F2] bg-white p-5 shadow-[0_10px_28px_rgba(26,37,93,0.035)] sm:p-6" key={title}><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#F0EEFF] text-base font-bold text-[#563DFF]">{index + 1}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F6F5FF] text-[#563DFF]"><Icon className="h-[1.1rem] w-[1.1rem]" /></span></div><h3 className="mt-5 text-[1.14rem] font-bold leading-[1.18] tracking-[-0.03em] text-[#11183B]">{title}</h3><p className="mt-2.5 text-[0.95rem] leading-6 text-[#56607E]">{body}</p></li>)}</ol></div>
        </section>

        <section className="px-5 py-9 sm:px-8 sm:py-11 lg:px-10 lg:py-12">
          <div className="mx-auto grid max-w-[1240px] gap-5 rounded-[1.75rem] border border-[#DFDDFF] bg-[linear-gradient(120deg,#FBFAFF,#F4F2FF)] p-6 shadow-[0_16px_42px_rgba(73,54,184,0.07)] sm:p-8 lg:grid-cols-[minmax(0,.85fr)_minmax(400px,1fr)] lg:items-center lg:p-9"><div><SectionIntro eyebrow={copy.development.eyebrow} title={copy.development.title} body={copy.development.body} tier="support" /></div><div className="rounded-[1.35rem] border border-white bg-white/85 p-5 shadow-[0_10px_25px_rgba(30,37,92,0.05)] sm:p-6"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><UsersIcon className="h-5 w-5" /></span><p className="mt-3 text-[1rem] font-bold leading-7 text-[#2D365E]">{lang === "nl" ? "Samen testen, leren en zorgvuldig verder bouwen." : "Testing, learning and building carefully together."}</p></div></div>
        </section>

        <section aria-labelledby="interesse-heading" className="scroll-mt-24 px-5 pb-11 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16" id="interesse">
          <div className="mx-auto max-w-[1240px] rounded-[1.85rem] border border-[#DED9FF] bg-[linear-gradient(118deg,#FBFAFF,#F4F2FF)] p-7 shadow-[0_18px_46px_rgba(78,59,189,0.1)] sm:p-10 lg:p-11"><div className="max-w-[720px]"><h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239]" id="interesse-heading">{copy.interest.title}</h2><p className="mt-4 max-w-[680px] text-[1rem] leading-7 text-[#56607E] sm:text-[1.08rem]">{copy.interest.body}</p></div><ProductInterestForm clickEvent="autosourcer_interest_click" interestType="autosourcer_interest" language={lang} submitEvent="autosourcer_interest_submit" submitLabel={copy.interest.cta} successMessage={lang === "nl" ? "Bedankt. We houden je op de hoogte." : "Thanks. We’ll keep you updated."} /></div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

function SearchVisual({ copy }: { copy: AutoSourcerCopy }) {
  return <div aria-label="Auto Sourcer internal-first sourcing visual" className="relative mx-auto min-w-0 w-full max-w-[720px] overflow-hidden rounded-[1.75rem] border border-[#E1DEFF] bg-white/85 p-4 shadow-[0_20px_54px_rgba(79,61,193,0.11)] sm:p-6"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_49%,rgba(112,84,255,0.13),transparent_29%),linear-gradient(145deg,rgba(255,255,255,.95),rgba(245,243,255,.9))]" /><div className="relative grid min-w-0 gap-5 md:grid-cols-[1fr_142px_1fr] md:items-center md:gap-6"><VisualList icon={CubeIcon} labels={copy.candidates} title={copy.internal} /><div className="relative mx-auto flex min-h-28 w-full flex-col items-center justify-center"><span aria-hidden="true" className="absolute h-28 w-28 rounded-full bg-[#EEEAFE]/70 blur-2xl" /><PhilooMark className="relative h-12 w-12 object-contain md:h-14 md:w-14" sizes="56px" /><span className="relative mt-2 text-[1.2rem] font-black leading-none tracking-[-0.075em] text-[#0A1034]">philoo</span></div><VisualList icon={SearchIcon} labels={copy.sources} title={copy.external} /></div><p className="relative mt-8 text-center text-sm font-bold text-[#4D5679]">{copy.internal} <span className="mx-2 text-[#563DFF]">→</span> {copy.external}</p></div>;
}

function VisualList({ icon: Icon, labels, title }: { icon: Icon; labels: string[]; title: string }) {
  return <div className="rounded-2xl border border-[#E5E8F4] bg-white/90 p-4 shadow-[0_10px_28px_rgba(30,37,92,.05)]"><p className="mb-3 text-[.72rem] font-black text-[#27305A]">{title}</p><div className="space-y-2">{labels.map((label) => <span className="flex min-h-10 items-center gap-2 rounded-xl bg-[#F7F7FD] px-3 text-xs font-bold text-[#30395F]" key={label}><Icon className="h-4 w-4 shrink-0 text-[#6149F0]" />{label}</span>)}</div></div>;
}

function SectionIntro({ eyebrow, title, body, centered = false, tier = "support" }: { eyebrow: string; title: string; body?: string; centered?: boolean; tier?: "primary" | "support" | "compact" }) {
  const titleClasses = { primary: "text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.06] tracking-[-0.04em]", support: "text-[clamp(1.9rem,3.15vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.04em]", compact: "text-[clamp(1.7rem,2.7vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.035em]" }[tier];
  return <div className={`${centered ? "mx-auto text-center" : ""} max-w-[720px]`}><p className="text-xs font-black tracking-[.08em] text-[#563DFF]">{eyebrow}</p><h2 className={`mt-3 ${titleClasses} text-[#0B1239]`}>{title}</h2>{body ? <p className={`${centered ? "mx-auto" : ""} mt-4 max-w-[700px] text-[1rem] leading-7 text-[#596180]`}>{body}</p> : null}</div>;
}
