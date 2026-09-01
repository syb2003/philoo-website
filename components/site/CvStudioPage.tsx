import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  ArrowRightIcon,
  BuildingIcon,
  CheckCircleIcon,
  FileCheckIcon,
  ReceiptIcon,
  ShieldIcon,
  SlidersIcon,
  UserIcon,
  UsersIcon,
} from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { AnalyticsPageView, TrackedLink } from "@/components/site/Analytics";
import { CvStudioDemo } from "@/components/site/CvStudioDemo";
import { ProductInterestForm } from "@/components/site/ProductInterestForm";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Language } from "@/lib/i18n";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type Item = { title: string; body: string; icon: Icon };

type CvStudioCopy = {
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string };
  problem: { eyebrow: string; title: string; body: string; items: Item[] };
  demo: { eyebrow: string; title: string; label: string; source: string };
  steps: { eyebrow: string; title: string; items: Item[] };
  outputs: { eyebrow: string; title: string; items: Array<{ title: string; icon: Icon; tone: string }> };
  differences: { title: string; body: string; items: string[] };
  trust: { eyebrow: string; title: string; items: Item[] };
  privacy: { title: string; body: string };
  integrations: { title: string; body: string };
  pricing: { eyebrow: string; title: string; body: string; items: Item[] };
  access: { eyebrow: string; title: string; body: string; cta: string; privacy: string; successTitle: string; successBody: string };
  visuals: { flow: string; outputs: string; flowAlt: string; outputsAlt: string };
};

const pairedLanguageHrefs = { nl: "/cv-studio", en: "/en/cv-studio" };

const pageCopy: Record<Language, CvStudioCopy> = {
  nl: {
    hero: {
      eyebrow: "CV STUDIO",
      title: "Eén kandidaat. Elke gevraagde versie.",
      body: "Maak van één bron-CV snel de juiste versie voor je bureau, opdrachtgever of aanbesteding.",
      primary: "Meld je aan voor vroege toegang",
      secondary: "Bekijk de demo",
    },
    problem: {
      eyebrow: "HET PROBLEEM",
      title: "Eén kandidaat, vaak meerdere versies.",
      body: "De kandidaat blijft hetzelfde. Maar een bureau, opdrachtgever of aanbesteding kan een andere indeling, andere informatie of andere regels vragen.",
      items: [
        { title: "Bureauformat", body: "Het kandidaatprofiel in de eigen stijl en opbouw van het bureau.", icon: BuildingIcon },
        { title: "Opdrachtgever", body: "Een versie die past bij wat een specifieke klant wil zien.", icon: UserIcon },
        { title: "Aanbesteding", body: "Een profiel met de gevraagde onderdelen en relevante informatie voor de aanbesteding.", icon: ReceiptIcon },
        { title: "Geanonimiseerde versie", body: "Persoonsgegevens weglaten wanneer dat voor deze versie nodig is.", icon: ShieldIcon },
      ],
    },
    demo: {
      eyebrow: "BEKIJK CV STUDIO",
      title: "Van bron-CV naar de juiste versie.",
      label: "CV Studio demo in het Nederlands",
      source: "/videos/philoo-cv-studio-nl.mp4",
    },
    steps: {
      eyebrow: "HOE HET WERKT",
      title: "Van één bron naar de juiste versie in drie stappen.",
      items: [
        { title: "Upload één bron-CV", body: "Upload het originele CV of haal de gegevens uit je bestaande proces.", icon: FileCheckIcon },
        { title: "Kies bestemming en regels", body: "Kies voor wie het profiel bedoeld is en welke opbouw, informatie en regels nodig zijn.", icon: SlidersIcon },
        { title: "Controleer en download", body: "Bekijk het resultaat, pas aan waar nodig en gebruik daarna de juiste versie.", icon: CheckCircleIcon },
      ],
    },
    outputs: {
      eyebrow: "VERSCHILLENDE UITVOER, ÉÉN BRON",
      title: "Dezelfde kandidaat. Een profiel dat past bij de ontvanger.",
      items: [
        { title: "Bureauprofiel", icon: BuildingIcon, tone: "#1BAA6E" },
        { title: "Opdrachtgeverprofiel", icon: UserIcon, tone: "#2767E9" },
        { title: "Aanbestedingsprofiel", icon: ReceiptIcon, tone: "#7651D8" },
        { title: "Geanonimiseerde versie", icon: ShieldIcon, tone: "#DB7A36" },
      ],
    },
    differences: {
      title: "Niet alleen een andere opmaak.",
      body: "Per bestemming kan verschillen welke informatie belangrijk is, in welke volgorde die staat en wat wel of niet wordt getoond.",
      items: ["Volgorde", "Relevante ervaring", "Verplichte onderdelen", "Huisstijl", "Privacy"],
    },
    trust: {
      eyebrow: "DE RECRUITER HOUDT CONTROLE",
      title: "Gebaseerd op het bron-CV. Niet op verzonnen informatie.",
      items: [
        { title: "Brongetrouw", body: "De inhoud blijft gebaseerd op de informatie uit het bron-CV.", icon: FileCheckIcon },
        { title: "Niets verzinnen", body: "Philoo voegt geen ervaring, vaardigheden of opleidingen toe die niet in de bron staan.", icon: ShieldIcon },
        { title: "Eerst controleren", body: "De recruiter bekijkt het resultaat voordat de versie wordt gebruikt.", icon: CheckCircleIcon },
        { title: "PDF en DOCX", body: "Gebruik de uiteindelijke versie in het formaat dat bij jullie proces past.", icon: ReceiptIcon },
      ],
    },
    privacy: {
      title: "Privacy kan per versie verschillen.",
      body: "Voor de ene opdrachtgever kan een volledig profiel nodig zijn, terwijl een andere versie geanonimiseerd moet worden. De regels kunnen daarom per uitvoer verschillen.",
    },
    integrations: {
      title: "Aansluiten op je bestaande proces.",
      body: "CV Studio kan als losse stap worden gebruikt en kan later waar passend worden aangesloten op bestaande recruitmentsoftware.",
    },
    pricing: {
      eyebrow: "FLEXIBEL STARTEN",
      title: "Betaal op een manier die past bij je gebruik.",
      body: "CV Studio is bedoeld voor zowel incidenteel gebruik als teams die vaker kandidaatprofielen maken.",
      items: [
        { title: "Pay-as-you-go", body: "Betaal per gebruik wanneer je af en toe een profiel nodig hebt.", icon: FileCheckIcon },
        { title: "Maandplan voor teams", body: "Een vast maandbedrag voor teams met meer volume.", icon: UsersIcon },
      ],
    },
    access: {
      eyebrow: "VROEGE TOEGANG",
      title: "Wil je CV Studio als een van de eersten gebruiken?",
      body: "Laat je gegevens achter. We nemen contact op zodra er plek is om CV Studio te testen.",
      cta: "Meld je aan voor vroege toegang",
      privacy: "We gebruiken je gegevens alleen om contact met je op te nemen over CV Studio.",
      successTitle: "Je staat op de lijst.",
      successBody: "Bedankt. We nemen contact met je op zodra er plek is om CV Studio te testen.",
    },
    visuals: {
      flow: "/images/cv-studio/flow-nl.png",
      outputs: "/images/cv-studio/outputs-nl.png",
      flowAlt: "Philoo CV Studio-bron-CV met meerdere mogelijke profielen",
      outputsAlt: "Eén bron-CV met verschillende profielversies voor ontvangers",
    },
  },
  en: {
    hero: {
      eyebrow: "CV STUDIO",
      title: "One candidate. Every version you need.",
      body: "Turn one source CV into the right version for your agency, client or tender.",
      primary: "Join early access",
      secondary: "Watch the demo",
    },
    problem: {
      eyebrow: "THE PROBLEM",
      title: "One candidate often needs multiple versions.",
      body: "The candidate stays the same, but an agency, client or tender may require a different structure, information or set of rules.",
      items: [
        { title: "Agency format", body: "A candidate profile in the agency's own structure and style.", icon: BuildingIcon },
        { title: "Client profile", body: "A version tailored to what a specific client needs to see.", icon: UserIcon },
        { title: "Tender profile", body: "A profile structured around the information requested for a tender.", icon: ReceiptIcon },
        { title: "Anonymised version", body: "Personal information removed when that version requires it.", icon: ShieldIcon },
      ],
    },
    demo: {
      eyebrow: "SEE CV STUDIO",
      title: "From source CV to the right version.",
      label: "CV Studio demo in English",
      source: "/videos/philoo-cv-studio-en.mp4",
    },
    steps: {
      eyebrow: "HOW IT WORKS",
      title: "From one source to the right version in three steps.",
      items: [
        { title: "Upload one source CV", body: "Upload the original CV or bring the information in from your existing process.", icon: FileCheckIcon },
        { title: "Choose destination and rules", body: "Choose who the profile is for and which structure, information and rules apply.", icon: SlidersIcon },
        { title: "Review and download", body: "Check the result, make adjustments where needed and use the final version.", icon: CheckCircleIcon },
      ],
    },
    outputs: {
      eyebrow: "DIFFERENT OUTPUTS, ONE SOURCE",
      title: "The same candidate. A profile that fits the recipient.",
      items: [
        { title: "Agency profile", icon: BuildingIcon, tone: "#1BAA6E" },
        { title: "Client profile", icon: UserIcon, tone: "#2767E9" },
        { title: "Tender profile", icon: ReceiptIcon, tone: "#7651D8" },
        { title: "Anonymised version", icon: ShieldIcon, tone: "#DB7A36" },
      ],
    },
    differences: {
      title: "More than a different layout.",
      body: "Each destination can require different information, a different order and different rules for what should or should not be shown.",
      items: ["Order", "Relevant experience", "Required sections", "Brand style", "Privacy"],
    },
    trust: {
      eyebrow: "THE RECRUITER STAYS IN CONTROL",
      title: "Based on the source CV. Not invented information.",
      items: [
        { title: "Source-faithful", body: "Content stays based on information contained in the source CV.", icon: FileCheckIcon },
        { title: "Nothing invented", body: "Philoo does not add experience, skills or education that are not in the source.", icon: ShieldIcon },
        { title: "Review first", body: "The recruiter reviews the result before the version is used.", icon: CheckCircleIcon },
        { title: "PDF and DOCX", body: "Use the final version in the format that fits your process.", icon: ReceiptIcon },
      ],
    },
    privacy: {
      title: "Privacy can differ by version.",
      body: "One client may require a complete profile while another version needs to be anonymised. Rules can therefore differ for each output.",
    },
    integrations: {
      title: "Fits into your existing process.",
      body: "CV Studio can be used as a standalone step and can later be connected to existing recruitment software where appropriate.",
    },
    pricing: {
      eyebrow: "FLEXIBLE START",
      title: "Pay in a way that fits your usage.",
      body: "CV Studio is designed for both occasional use and teams producing candidate profiles more frequently.",
      items: [
        { title: "Pay-as-you-go", body: "Pay per use when you only need profiles occasionally.", icon: FileCheckIcon },
        { title: "Monthly team plan", body: "A fixed monthly fee for teams with more volume.", icon: UsersIcon },
      ],
    },
    access: {
      eyebrow: "EARLY ACCESS",
      title: "Want to be one of the first to use CV Studio?",
      body: "Leave your details and we’ll get in touch when there is an opportunity to try CV Studio.",
      cta: "Join early access",
      privacy: "We only use your details to contact you about CV Studio.",
      successTitle: "You're on the list.",
      successBody: "Thanks. We’ll get in touch when there is an opportunity to try CV Studio.",
    },
    visuals: {
      flow: "/images/cv-studio/flow-en.png",
      outputs: "/images/cv-studio/outputs-en.png",
      flowAlt: "Philoo CV Studio source CV with multiple possible profiles",
      outputsAlt: "One source CV with different profile versions for recipients",
    },
  },
};

export function CvStudioPage({ lang }: { lang: Language }) {
  const copy = pageCopy[lang];

  return (
    <div className="site-page overflow-x-clip">
      <SiteHeader lang={lang} languageHrefs={pairedLanguageHrefs} />
      <AnalyticsPageView event="cvstudio_page_view" language={lang} />
      <main>
        <section className="relative overflow-hidden border-b border-[#EDEEFA]">
          <div className="hero-ambient absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] gap-8 px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:grid-cols-[minmax(0,.8fr)_minmax(500px,1.2fr)] lg:items-center lg:gap-10 lg:px-10 lg:pb-18 lg:pt-20 xl:gap-16">
            <div className="max-w-[650px]">
              <p className="text-[0.72rem] font-black tracking-[0.08em] text-[#563DFF] sm:text-xs">{copy.hero.eyebrow}</p>
              <h1 className="mt-5 text-[clamp(2.7rem,5vw,5.2rem)] font-black leading-[0.98] tracking-[-0.067em] text-[#091238]">{copy.hero.title}</h1>
              <p className="mt-6 max-w-[600px] text-[1.04rem] leading-8 text-[#4D5679] sm:text-[1.13rem]">{copy.hero.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-5 text-center text-[0.96rem] font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.24)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" event="cvstudio_early_access_click" href="#early-access" language={lang}>
                  {copy.hero.primary}<ArrowRightIcon className="h-5 w-5 shrink-0" />
                </TrackedLink>
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFC8FF] bg-white/85 px-5 text-[0.96rem] font-bold text-[#563DFF] transition-colors hover:bg-[#F5F3FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" href="#demo">
                  {copy.hero.secondary}<ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <ProductVisual alt={copy.visuals.flowAlt} src={copy.visuals.flow} />
          </div>
        </section>

        <section aria-labelledby="problem-heading" className="px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22">
          <div className="mx-auto max-w-[1280px]">
            <SectionIntro eyebrow={copy.problem.eyebrow} title={copy.problem.title} body={copy.problem.body} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {copy.problem.items.map(({ title, body, icon: Icon }) => (
                <article className="rounded-[1.45rem] border border-[#E1E4F2] bg-white p-6 shadow-[0_14px_36px_rgba(30,37,92,0.045)]" key={title}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-[1.2rem] font-black leading-[1.15] tracking-[-0.04em] text-[#11183B]">{title}</h3>
                  <p className="mt-3 text-[0.96rem] leading-7 text-[#56607E]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="demo-heading" className="scroll-mt-24 border-y border-[#E6E8F4] bg-[linear-gradient(135deg,#FBFAFF,#F6F5FF_55%,#FBFCFF)] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22" id="demo">
          <div className="mx-auto max-w-[1120px]">
            <SectionIntro centered eyebrow={copy.demo.eyebrow} title={copy.demo.title} />
            <div className="mt-9 overflow-hidden rounded-[1.55rem] border border-[#DEDBFF] bg-[#091238] p-2 shadow-[0_26px_70px_rgba(46,39,130,0.19)] sm:p-3">
              <CvStudioDemo label={copy.demo.label} language={lang} source={copy.demo.source} />
            </div>
          </div>
        </section>

        <section aria-labelledby="steps-heading" className="px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22">
          <div className="mx-auto max-w-[1240px]">
            <SectionIntro centered eyebrow={copy.steps.eyebrow} title={copy.steps.title} />
            <ol className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-7">
              {copy.steps.items.map(({ title, body, icon: Icon }, index) => (
                <li className="relative rounded-[1.45rem] border border-[#E2E5F2] bg-white p-6 shadow-[0_12px_35px_rgba(26,37,93,0.04)] sm:p-7" key={title}>
                  <div className="flex items-center gap-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#F0EEFF] text-lg font-black text-[#563DFF]">{index + 1}</span><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F6F5FF] text-[#563DFF]"><Icon className="h-5 w-5" /></span></div>
                  <h3 className="mt-6 text-[1.24rem] font-black leading-[1.15] tracking-[-0.04em] text-[#11183B]">{title}</h3>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[#56607E]">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="outputs-heading" className="border-y border-[#E8EAF3] bg-[#FCFCFF] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22">
          <div className="mx-auto max-w-[1280px]">
            <SectionIntro centered eyebrow={copy.outputs.eyebrow} title={copy.outputs.title} />
            <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-[#E0E2F3] bg-white p-3 shadow-[0_18px_52px_rgba(30,37,92,0.08)] sm:p-5">
              <Image alt={copy.visuals.outputsAlt} className="h-auto w-full rounded-xl" height={1080} loading="eager" sizes="(max-width: 768px) 100vw, 1100px" src={copy.visuals.outputs} width={1920} />
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {copy.outputs.items.map(({ title, icon: Icon, tone }) => (
                <div className="flex items-center gap-3 rounded-2xl border border-[#E1E4F2] bg-white px-4 py-4" key={title}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F7F7FF]" style={{ color: tone }}><Icon className="h-5 w-5" /></span>
                  <span className="text-sm font-black leading-5 text-[#182047]">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="mx-auto grid max-w-[1240px] gap-7 rounded-[1.75rem] border border-[#DFDDFF] bg-[linear-gradient(120deg,#FBFAFF,#F4F2FF)] p-7 shadow-[0_18px_50px_rgba(73,54,184,0.08)] sm:p-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(440px,1fr)] lg:items-center lg:p-12">
            <div><h2 className="text-[clamp(2rem,3.5vw,3rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239]">{copy.differences.title}</h2><p className="mt-5 max-w-[560px] text-[1rem] leading-7 text-[#596180] sm:text-[1.08rem]">{copy.differences.body}</p></div>
            <ul className="grid gap-3 sm:grid-cols-2" role="list">
              {copy.differences.items.map((item) => <li className="flex min-h-12 items-center gap-3 rounded-xl border border-white bg-white/85 px-4 text-sm font-bold text-[#242D55] shadow-[0_8px_20px_rgba(30,37,92,0.04)]" key={item}><CheckCircleIcon className="h-5 w-5 shrink-0 text-[#5D45EF]" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="trust-heading" className="border-t border-[#EEF0F8] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-22">
          <div className="mx-auto max-w-[1280px]">
            <SectionIntro centered eyebrow={copy.trust.eyebrow} title={copy.trust.title} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {copy.trust.items.map(({ title, body, icon: Icon }) => (
                <article className="rounded-[1.45rem] border border-[#E1E4F2] bg-white p-6" key={title}>
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-[1.18rem] font-black tracking-[-0.04em] text-[#11183B]">{title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-7 text-[#56607E]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-14 sm:px-8 sm:pb-18 lg:px-10 lg:pb-20">
          <div className="mx-auto grid max-w-[1240px] gap-5 lg:grid-cols-2">
            <InfoCard icon={ShieldIcon} title={copy.privacy.title} body={copy.privacy.body} />
            <InfoCard icon={SlidersIcon} title={copy.integrations.title} body={copy.integrations.body} />
          </div>
        </section>

        <section aria-labelledby="pricing-heading" className="border-y border-[#E8EAF3] bg-[#FCFCFF] px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1240px]">
            <SectionIntro eyebrow={copy.pricing.eyebrow} title={copy.pricing.title} body={copy.pricing.body} />
            <div className="mt-9 grid gap-4 md:grid-cols-2">
              {copy.pricing.items.map(({ title, body, icon: Icon }) => (
                <article className="flex items-start gap-5 rounded-[1.4rem] border border-[#E2E0FF] bg-white p-6 shadow-[0_12px_34px_rgba(30,37,92,0.05)] sm:p-7" key={title}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-6 w-6" /></span>
                  <div><h3 className="text-[1.2rem] font-black tracking-[-0.04em] text-[#11183B]">{title}</h3><p className="mt-3 text-[0.98rem] leading-7 text-[#56607E]">{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="early-access-heading" className="scroll-mt-24 px-5 py-14 sm:px-8 sm:py-18 lg:px-10 lg:py-20" id="early-access">
          <div className="mx-auto max-w-[1240px] rounded-[1.85rem] border border-[#DED9FF] bg-[linear-gradient(118deg,#FBFAFF,#F4F2FF)] p-7 shadow-[0_18px_46px_rgba(78,59,189,0.1)] sm:p-10 lg:p-11">
            <div className="max-w-[720px]"><p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{copy.access.eyebrow}</p><h2 className="mt-4 text-[clamp(1.9rem,3.5vw,3rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239]" id="early-access-heading">{copy.access.title}</h2><p className="mt-4 max-w-[680px] text-[1rem] leading-7 text-[#56607E] sm:text-[1.08rem]">{copy.access.body}</p></div>
            <ProductInterestForm clickEvent="cvstudio_early_access_click" interestType="cvstudio_early_access" language={lang} privacyText={copy.access.privacy} submitEvent="cvstudio_early_access_submit" submitLabel={copy.access.cta} successMessage={copy.access.successBody} successTitle={copy.access.successTitle} />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

function ProductVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div aria-hidden="true" className="absolute -inset-7 rounded-full bg-[radial-gradient(circle,rgba(115,86,255,0.2),transparent_63%)] blur-xl" />
      <div className="relative overflow-hidden rounded-[1.7rem] border border-[#E1DEFF] bg-white shadow-[0_25px_65px_rgba(79,61,193,0.13)]">
        <Image alt={alt} className="h-auto w-full" height={1080} priority sizes="(max-width: 1024px) 100vw, 720px" src={src} width={1920} />
      </div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, body, centered = false }: { eyebrow: string; title: string; body?: string; centered?: boolean }) {
  return <div className={`${centered ? "mx-auto text-center" : ""} max-w-[760px]`}><p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{eyebrow}</p><h2 className="mt-4 text-[clamp(2.1rem,4vw,3.45rem)] font-black leading-[1.04] tracking-[-0.055em] text-[#0B1239]">{title}</h2>{body ? <p className={`${centered ? "mx-auto" : ""} mt-5 max-w-[710px] text-[1rem] leading-7 text-[#596180] sm:text-[1.08rem]`}>{body}</p> : null}</div>;
}

function InfoCard({ title, body, icon: Icon }: { title: string; body: string; icon: Icon }) {
  return <article className="rounded-[1.5rem] border border-[#E1E4F2] bg-white p-7 shadow-[0_14px_36px_rgba(30,37,92,0.045)] sm:p-8"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-5 w-5" /></span><h2 className="mt-5 text-[1.5rem] font-black leading-[1.12] tracking-[-0.045em] text-[#11183B]">{title}</h2><p className="mt-4 text-[0.98rem] leading-7 text-[#56607E]">{body}</p></article>;
}
