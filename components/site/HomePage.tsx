import { ArrowRightIcon, CheckCircleIcon, CubeIcon, LightningIcon, SearchIcon, UsersIcon } from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { AnalyticsPageView, TrackedLink, type AnalyticsEvent } from "@/components/site/Analytics";
import { PhilooHeroMark } from "@/components/site/PhilooHeroMark";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Language } from "@/lib/i18n";

type RouteCard = {
  href: string;
  title: string;
  body: string;
  cta: string;
  badge?: string;
  accent: "green" | "purple" | "blue";
};

const homeCopy: Record<Language, {
  eyebrow: string;
  title: string;
  intro: string;
  routes: RouteCard[];
  whyEyebrow: string;
  whyTitle: string;
  whyBody: string;
  benefits: string[];
}> = {
  nl: {
    eyebrow: "SOFTWARE & AI VOOR RECRUITMENTBUREAUS",
    title: "Meer plaatsingen met dezelfde capaciteit.",
    intro: "Philoo bouwt software en AI voor recruitmentbureaus die handmatig werk verminderen, zodat recruiters sneller kunnen werken en meer tijd hebben voor kandidaten en klanten.",
    routes: [
      { href: "/maatwerk", title: "Maatwerk software, AI & automatisering", body: "Verminder handmatig werk in je recruitmentproces. Philoo bouwt oplossingen rond je ATS, CRM en werkwijze.", cta: "Bekijk maatwerk", accent: "green" },
      { href: "/cv-studio", badge: "Vroege toegang", title: "CV Studio", body: "Maak van één bron-CV snel de juiste versie voor je bureau, opdrachtgever of aanbesteding.", cta: "Bekijk CV Studio", accent: "purple" },
      { href: "/auto-sourcer", badge: "In ontwikkeling", title: "Automatisch kandidaten vinden", body: "Vind geschikte kandidaten in én buiten je CRM, zonder uren handmatig te zoeken.", cta: "Bekijk hoe het werkt", accent: "blue" },
    ],
    whyEyebrow: "WAAROM PHILOO",
    whyTitle: "Meer tijd voor kandidaten, klanten en plaatsingen",
    whyBody: "Philoo neemt terugkerend en handmatig werk uit handen, zodat recruiters sneller kunnen schakelen en meer tijd overhouden voor het werk dat echt telt.",
    benefits: ["Minder handmatig werk", "Sneller geschikte kandidaten vinden", "Werkt met je huidige systemen", "Recruiter houdt controle"],
  },
  en: {
    eyebrow: "SOFTWARE & AI FOR RECRUITMENT AGENCIES",
    title: "More placements with the same capacity.",
    intro: "Philoo builds software and AI for recruitment agencies that reduce manual work, help recruiters move faster, and create more time for candidates and clients.",
    routes: [
      { href: "/en/custom-software", title: "Custom software, AI & automation", body: "Reduce manual work in your recruitment process. Philoo builds solutions around your ATS, CRM and way of working.", cta: "View custom software", accent: "green" },
      { href: "/en/cv-studio", badge: "Early access", title: "CV Studio", body: "Turn one source CV into the right version for your agency, client or tender.", cta: "View CV Studio", accent: "purple" },
      { href: "/en/auto-sourcer", badge: "In development", title: "Find candidates automatically", body: "Find suitable candidates in and beyond your CRM, without hours of manual searching.", cta: "See how it works", accent: "blue" },
    ],
    whyEyebrow: "WHY PHILOO",
    whyTitle: "More time for candidates, clients and placements",
    whyBody: "Philoo takes recurring and manual work off your hands, so recruiters can move faster and spend more time on the work that really matters.",
    benefits: ["Less manual work", "Find suitable candidates faster", "Works with your current systems", "Recruiter stays in control"],
  },
};

const benefitIcons = [LightningIcon, SearchIcon, CubeIcon, CheckCircleIcon] as const;

export function HomePage({ lang }: { lang: Language }) {
  const copy = homeCopy[lang];

  return (
    <div className="site-page">
      <SiteHeader lang={lang} />
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main>
        <section className="relative overflow-hidden border-b border-[#EDEEFA]">
          <div className="hero-ambient absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] gap-2 px-5 pb-8 pt-12 sm:px-8 sm:pb-12 sm:pt-16 lg:grid-cols-[minmax(0,0.98fr)_minmax(380px,0.78fr)] lg:items-center lg:px-10 lg:pb-10 lg:pt-16 xl:gap-20 xl:pb-12">
            <div className="max-w-[720px]">
              <p className="text-[0.72rem] font-black tracking-[0.075em] text-[#563DFF] sm:text-xs">{copy.eyebrow}</p>
              <h1 className="mt-5 max-w-[760px] text-[clamp(2.7rem,5.4vw,5.25rem)] font-black leading-[0.98] tracking-[-0.065em] text-[#091238]">{copy.title}</h1>
              <p className="mt-6 max-w-[650px] text-[1.02rem] leading-8 text-[#4D5679] sm:text-[1.12rem]">{copy.intro}</p>
            </div>
            <div className="mx-auto -mb-2 mt-1 w-[min(40vw,220px)] min-w-0 lg:mb-0 lg:mt-0 lg:w-full lg:max-w-[430px]">
              <PhilooHeroMark />
            </div>
          </div>
        </section>

        <section aria-label={lang === "nl" ? "Oplossingen" : "Solutions"} className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
            {copy.routes.map((route) => (
              <RouteCard key={route.href} lang={lang} route={route} />
            ))}
          </div>
        </section>

        <section className="border-t border-[#ECECF6] bg-white/60 px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1080px] text-center">
            <p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{copy.whyEyebrow}</p>
            <h2 className="mx-auto mt-4 max-w-[790px] text-[clamp(2rem,4vw,3.3rem)] font-black leading-[1.05] tracking-[-0.055em] text-[#0B1239]">{copy.whyTitle}</h2>
            <p className="mx-auto mt-5 max-w-[720px] text-[1rem] leading-7 text-[#596180] sm:text-[1.08rem]">{copy.whyBody}</p>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {copy.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <div className="flex flex-col items-center gap-3" key={benefit}>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#F0EEFF] text-[#563DFF]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="max-w-[150px] text-sm font-bold leading-5 text-[#161C42]">{benefit}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

function RouteCard({ route, lang }: { route: RouteCard; lang: Language }) {
  const event: AnalyticsEvent = route.accent === "green" ? "homepage_maatwerk_click" : route.accent === "purple" ? "homepage_cvstudio_click" : "homepage_autosourcer_click";
  const accent = {
    green: "border-[#D5F1E1] bg-[linear-gradient(145deg,#ffffff,#FAFFFC)] text-[#159A61] hover:border-[#98DDBB]",
    purple: "border-[#DDD8FF] bg-[linear-gradient(145deg,#ffffff,#FAF9FF)] text-[#563DFF] shadow-[0_16px_36px_rgba(86,61,255,0.1)] hover:border-[#B6A9FF]",
    blue: "border-[#DCE8FF] bg-[linear-gradient(145deg,#ffffff,#FAFCFF)] text-[#1769FF] hover:border-[#AFCBFF]",
  }[route.accent];

  return (
    <article className={`flex min-h-[292px] flex-col rounded-[1.55rem] border p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7 ${accent}`}>
      <div className="flex min-h-8 items-start justify-between gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-[0_8px_20px_rgba(43,39,103,0.08)]">
          {route.accent === "green" ? <CubeIcon className="h-5 w-5" /> : route.accent === "purple" ? <UsersIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
        </span>
        {route.badge ? <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-[#5A47C9] shadow-[0_4px_14px_rgba(70,53,180,0.07)]">{route.badge}</span> : null}
      </div>
      <h2 className="mt-6 max-w-[290px] text-[1.45rem] font-black leading-[1.12] tracking-[-0.04em] text-[#10173C]">{route.title}</h2>
      <p className="mt-4 flex-1 text-[0.98rem] leading-7 text-[#505977]">{route.body}</p>
      <TrackedLink className={`mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(33,40,85,0.13)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF] ${route.accent === "green" ? "bg-[#159A61]" : route.accent === "purple" ? "bg-[#563DFF]" : "bg-[#1769FF]"}`} event={event} href={route.href} language={lang}>
        {route.cta}
        <ArrowRightIcon className="h-4 w-4" />
      </TrackedLink>
    </article>
  );
}
