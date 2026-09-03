import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  BuildingIcon,
  CalendarIcon,
  ChatIcon,
  FileCheckIcon,
  MailIcon,
  SearchIcon,
  SlidersIcon,
  UsersIcon,
} from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { AnalyticsPageView, TrackedAnchor } from "@/components/site/Analytics";
import { MaatwerkDemo } from "@/components/site/MaatwerkDemo";
import { PhilooMark } from "@/components/site/PhilooMark";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CALENDLY_URL, type Language } from "@/lib/i18n";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

type Example = { title: string; body: string; icon: Icon };

type PageCopy = {
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string };
  examples: { eyebrow: string; title: string; body: string; cards: Example[] };
  systems: { eyebrow: string; title: string; body: string; supporting: string; existing: string; layer: string; processes: string };
  approach: { eyebrow: string; title: string; steps: Array<{ title: string; body: string }> };
  cta: { title: string; body: string; label: string };
  visual: { inputs: string; layer: string; outputs: string; existing: string[]; processes: string[] };
};

const pageCopy: Record<Language, PageCopy> = {
  nl: {
    hero: {
      eyebrow: "MAATWERK SOFTWARE",
      title: "Minder handmatig werk. Meer tijd voor recruitment.",
      body: "Philoo bouwt maatwerk software, AI en automatisering die aansluit op je ATS, CRM en werkwijze. Zo kan je team sneller werken en blijft er meer tijd over voor kandidaten en klanten.",
      primary: "Bespreek een proces",
      secondary: "Bekijk voorbeelden",
    },
    examples: {
      eyebrow: "WAAR PHILOO KAN HELPEN",
      title: "Minder tijd kwijt aan werk dat steeds terugkomt.",
      body: "Niet ieder recruitmentproces past precies in standaardsoftware. Philoo bouwt oplossingen voor stappen waar teams nu nog veel handmatig werk aan hebben.",
      cards: [
        { title: "Intake & opvolging", body: "Leg informatie sneller vast en zorg dat afspraken, acties en terugkoppeling niet blijven liggen.", icon: ChatIcon },
        { title: "Kandidaten vinden", body: "Zoek, combineer en beoordeel kandidaten sneller wanneer handmatig zoeken te veel tijd kost.", icon: SearchIcon },
        { title: "Documenten & gegevens", body: "Verwerk documenten en gegevens slimmer, zonder dezelfde informatie steeds opnieuw over te nemen.", icon: FileCheckIcon },
        { title: "Planning & bezetting", body: "Maak planning en capaciteit makkelijker inzichtelijk en verminder handmatige afstemming.", icon: CalendarIcon },
      ],
    },
    systems: {
      eyebrow: "MAATWERK RONDOM JE HUIDIGE SYSTEMEN",
      title: "Geen nieuw systeem als dat niet nodig is.",
      body: "Recruitmentbureaus werken al met een ATS, CRM en andere software. Philoo bouwt daarom liever voort op wat er al staat en vult aan waar een proces nog onnodig handmatig is.",
      supporting: "Voor processen waar standaardsoftware net niet genoeg kan.",
      existing: "Huidige systemen",
      layer: "Philoo maatwerk",
      processes: "Praktische processtappen",
    },
    approach: {
      eyebrow: "HOE WE WERKEN",
      title: "Klein beginnen. Daarna verder bouwen.",
      steps: [
        { title: "We kiezen een concreet proces", body: "Samen bepalen we waar nu veel tijd verloren gaat en wat een eerste nuttige verbetering is." },
        { title: "We bouwen een eerste oplossing", body: "We maken een werkende oplossing die past bij jullie systemen, gegevens en manier van werken." },
        { title: "We verbeteren stap voor stap", body: "Op basis van gebruik en feedback bepalen we wat daarna slimmer of verder geautomatiseerd kan worden." },
      ],
    },
    cta: {
      title: "Waar zit in jullie proces nog te veel handmatig werk?",
      body: "Bespreek het met Philoo. We kijken samen of maatwerk software, AI of automatisering daar een praktische oplossing voor kan zijn.",
      label: "Bespreek een proces",
    },
    visual: {
      inputs: "Bestaande informatie",
      layer: "Philoo maatwerk",
      outputs: "Processtappen",
      existing: ["ATS", "CRM", "E-mail", "Agenda"],
      processes: ["Opvolging", "Documenten", "Planning", "Kandidaten"],
    },
  },
  en: {
    hero: {
      eyebrow: "CUSTOM SOFTWARE",
      title: "Less manual work. More time for recruitment.",
      body: "Philoo builds custom software, AI and automation around your ATS, CRM and way of working. This helps your team move faster and spend more time on candidates and clients.",
      primary: "Discuss a process",
      secondary: "View examples",
    },
    examples: {
      eyebrow: "WHERE PHILOO CAN HELP",
      title: "Spend less time on work that keeps coming back.",
      body: "Not every recruitment process fits neatly into standard software. Philoo builds solutions for steps where teams still spend too much time on manual work.",
      cards: [
        { title: "Intake & follow-up", body: "Capture information faster and keep actions, agreements and feedback from getting lost.", icon: ChatIcon },
        { title: "Finding candidates", body: "Search, combine and review candidates faster when manual searching takes too much time.", icon: SearchIcon },
        { title: "Documents & data", body: "Handle documents and information more efficiently without repeatedly copying the same data.", icon: FileCheckIcon },
        { title: "Planning & capacity", body: "Make workload and capacity easier to manage with less manual coordination.", icon: CalendarIcon },
      ],
    },
    systems: {
      eyebrow: "BUILT AROUND YOUR CURRENT SYSTEMS",
      title: "No new system when you do not need one.",
      body: "Recruitment agencies already work with an ATS, CRM and other software. Philoo builds around what is already there and fills the gaps where a process is still unnecessarily manual.",
      supporting: "For processes where standard software does not go far enough.",
      existing: "Current systems",
      layer: "Philoo custom software",
      processes: "Practical process steps",
    },
    approach: {
      eyebrow: "HOW WE WORK",
      title: "Start small. Build from there.",
      steps: [
        { title: "Choose one concrete process", body: "Together we identify where time is being lost and where a first useful improvement can be made." },
        { title: "Build a first solution", body: "We create a working solution that fits your systems, data and way of working." },
        { title: "Improve step by step", body: "Based on usage and feedback, we decide what should be improved or automated next." },
      ],
    },
    cta: {
      title: "Where is manual work slowing down your process?",
      body: "Discuss it with Philoo. Together we can see whether custom software, AI or automation offers a practical solution.",
      label: "Discuss a process",
    },
    visual: {
      inputs: "Existing information",
      layer: "Philoo custom software",
      outputs: "Process steps",
      existing: ["ATS", "CRM", "Email", "Calendar"],
      processes: ["Follow-up", "Documents", "Planning", "Candidates"],
    },
  },
};

const existingIcons = [BuildingIcon, SlidersIcon, MailIcon, CalendarIcon] as const;
const processIcons = [ChatIcon, FileCheckIcon, CalendarIcon, UsersIcon] as const;
const pairedLanguageHrefs = { nl: "/maatwerk", en: "/en/custom-software" };

export function CustomSoftwarePage({ lang }: { lang: Language }) {
  const copy = pageCopy[lang];

  return (
    <div className="site-page">
      <SiteHeader lang={lang} languageHrefs={pairedLanguageHrefs} />
      <AnalyticsPageView event="site_page_view" language={lang} />
      <main>
        <section className="relative overflow-hidden border-b border-[#EDEEFA]">
          <div className="hero-ambient absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(490px,0.85fr)] lg:items-center lg:px-10 lg:py-14 xl:gap-14">
            <div className="max-w-[710px]">
              <p className="text-[0.72rem] font-black tracking-[0.075em] text-[#563DFF] sm:text-xs">{copy.hero.eyebrow}</p>
              <h1 className="mt-4 max-w-[790px] text-[clamp(2.55rem,4.75vw,4.7rem)] font-bold leading-[1.02] tracking-[-0.04em] text-[#091238]">{copy.hero.title}</h1>
              <p className="mt-5 max-w-[660px] text-[1.02rem] leading-7 text-[#4D5679] sm:text-[1.1rem] sm:leading-8">{copy.hero.body}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedAnchor className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-6 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.24)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" event="calendly_cta_click" href={CALENDLY_URL} language={lang} rel="noopener noreferrer" sourceCategory="calendly" target="_blank">
                  {copy.hero.primary}<ArrowRightIcon className="h-5 w-5" />
                </TrackedAnchor>
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFC8FF] bg-white/80 px-6 text-base font-bold text-[#563DFF] transition-colors hover:bg-[#F5F3FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" href="#voorbeelden">
                  {copy.hero.secondary}<ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <CustomSoftwareVisual copy={copy.visual} />
          </div>
        </section>

        <section aria-labelledby="examples-heading" className="scroll-mt-24 border-b border-[#EEF0F8] px-5 py-11 sm:px-8 sm:py-14 lg:px-10 lg:py-16" id="voorbeelden">
          <div className="mx-auto max-w-[1440px]">
            <SectionIntro eyebrow={copy.examples.eyebrow} title={copy.examples.title} body={copy.examples.body} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {copy.examples.cards.map(({ title, body, icon: Icon }) => (
                <article className="flex min-h-[220px] flex-col rounded-[1.5rem] border border-[#E1E4F2] bg-white p-6 shadow-[0_14px_36px_rgba(30,37,92,0.05)] sm:p-7" key={title}>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-6 text-[1.35rem] font-black leading-[1.12] tracking-[-0.04em] text-[#11183B]">{title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-[#56607E]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {lang === "nl" ? <MaatwerkDemo language={lang} /> : null}

        <section aria-labelledby="systems-heading" className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="mx-auto grid max-w-[1240px] gap-8 rounded-[2rem] border border-[#E2E0FF] bg-[linear-gradient(135deg,#FBFAFF,#F4F2FF_54%,#FBFCFF)] p-6 shadow-[0_16px_42px_rgba(73,54,184,0.06)] sm:p-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(470px,1fr)] lg:items-center lg:p-9">
            <div>
              <SectionIntro eyebrow={copy.systems.eyebrow} title={copy.systems.title} body={copy.systems.body} compact />
              <p className="mt-5 border-l-2 border-[#775CFF] pl-4 text-base font-bold leading-7 text-[#313A63]">{copy.systems.supporting}</p>
            </div>
            <SystemsDiagram copy={copy.systems} visual={copy.visual} />
          </div>
        </section>

        <section aria-labelledby="approach-heading" className="border-t border-[#EEF0F8] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <div className="mx-auto max-w-[1240px]">
            <SectionIntro centered eyebrow={copy.approach.eyebrow} title={copy.approach.title} />
            <ol className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-6">
              {copy.approach.steps.map((step, index) => (
                <li className="relative rounded-[1.45rem] border border-[#E2E5F2] bg-white p-6 sm:p-7" key={step.title}>
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-[#F0EEFF] text-xl font-black text-[#563DFF]">{index + 1}</span>
                  <h3 className="mt-6 max-w-[260px] text-[1.27rem] font-black leading-[1.15] tracking-[-0.035em] text-[#11183B]">{step.title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-7 text-[#56607E]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="px-5 pb-11 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-7 rounded-[1.85rem] border border-[#DED9FF] bg-[linear-gradient(118deg,#FBFAFF,#F4F2FF)] p-7 shadow-[0_18px_46px_rgba(78,59,189,0.1)] sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-11">
            <div className="max-w-[720px]">
              <h2 className="text-[clamp(1.85rem,3vw,2.75rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239]" id="contact-heading">{copy.cta.title}</h2>
              <p className="mt-4 max-w-[680px] text-[1rem] leading-7 text-[#56607E] sm:text-[1.08rem]">{copy.cta.body}</p>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              <TrackedAnchor className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-6 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.24)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" event="calendly_cta_click" href={CALENDLY_URL} language={lang} rel="noopener noreferrer" sourceCategory="calendly" target="_blank">
                {copy.cta.label}<ArrowRightIcon className="h-5 w-5" />
              </TrackedAnchor>
              <span className="text-sm text-[#596180]">{lang === "nl" ? "Liever mailen?" : "Prefer email?"} <a className="font-semibold text-[#30395F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF]" href="mailto:hello@philoo.nl">hello@philoo.nl</a></span>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

function SectionIntro({ eyebrow, title, body, centered = false, compact = false }: { eyebrow: string; title: string; body?: string; centered?: boolean; compact?: boolean }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${compact ? "max-w-[620px]" : "max-w-[720px]"}`}>
      <p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{eyebrow}</p>
      <h2 className={`mt-4 font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239] ${compact ? "text-[clamp(2rem,3.6vw,3rem)]" : "text-[clamp(2.15rem,4vw,3.45rem)]"}`} id={title.includes("tijd") || title.includes("time") ? "examples-heading" : title.includes("systeem") || title.includes("system") ? "systems-heading" : title.includes("begin") || title.includes("Start") ? "approach-heading" : undefined}>{title}</h2>
      {body ? <p className={`${centered ? "mx-auto" : ""} mt-5 max-w-[700px] text-[1rem] leading-7 text-[#596180] sm:text-[1.08rem]`}>{body}</p> : null}
    </div>
  );
}

function CustomSoftwareVisual({ copy }: { copy: PageCopy["visual"] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[620px] overflow-hidden rounded-[2rem] border border-[#E1DEFF] bg-white/75 p-5 shadow-[0_26px_70px_rgba(79,61,193,0.12)] sm:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_50%,rgba(112,84,255,0.16),transparent_29%),linear-gradient(145deg,rgba(255,255,255,0.95),rgba(245,243,255,0.9))]" />
      <div className="relative grid gap-5 md:grid-cols-[1fr_132px_1fr] md:items-center">
        <VisualGroup icons={existingIcons} labels={copy.existing} title={copy.inputs} />
        <div className="relative mx-auto flex min-h-28 w-full flex-col items-center justify-center">
          <span className="absolute h-28 w-28 rounded-full bg-[#EEEAFE]/70 blur-2xl" />
          <PhilooMark className="relative h-12 w-12 object-contain md:h-14 md:w-14" />
          <span className="relative mt-2 text-[1.2rem] font-black leading-none tracking-[-0.075em] text-[#0A1034]">philoo</span>
        </div>
        <VisualGroup icons={processIcons} labels={copy.processes} title={copy.outputs} />
      </div>
    </div>
  );
}

function VisualGroup({ icons, labels, title }: { icons: readonly Icon[]; labels: string[]; title: string }) {
  return (
    <div className="rounded-2xl border border-[#E5E8F4] bg-white/90 p-4 shadow-[0_10px_28px_rgba(30,37,92,0.05)]">
      <p className="mb-3 text-[0.66rem] font-black uppercase tracking-[0.08em] text-[#596180]">{title}</p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
        {labels.map((label, index) => {
          const Icon = icons[index];
          return <span className="flex min-h-10 items-center gap-2 rounded-xl bg-[#F7F7FD] px-3 text-xs font-bold text-[#30395F]" key={label}><Icon className="h-4 w-4 text-[#6149F0]" />{label}</span>;
        })}
      </div>
    </div>
  );
}

function SystemsDiagram({ copy, visual }: { copy: PageCopy["systems"]; visual: PageCopy["visual"] }) {
  return (
    <div aria-hidden="true" className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <DiagramColumn items={visual.existing} title={copy.existing} />
      <div className="relative mx-auto flex h-20 w-24 items-center justify-center"><PhilooMark className="h-10 w-10 object-contain" /></div>
      <DiagramColumn items={visual.processes} title={copy.processes} />
      <p className="sm:col-span-3 sm:pt-1 text-center text-sm font-black text-[#513AD8]">{copy.layer}</p>
    </div>
  );
}

function DiagramColumn({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-2xl border border-white bg-white/85 p-4">
      <p className="text-[0.67rem] font-black uppercase tracking-[0.08em] text-[#596180]">{title}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-1">
        {items.map((item) => <span className="rounded-lg bg-[#F7F6FF] px-3 py-2 text-xs font-bold text-[#36406A]" key={item}>{item}</span>)}
      </div>
    </div>
  );
}
