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
import { PhilooMark } from "@/components/site/PhilooMark";
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
  visuals: { flowAlt: string; outputsAlt: string };
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
      source: "/videos/philoo-cv-studio-demo-nl.mp4",
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
      source: "/videos/philoo-cv-studio-demo-en.mp4",
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
        <section className="relative overflow-hidden border-b border-[#EDEEFA]" data-cv-section="hero">
          <div className="hero-ambient absolute inset-0" />
          <div className="relative mx-auto grid max-w-[1440px] gap-6 px-5 pb-8 pt-9 sm:px-8 sm:pb-10 sm:pt-11 lg:grid-cols-[minmax(0,.88fr)_minmax(460px,1.12fr)] lg:items-center lg:gap-12 lg:px-10 lg:py-10 xl:gap-14">
            <div className="max-w-[620px]">
              <p className="text-[0.72rem] font-black tracking-[0.08em] text-[#563DFF] sm:text-xs">{copy.hero.eyebrow}</p>
              <h1 className="mt-4 max-w-[600px] text-[clamp(2.65rem,4.65vw,4.6rem)] font-bold leading-[1.01] tracking-[-0.04em] text-[#091238]">{copy.hero.title}</h1>
              <p className="mt-5 max-w-[610px] text-[1rem] leading-7 text-[#4D5679] sm:text-[1.08rem] sm:leading-8">{copy.hero.body}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-5 text-center text-[0.96rem] font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.24)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" event="cvstudio_early_access_click" href="#early-access" language={lang}>
                  {copy.hero.primary}<ArrowRightIcon className="h-5 w-5 shrink-0" />
                </TrackedLink>
                <Link className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#CFC8FF] bg-white/85 px-5 text-[0.96rem] font-bold text-[#563DFF] transition-colors hover:bg-[#F5F3FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF]" href="#demo">
                  {copy.hero.secondary}<ArrowRightIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <ProductVisual alt={copy.visuals.flowAlt} lang={lang} />
          </div>
        </section>

        <section aria-labelledby="problem-heading" className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14" data-cv-section="problem">
          <div className="mx-auto max-w-[1280px]">
            <SectionIntro eyebrow={copy.problem.eyebrow} title={copy.problem.title} body={copy.problem.body} tier="support" />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {copy.problem.items.map(({ title, body, icon: Icon }) => (
                <article className="rounded-[1.45rem] border border-[#E1E4F2] bg-white p-5 shadow-[0_12px_30px_rgba(30,37,92,0.04)] sm:p-6" key={title}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-[1.1rem] w-[1.1rem]" /></span>
                  <h3 className="mt-4 text-[1.12rem] font-bold leading-[1.18] tracking-[-0.03em] text-[#11183B]">{title}</h3>
                  <p className="mt-2.5 text-[0.94rem] leading-6 text-[#56607E]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="demo-heading" className="scroll-mt-24 border-y border-[#E6E8F4] bg-[linear-gradient(135deg,#FBFAFF,#F6F5FF_55%,#FBFCFF)] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16" data-cv-section="demo" id="demo">
          <div className="mx-auto max-w-[1180px]">
            <SectionIntro centered eyebrow={copy.demo.eyebrow} title={copy.demo.title} tier="primary" />
            <div className="mt-8 overflow-hidden rounded-[1.55rem] border border-[#DEDBFF] bg-[#091238] p-2 shadow-[0_24px_62px_rgba(46,39,130,0.18)] sm:p-3">
              <CvStudioDemo label={copy.demo.label} language={lang} source={copy.demo.source} />
            </div>
          </div>
        </section>

        <section aria-labelledby="steps-heading" className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-12" data-cv-section="steps">
          <div className="mx-auto max-w-[1240px]">
            <SectionIntro centered eyebrow={copy.steps.eyebrow} title={copy.steps.title} tier="compact" />
            <ol className="mt-7 grid gap-4 lg:grid-cols-3 lg:gap-5">
              {copy.steps.items.map(({ title, body, icon: Icon }, index) => (
                <li className="relative rounded-[1.45rem] border border-[#E2E5F2] bg-white p-5 shadow-[0_10px_28px_rgba(26,37,93,0.035)] sm:p-6" key={title}>
                  <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#F0EEFF] text-base font-bold text-[#563DFF]">{index + 1}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F6F5FF] text-[#563DFF]"><Icon className="h-[1.1rem] w-[1.1rem]" /></span></div>
                  <h3 className="mt-5 text-[1.14rem] font-bold leading-[1.18] tracking-[-0.03em] text-[#11183B]">{title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-6 text-[#56607E]">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="outputs-heading" className="border-y border-[#E8EAF3] bg-[#FCFCFF] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16" data-cv-section="outputs">
          <div className="mx-auto max-w-[1320px]">
            <SectionIntro centered eyebrow={copy.outputs.eyebrow} title={copy.outputs.title} tier="primary" />
            <div className="mt-8 overflow-hidden rounded-[1.6rem] border border-[#E0E2F3] bg-white p-2 shadow-[0_18px_48px_rgba(30,37,92,0.075)] sm:p-3">
              <OutputVisual alt={copy.visuals.outputsAlt} lang={lang} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {copy.outputs.items.map(({ title, icon: Icon, tone }) => (
                <div className="flex items-center gap-3 rounded-2xl border border-[#E1E4F2] bg-white px-4 py-3.5" key={title}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F7F7FF]" style={{ color: tone }}><Icon className="h-[1.1rem] w-[1.1rem]" /></span>
                  <span className="text-sm font-bold leading-5 text-[#182047]">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14" data-cv-section="differences">
          <div className="mx-auto grid max-w-[1240px] gap-5 rounded-[1.75rem] border border-[#DFDDFF] bg-[linear-gradient(120deg,#FBFAFF,#F4F2FF)] p-6 shadow-[0_16px_42px_rgba(73,54,184,0.07)] sm:p-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(440px,1fr)] lg:items-center lg:p-9">
            <div><h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0B1239]">{copy.differences.title}</h2><p className="mt-3 max-w-[560px] text-[1rem] leading-7 text-[#596180]">{copy.differences.body}</p></div>
            <ul className="grid gap-3 sm:grid-cols-2" role="list">
              {copy.differences.items.map((item) => <li className="flex min-h-12 items-center gap-3 rounded-xl border border-white bg-white/85 px-4 text-sm font-bold text-[#242D55] shadow-[0_8px_20px_rgba(30,37,92,0.04)]" key={item}><CheckCircleIcon className="h-5 w-5 shrink-0 text-[#5D45EF]" />{item}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="trust-heading" className="border-t border-[#EEF0F8] px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16" data-cv-section="trust">
          <div className="mx-auto max-w-[1280px]">
            <SectionIntro centered eyebrow={copy.trust.eyebrow} title={copy.trust.title} tier="support" />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {copy.trust.items.map(({ title, body, icon: Icon }) => (
                <article className="rounded-[1.45rem] border border-[#E1E4F2] bg-white p-5 sm:p-6" key={title}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-[1.1rem] w-[1.1rem]" /></span>
                  <h3 className="mt-4 text-[1.1rem] font-bold tracking-[-0.03em] text-[#11183B]">{title}</h3>
                  <p className="mt-2.5 text-[0.94rem] leading-6 text-[#56607E]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-10 sm:px-8 sm:pb-12 lg:px-10 lg:pb-12" data-cv-section="reassurance">
          <div className="mx-auto grid max-w-[1240px] gap-5 lg:grid-cols-2">
            <InfoCard icon={ShieldIcon} title={copy.privacy.title} body={copy.privacy.body} />
            <InfoCard icon={SlidersIcon} title={copy.integrations.title} body={copy.integrations.body} />
          </div>
        </section>

        <section aria-labelledby="pricing-heading" className="border-y border-[#E8EAF3] bg-[#FCFCFF] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-12" data-cv-section="pricing">
          <div className="mx-auto max-w-[1240px]">
            <SectionIntro eyebrow={copy.pricing.eyebrow} title={copy.pricing.title} body={copy.pricing.body} tier="compact" />
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {copy.pricing.items.map(({ title, body, icon: Icon }) => (
                <article className="flex items-start gap-4 rounded-[1.4rem] border border-[#E2E0FF] bg-white p-5 shadow-[0_10px_28px_rgba(30,37,92,0.04)] sm:p-6" key={title}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-5 w-5" /></span>
                  <div><h3 className="text-[1.1rem] font-bold tracking-[-0.03em] text-[#11183B]">{title}</h3><p className="mt-2.5 text-[0.95rem] leading-6 text-[#56607E]">{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="early-access-heading" className="scroll-mt-24 px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16" data-cv-section="early-access" id="early-access">
          <div className="mx-auto max-w-[1240px] rounded-[1.85rem] border border-[#DED9FF] bg-[linear-gradient(118deg,#FBFAFF,#F4F2FF)] p-6 shadow-[0_18px_46px_rgba(78,59,189,0.1)] sm:p-8 lg:p-9">
            <div className="max-w-[720px]"><p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{copy.access.eyebrow}</p><h2 className="mt-3 text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#0B1239]" id="early-access-heading">{copy.access.title}</h2><p className="mt-3 max-w-[680px] text-[1rem] leading-7 text-[#56607E]">{copy.access.body}</p></div>
            <ProductInterestForm clickEvent="cvstudio_early_access_click" interestType="cvstudio_early_access" language={lang} privacyText={copy.access.privacy} submitEvent="cvstudio_early_access_submit" submitLabel={copy.access.cta} successMessage={copy.access.successBody} successTitle={copy.access.successTitle} />
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}

type VisualCopy = {
  source: string;
  outcome: string;
  agency: string;
  client: string;
  tender: string;
  visualTitle: string;
  visualBody: string;
  outputsTitle: string;
  outputsBody: string;
  outputLabel: string;
  clientContext: string;
  relevantExperience: string;
  tenderRequirements: string;
};

const visualCopy: Record<Language, VisualCopy> = {
  nl: {
    source: "Kandidaat-CV", outcome: "Juiste output", agency: "Bureauformat", client: "Opdrachtgeversformat", tender: "Aanbestedingsformat",
    visualTitle: "Eén kandidaat. Elke gevraagde versie.", visualBody: "Van één bron-CV naar bureauprofiel, opdrachtgeverprofiel of aanbestedingsprofiel.",
    outputsTitle: "Eén kandidaat. Drie verschillende outputs.", outputsBody: "Inhoud, volgorde en nadruk veranderen per ontvanger.", outputLabel: "Outputs voor verschillende ontvangers",
    clientContext: "Opdrachtgevercontext", relevantExperience: "Relevante ervaring", tenderRequirements: "Kernvereisten uit de uitvraag",
  },
  en: {
    source: "Candidate CV", outcome: "Right output", agency: "Agency format", client: "Client format", tender: "Tender format",
    visualTitle: "One candidate. Every version you need.", visualBody: "From one source CV to an agency profile, client profile or tender profile.",
    outputsTitle: "One candidate. Three different outputs.", outputsBody: "Content, order and emphasis change for each recipient.", outputLabel: "Outputs for different recipients",
    clientContext: "Client context", relevantExperience: "Relevant experience", tenderRequirements: "Tender requirements",
  },
};

function ProductLockup({ inverse = false }: { inverse?: boolean }) {
  return <div className="flex items-center gap-2"><span className="shrink-0"><PhilooMark className="h-6 w-6" sizes="24px" /></span><span className={`text-sm font-bold tracking-[-0.04em] ${inverse ? "text-[#10183D]" : "text-[#10183D]"}`}>Philoo</span><span className={`text-sm font-bold tracking-[-0.04em] ${inverse ? "text-[#2767E9]" : "text-[#2767E9]"}`}>CV Studio</span></div>;
}

function ProductVisual({ alt, lang }: { alt: string; lang: Language }) {
  const copy = visualCopy[lang];

  return (
    <div aria-label={alt} className="relative mx-auto w-full max-w-[680px]" role="img">
      <div aria-hidden="true" className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(115,86,255,0.16),transparent_63%)] blur-xl" />
      <div className="relative overflow-hidden rounded-[1.55rem] border border-[#E1DEFF] bg-[linear-gradient(135deg,#FFFFFF,#F8F7FF)] p-4 shadow-[0_20px_54px_rgba(79,61,193,0.11)] sm:p-6">
        <ProductLockup />
        <h2 className="mt-5 max-w-[480px] text-[clamp(1.4rem,2.55vw,2.15rem)] font-bold leading-[1.04] tracking-[-0.045em] text-[#0B1239]">{copy.visualTitle}</h2>
        <p className="mt-2 max-w-[430px] text-[0.66rem] leading-4 text-[#5B6480] sm:text-xs sm:leading-5">{copy.visualBody}</p>
        <div className="mt-5 grid min-w-0 grid-cols-1 justify-items-center gap-2 sm:mt-7 sm:grid-cols-[minmax(0,.82fr)_auto_minmax(0,1.08fr)_auto_minmax(0,.88fr)] sm:items-center sm:gap-3">
          <VisualSourceCard className="w-full max-w-[210px] sm:max-w-none" label={copy.source} />
          <VisualArrow className="rotate-90 sm:rotate-0" />
          <div className="flex min-h-10 w-full max-w-[260px] items-center justify-center rounded-full border border-[#CFC8FF] bg-[#F4F2FF] px-2.5 shadow-[0_8px_18px_rgba(73,56,222,0.12)] sm:min-h-14 sm:max-w-none sm:px-4"><ProductLockup inverse /></div>
          <VisualArrow className="rotate-90 sm:rotate-0" />
          <div className="flex min-h-10 w-full max-w-[260px] items-center justify-center gap-1.5 rounded-full border border-[#CDEBDD] bg-[#F0FAF4] px-2 text-center text-[0.55rem] font-bold leading-tight text-[#18384B] sm:min-h-14 sm:max-w-none sm:gap-2 sm:px-4 sm:text-xs"><CheckCircleIcon className="h-3.5 w-3.5 shrink-0 text-[#17A765] sm:h-5 sm:w-5" />{copy.outcome}</div>
        </div>
        <div className="mt-3 border-l border-t border-r border-[#D5D9E8] pt-3 sm:ml-[32%] sm:mt-4 sm:pt-4">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
            <OutputChip icon={BuildingIcon} label={copy.agency} tone="#17A765" />
            <OutputChip icon={UserIcon} label={copy.client} tone="#2767E9" />
            <OutputChip icon={ReceiptIcon} label={copy.tender} tone="#7651D8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualArrow({ className = "" }: { className?: string }) {
  return <ArrowRightIcon aria-hidden="true" className={`h-4 w-4 text-[#2767E9] sm:h-6 sm:w-6 ${className}`} />;
}

function VisualSourceCard({ className = "", label }: { className?: string; label: string }) {
  return <div className={`relative rounded-xl border border-[#DFE3EF] bg-white p-2 shadow-[0_7px_16px_rgba(20,31,78,0.08)] sm:rounded-2xl sm:p-3 ${className}`}><span className="absolute -top-3 left-2 rounded-full bg-[#EEF0FA] px-2 py-1 text-[0.48rem] font-bold text-[#1B254A] sm:-top-4 sm:left-3 sm:px-3 sm:text-[0.62rem]">{label}</span><p className="mt-2 text-[0.53rem] font-bold text-[#182146] sm:mt-3 sm:text-xs">Jan de Vries</p><p className="mt-1 text-[0.42rem] text-[#5E6783] sm:text-[0.58rem]">Senior Projectleider</p><div className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2"><span className="block h-1 rounded-full bg-[#E4E6EE]" /><span className="block h-1 w-4/5 rounded-full bg-[#E4E6EE]" /><span className="block h-1 w-3/5 rounded-full bg-[#E4E6EE]" /></div></div>;
}

function OutputChip({ icon: Icon, label, tone }: { icon: Icon; label: string; tone: string }) {
  return <div className="min-w-0 rounded-lg border border-[#E3E5EE] bg-white px-1.5 py-2 text-center shadow-[0_5px_12px_rgba(20,31,78,0.06)] sm:rounded-xl sm:px-2 sm:py-3"><Icon className="mx-auto h-3 w-3 sm:h-4 sm:w-4" style={{ color: tone }} /><span className="mt-1 block whitespace-nowrap text-[0.44rem] font-bold leading-none tracking-[-0.02em] text-[#1D274B] sm:text-[0.56rem]">{label}</span></div>;
}

function OutputVisual({ alt, lang }: { alt: string; lang: Language }) {
  const copy = visualCopy[lang];
  const profileCards = [
    { title: copy.agency, tone: "#17A765", detailTitle: "Profiel", lines: ["Projectmanagement", "Stakeholdermanagement", "Risicobeheersing"], icon: BuildingIcon },
    { title: copy.client, tone: "#2767E9", detailTitle: copy.clientContext, lines: ["Noordelijk Waterschap", copy.relevantExperience, "Waterbouwkundige projecten"], icon: UserIcon },
    { title: copy.tender, tone: "#7651D8", detailTitle: copy.tenderRequirements, lines: ["Leidinggeven aan projectteams", "Waterbouwkundige ervaring", "Planning en risicobeheersing"], icon: ReceiptIcon },
  ];

  return <div aria-label={alt} className="rounded-xl bg-[linear-gradient(135deg,#FCFDFF,#F7F6FF)] p-3 sm:p-5" role="img"><div className="flex flex-wrap items-start justify-between gap-3"><ProductLockup /><div className="max-w-[760px] text-left sm:text-right"><h3 className="text-[clamp(1.05rem,2.4vw,2rem)] font-bold leading-[1.06] tracking-[-0.04em] text-[#0B1239]">{copy.outputsTitle}</h3><p className="mt-1 text-[0.72rem] leading-5 text-[#5C6583] sm:text-sm">{copy.outputsBody}</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-[minmax(160px,.68fr)_40px_repeat(3,minmax(0,1fr))] md:items-stretch"><VisualSourceCard label={copy.source} /><div className="hidden place-items-center md:grid"><VisualArrow /></div><div className="md:col-span-3"><div className="mb-3 rounded-full bg-[#EEF0FA] px-3 py-1.5 text-center text-[0.68rem] font-bold text-[#1B254A] sm:text-xs">{copy.outputLabel}</div><div className="grid gap-3 sm:grid-cols-3">{profileCards.map((card) => <ProfilePreviewCard {...card} key={card.title} />)}</div></div></div></div>;
}

function ProfilePreviewCard({ title, tone, detailTitle, lines, icon: Icon }: { title: string; tone: string; detailTitle: string; lines: string[]; icon: Icon }) {
  return <article className="rounded-xl border border-[#DFE3EF] bg-white p-3.5 text-left shadow-[0_8px_18px_rgba(20,31,78,0.06)] sm:p-4"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#F5F5FF]" style={{ color: tone }}><Icon className="h-4 w-4" /></span><h4 className="text-[0.76rem] font-bold leading-tight sm:text-sm" style={{ color: tone }}>{title}</h4></div><div className="mt-3 border-t border-[#E4E6EE] pt-3"><p className="text-sm font-bold text-[#162345]">Jan de Vries</p><p className="mt-1 text-[0.67rem] text-[#56607E]">Senior Projectleider</p><h5 className="mt-4 text-[0.72rem] font-bold sm:text-[0.8rem]" style={{ color: tone }}>{detailTitle}</h5><ul className="mt-2 space-y-1.5 text-[0.66rem] leading-4 text-[#53607B] sm:text-xs">{lines.map((line) => <li className="flex gap-1.5" key={line}><span style={{ color: tone }}>•</span><span>{line}</span></li>)}</ul></div></article>;
}

function SectionIntro({ eyebrow, title, body, centered = false, tier = "support" }: { eyebrow: string; title: string; body?: string; centered?: boolean; tier?: "primary" | "support" | "compact" }) {
  const titleClasses = {
    primary: "text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.06] tracking-[-0.04em]",
    support: "text-[clamp(1.9rem,3.15vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.04em]",
    compact: "text-[clamp(1.7rem,2.7vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.035em]",
  }[tier];

  return <div className={`${centered ? "mx-auto text-center" : ""} max-w-[760px]`}><p className="text-xs font-black tracking-[0.08em] text-[#563DFF]">{eyebrow}</p><h2 className={`mt-3 ${titleClasses} text-[#0B1239]`}>{title}</h2>{body ? <p className={`${centered ? "mx-auto" : ""} mt-4 max-w-[710px] text-[1rem] leading-7 text-[#596180]`}>{body}</p> : null}</div>;
}

function InfoCard({ title, body, icon: Icon }: { title: string; body: string; icon: Icon }) {
  return <article className="rounded-[1.5rem] border border-[#E1E4F2] bg-white p-6 shadow-[0_12px_30px_rgba(30,37,92,0.04)] sm:p-7"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#F0EEFF] text-[#563DFF]"><Icon className="h-[1.1rem] w-[1.1rem]" /></span><h2 className="mt-4 text-[1.3rem] font-bold leading-[1.16] tracking-[-0.035em] text-[#11183B]">{title}</h2><p className="mt-3 text-[0.96rem] leading-7 text-[#56607E]">{body}</p></article>;
}
