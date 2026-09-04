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
        <section className="relative overflow-hidden border-b border-[#EDEEFA]" data-home-hero>
          <div className="hero-ambient absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] gap-0 px-5 pb-4 pt-9 sm:px-8 sm:pb-7 sm:pt-11 lg:grid-cols-[minmax(0,1fr)_minmax(300px,0.68fr)] lg:items-center lg:gap-12 lg:px-10 lg:py-5 xl:gap-16">
            <div className="max-w-[700px]">
              <p className="text-[0.72rem] font-black tracking-[0.075em] text-[#563DFF] sm:text-xs">{copy.eyebrow}</p>
              <h1 className="mt-4 max-w-[580px] text-[clamp(2.65rem,4.65vw,4.6rem)] font-bold leading-[1.01] tracking-[-0.04em] text-[#091238]">{copy.title}</h1>
              <p className="mt-5 max-w-[660px] text-[1rem] leading-7 text-[#4D5679] sm:text-[1.08rem] sm:leading-8">{copy.intro}</p>
            </div>
            <div className="mx-auto mt-1 w-[min(34vw,128px)] min-w-0 lg:mt-0 lg:w-full lg:max-w-[360px]" data-home-hero-mark>
              <PhilooHeroMark />
            </div>
          </div>
        </section>

        <section aria-label={lang === "nl" ? "Oplossingen" : "Solutions"} className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-5">
          <div className="grid gap-4 lg:grid-cols-3 lg:gap-6" data-home-route-cards>
            {copy.routes.map((route) => (
              <RouteCard key={route.href} lang={lang} route={route} />
            ))}
          </div>
        </section>

        <section className="border-t border-[#ECECF6] bg-white/60 px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14" data-home-why>
          <div className="mx-auto max-w-[1040px] text-center">
            <p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{copy.whyEyebrow}</p>
            <h2 className="mx-auto mt-3 max-w-[760px] text-[clamp(1.8rem,3.25vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0B1239]">{copy.whyTitle}</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-[1rem] leading-7 text-[#596180]">{copy.whyBody}</p>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-7 lg:grid-cols-4 lg:gap-5">
              {copy.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index];
                return (
                  <div className="flex flex-col items-center gap-2.5" key={benefit}>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#F0EEFF] text-[#563DFF]">
                      <Icon className="h-[1.1rem] w-[1.1rem]" />
                    </span>
                    <h3 className="max-w-[155px] text-sm font-bold leading-5 text-[#161C42]">{benefit}</h3>
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
    <article className="h-full" data-home-route-card>
      <TrackedLink aria-label={`${route.title}: ${route.cta}`} className={`group flex h-full min-h-[286px] flex-col rounded-[1.55rem] border p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none sm:p-6 ${accent}`} event={event} href={route.href} language={lang}>
        <div className="flex min-h-8 items-start justify-between gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white shadow-[0_8px_20px_rgba(43,39,103,0.08)]">
            {route.accent === "green" ? <CubeIcon className="h-5 w-5" /> : route.accent === "purple" ? <UsersIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
          </span>
          {route.badge ? <span className="rounded-full bg-white/85 px-3 py-1.5 text-xs font-bold text-[#5A47C9] shadow-[0_4px_14px_rgba(70,53,180,0.07)]">{route.badge}</span> : null}
        </div>
        <h2 className="mt-5 max-w-[290px] text-[1.38rem] font-bold leading-[1.14] tracking-[-0.035em] text-[#10173C]">{route.title}</h2>
        <p className="mt-3 flex-1 text-[0.96rem] leading-7 text-[#505977]">{route.body}</p>
        <span aria-hidden="true" className={`mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold text-white shadow-[0_10px_22px_rgba(33,40,85,0.13)] transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none ${route.accent === "green" ? "bg-[#159A61]" : route.accent === "purple" ? "bg-[#563DFF]" : "bg-[#1769FF]"}`} data-home-route-cta>
          {route.cta}
          <ArrowRightIcon className="h-4 w-4" />
        </span>
      </TrackedLink>
    </article>
  );
}
