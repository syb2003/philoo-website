import type { Metadata } from "next";
import Link from "next/link";
import { GuideEmailForm } from "@/components/GuideEmailForm";
import { ArrowRightIcon, CalendarIcon, CheckCircleIcon, FileCheckIcon } from "@/components/Icons";
import { TrackedGuideDownloadLink } from "@/components/TrackedGuideDownloadLink";
import { TrackedAnchor } from "@/components/site/Analytics";
import { PhilooLogo } from "@/components/site/PhilooLogo";
import { CALENDLY_URL } from "@/lib/i18n";

const pageTitle = "Meer plaatsingen met hetzelfde team | Gratis gids | Philoo";
const pageDescription =
  "Download de gratis Philoo-gids over waar recruitmentbureaus tijd verliezen, welke werkzaamheden onnodig veel tijd kosten en waar je als eerste gericht kunt verbeteren.";
const canonicalUrl = "https://www.philoo.nl/meer-plaatsingen-met-hetzelfde-team";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    siteName: "Philoo",
    locale: "nl_NL",
    type: "website",
  },
  twitter: { card: "summary", title: pageTitle, description: pageDescription },
  robots: {
    index: true,
    follow: true,
  },
};

const guideHighlights = [
  "Waar jouw team onnodig veel tijd aan kwijt is",
  "Welke werkzaamheden steeds terugkomen",
  "Welke verbetering het meeste oplevert",
  "Wat mensenwerk blijft",
] as const;

export default function GuideDownloadPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FA] text-[#0F1736]">
      <header className="border-b border-[#E6E8EF] bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-12">
          <PhilooLogo href="/nl" />
          <Link
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#161851] transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-4 sm:text-base"
            href="/nl"
          >
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4 rotate-180 sm:h-5 sm:w-5" />
            Terug naar Philoo
          </Link>
        </div>
      </header>

      <main className="flex flex-1">
        <section className="flex w-full flex-1 items-center" aria-labelledby="guide-title">
          <div className="mx-auto grid w-full max-w-[1440px] items-start gap-10 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.8fr)] lg:gap-14 lg:px-12 lg:py-7 xl:gap-20">
            <div className="max-w-[760px]">
              <p className="text-xs font-black uppercase leading-5 tracking-[0.08em] text-[#B39A4D] sm:text-sm">
                Praktische gids voor recruitmentbureaus
              </p>
              <h1
                className="mt-6 text-[2.65rem] font-black leading-[1.08] tracking-[0] text-[#161851] sm:text-[3.5rem] lg:text-[3rem] xl:text-[4rem]"
                id="guide-title"
              >
                <span className="block">Minder administratie.</span>
                <span className="mt-1 block">Meer plaatsingen.</span>
              </h1>
              <p className="mt-7 max-w-[680px] text-lg font-extrabold leading-8 text-[#161851] sm:text-xl sm:leading-9">
                Hoe recruitmentbureaus meer plaatsingen kunnen doen zonder meer recruiters aan te hoeven nemen.
              </p>
              <div className="mt-10 text-base leading-7 text-[#0F1736]/82 sm:text-lg sm:leading-8">
                <p>Wil je eens sparren over waar jullie tegenaan lopen?</p>
                <TrackedAnchor
                  className="mt-3 inline-block text-2xl font-black leading-[1.15] text-[#161851] underline decoration-[#D6C48A] decoration-2 underline-offset-8 transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-4 sm:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem]"
                  href={CALENDLY_URL}
                  event="calendly_cta_click"
                  language="nl"
                  sourceCategory="calendly"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Boek dan een kennismaking.
                </TrackedAnchor>
              </div>
            </div>

            <aside
              aria-labelledby="guide-contents-title"
              className="w-full rounded-[16px] border border-[#E6E8EF] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,54,0.09)] sm:p-7 lg:justify-self-end xl:p-8"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <FileCheckIcon aria-hidden="true" className="h-10 w-10 shrink-0 text-[#B89B45] sm:h-12 sm:w-12" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-black leading-7 tracking-[0] text-[#161851] sm:text-2xl" id="guide-contents-title">
                    Wat je in de gids vindt
                  </h2>
                  <span aria-hidden="true" className="mt-4 block h-px w-full bg-[#D6C48A]/65" />
                </div>
              </div>

              <ul className="mt-6 space-y-4 sm:mt-7">
                {guideHighlights.map((item) => (
                  <li className="flex items-start gap-3.5 text-[0.95rem] font-semibold leading-6 text-[#0F1736]/88 sm:text-base" key={item}>
                    <CheckCircleIcon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#B89B45]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#D6C48A]/60 bg-[#F7F8FA] px-3.5 py-2 text-xs font-extrabold text-[#161851] sm:text-sm">
                <CalendarIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                5–10 minuten scan- en leestijd
              </p>

              <TrackedGuideDownloadLink
                aria-label="Download de gids Meer plaatsingen met hetzelfde team als PDF"
                className="mt-4 inline-flex w-full items-center justify-center rounded-[10px] bg-[#161851] px-6 py-4 text-[0.95rem] font-extrabold text-white shadow-[0_16px_32px_rgba(22,24,81,0.2)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-white sm:text-base"
                download="meer-plaatsingen-met-hetzelfde-team-philoo.pdf"
                href="/downloads/meer-plaatsingen-met-hetzelfde-team-philoo.pdf"
              >
                Download de gratis gids
              </TrackedGuideDownloadLink>

              <div aria-hidden="true" className="my-5 flex items-center gap-4 text-sm font-semibold text-[#0F1736]/55">
                <span className="h-px flex-1 bg-[#E6E8EF]" />
                <span>of</span>
                <span className="h-px flex-1 bg-[#E6E8EF]" />
              </div>

              <GuideEmailForm />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
