import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRightIcon,
  BellIcon,
  BuildingIcon,
  CalendarIcon,
  ChartIcon,
  ChatIcon,
  CheckCircleIcon,
  CubeIcon,
  FileCheckIcon,
  HandIcon,
  LightningIcon,
  MailIcon,
  RocketIcon,
  ScaleIcon,
  TrendIcon,
  UserIcon,
  UsersIcon,
} from "@/components/Icons";
import type { SiteCopy } from "@/lib/copy";
import type { Language } from "@/lib/i18n";

type PhilooLandingProps = {
  lang: Language;
  copy: SiteCopy;
};

const benefitIcons = [HandIcon, LightningIcon, ChartIcon, UsersIcon] as const;
const exampleIcons = [UserIcon, FileCheckIcon, ScaleIcon, BuildingIcon] as const;
const processIcons = [ChatIcon, CubeIcon, RocketIcon, TrendIcon] as const;
const workflowIcons = [MailIcon, CalendarIcon, FileCheckIcon, UserIcon, BellIcon] as const;

export function PhilooLanding({ lang, copy }: PhilooLandingProps) {
  return (
    <div className="page-background">
      <Navbar copy={copy.nav} lang={lang} />

      <main className="mx-auto max-w-[1520px] px-3 pb-6 pt-5 sm:px-5 lg:px-8 xl:px-10">
        <section className="overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 shadow-[0_24px_70px_rgba(15,23,54,0.06)]">
          <div className="px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pb-9 lg:pt-16">
            <div className="grid items-center gap-9 min-[1180px]:grid-cols-[minmax(600px,0.95fr)_minmax(0,1fr)] min-[1180px]:gap-4">
              <Reveal className="max-w-[720px]">
                <h1 className="text-[clamp(2.85rem,4.5vw,4.55rem)] font-black leading-[1.04] tracking-[0] text-[#161851]">
                  <span className="block min-[1180px]:whitespace-nowrap">{copy.hero.headline[0]}</span>
                  <span className="block min-[1180px]:whitespace-nowrap">
                    {copy.hero.headline[1]}
                    <span className="gold-dot" />
                  </span>
                </h1>
                <p className="mt-7 max-w-[560px] text-[1.04rem] font-medium leading-[1.8] text-[#0F1736]/90 sm:text-[1.15rem]">
                  {copy.hero.body}
                </p>
                <a
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#161851] px-6 py-4 text-[0.95rem] font-extrabold text-white shadow-[0_16px_32px_rgba(22,24,81,0.2)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#F7F8FA]"
                  href="mailto:hello@philoo.nl"
                >
                  <CalendarIcon className="h-5 w-5 text-[#D6C48A]" />
                  {copy.hero.cta}
                  <ArrowRightIcon className="h-5 w-5 text-[#D6C48A]" />
                </a>
              </Reveal>

              <Reveal className="mx-auto w-full max-w-[760px] min-[1180px]:ml-auto" delay={100}>
                <HeroWorkflowVisual labels={copy.hero.workflow} visualAria={copy.hero.visualAria} />
              </Reveal>
            </div>
          </div>

          <Benefits copy={copy} />
          <Examples copy={copy} />
          <Process copy={copy} />
          <AudienceAndTestimonial copy={copy} />
          <BottomCta copy={copy} />
        </section>
      </main>
    </div>
  );
}

function HeroWorkflowVisual({ labels, visualAria }: { labels: string[]; visualAria: string }) {
  return (
    <div aria-label={visualAria} className="workflow-stage mx-auto" role="img">
      <svg aria-hidden="true" className="workflow-lines" preserveAspectRatio="none" viewBox="0 0 720 468">
        <path d="M210 92 H438 Q462 92 462 116 V208" />
        <path d="M210 224 H362 Q386 224 386 248 V248" />
        <path d="M182 344 H330 Q354 344 354 316 V292 H438" />
        <path d="M480 174 H564 Q588 174 588 198 V256 H502" />
        <path d="M502 294 H510 Q534 294 534 318 V352 H594" />
        <circle cx="210" cy="92" r="4.5" />
        <circle cx="210" cy="224" r="4.5" />
        <circle cx="182" cy="344" r="4.5" />
        <circle cx="564" cy="174" r="4.5" />
        <circle cx="594" cy="352" r="4.5" />
      </svg>

      <span aria-hidden="true" className="absolute left-[6%] top-[16%] text-lg font-black text-[#D6C48A]/80">
        +
      </span>
      <span aria-hidden="true" className="absolute bottom-[13%] left-[46%] text-lg font-black text-[#D6C48A]/80">
        +
      </span>
      <span aria-hidden="true" className="absolute right-[3%] top-[31%] text-xl font-black text-[#D6C48A]/80">
        +
      </span>

      {labels.map((label, index) => {
        const Icon = workflowIcons[index] ?? MailIcon;

        return (
          <div className={`workflow-card workflow-card-${index}`} key={label}>
            <Icon />
            <span>{label}</span>
          </div>
        );
      })}

      <div className="workflow-core">
        <div>
          <strong>AI</strong>
          <span>by Philoo</span>
        </div>
      </div>
    </div>
  );
}

function Benefits({ copy }: { copy: SiteCopy }) {
  return (
    <section aria-label="Benefits" className="px-5 pb-7 sm:px-8 lg:px-12">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {copy.benefits.map((benefit, index) => {
          const Icon = benefitIcons[index];

          return (
            <Reveal
              className="rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.055)] sm:p-7"
              delay={index * 70}
              key={benefit.title}
            >
              <div className="flex gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#D6C48A]/22 text-[#161851]">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-base font-black leading-snug text-[#161851]">{benefit.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-7 text-[#0F1736]/82">{benefit.body}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Examples({ copy }: { copy: SiteCopy }) {
  return (
    <section className="anchor-section px-0 pb-0 pt-2 lg:pt-3" id="voorbeelden">
      <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(239,243,249,0.72))] px-5 py-9 sm:px-8 lg:px-12">
        <Reveal className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-[760px] text-[clamp(1.75rem,4vw,2.38rem)] font-black leading-tight tracking-[0] text-[#161851]">
            {copy.examples.title}
          </h2>
          <a
            className="inline-flex items-center gap-2 text-sm font-black text-[#161851] transition-colors hover:text-[#14243A]"
            href="mailto:hello@philoo.nl"
          >
            {copy.examples.link}
          </a>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {copy.examples.cards.map((card, index) => {
            const Icon = exampleIcons[index];

            return (
              <Reveal
                className="rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.055)] sm:p-7"
                delay={index * 70}
                key={card.eyebrow}
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#D6C48A]/22 text-[#161851]">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="text-sm font-bold text-[#161851]/88">{card.eyebrow}</p>
                <h3 className="mt-2 text-[1.22rem] font-black leading-[1.18] tracking-[0] text-[#161851]">
                  {card.title}
                </h3>
                <p className="mt-5 text-[0.96rem] font-medium leading-7 text-[#0F1736]/82">{card.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section relative mt-4 overflow-hidden rounded-[10px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 py-8 shadow-[0_20px_50px_rgba(15,23,54,0.14)] sm:mt-5 sm:px-8 lg:mt-6 lg:px-12"
      id="werkwijze"
    >
      <Reveal>
        <h2 className="text-[clamp(1.6rem,3vw,2rem)] font-black leading-tight text-white">{copy.process.title}</h2>
      </Reveal>

      <div className="relative mt-4 grid gap-4 lg:grid-cols-4">
        <div
          aria-hidden="true"
          className="absolute left-[10%] right-[10%] top-[34px] hidden border-t-2 border-dotted border-[#D6C48A]/75 lg:block"
        />
        {copy.process.steps.map((step, index) => {
          const Icon = processIcons[index];

          return (
            <Reveal
              className="relative rounded-[12px] border border-white/12 bg-white/[0.075] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              delay={index * 90}
              key={step.number}
            >
              <div className="mb-5 flex items-start gap-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#D6C48A] text-base font-black text-[#161851]">
                  {step.number}
                </div>
                <Icon className="mt-1 h-9 w-9 text-white" />
              </div>
              <h3 className="text-lg font-black leading-snug">{step.title}</h3>
              <p className="mt-2 text-[0.96rem] font-medium leading-7 text-white/86">{step.body}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function AudienceAndTestimonial({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section grid gap-7 px-5 py-10 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:px-12"
      id="voor-wie"
    >
      <Reveal>
        <h2 className="text-[clamp(1.6rem,3vw,2.05rem)] font-black leading-tight text-[#161851]">
          {copy.audience.title}
        </h2>
        <ul className="mt-6 grid gap-5">
          {copy.audience.bullets.map((bullet) => (
            <li className="flex items-start gap-4 text-[0.98rem] font-medium leading-7 text-[#0F1736]/86" key={bullet}>
              <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#D6C48A]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        className="rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_46px_rgba(15,23,54,0.07)] sm:p-7"
        delay={100}
      >
        <div className="flex gap-5">
          <span aria-hidden="true" className="shrink-0 text-5xl font-black leading-none text-[#D6C48A]">
            “
          </span>
          <div>
            <blockquote className="text-[0.98rem] font-medium leading-7 text-[#0F1736]/90">
              {copy.testimonial.quote}
            </blockquote>
            <div className="mt-6 border-t border-[#E6E8EF] pt-5 sm:flex sm:items-center sm:justify-between">
              <p className="text-sm font-black text-[#161851]">{copy.testimonial.attribution}</p>
              <div
                aria-label={copy.testimonial.ratingLabel}
                className="mt-3 flex items-center gap-4 text-sm font-black text-[#161851] sm:mt-0"
              >
                <span>5.0</span>
                <span aria-hidden="true" className="text-lg leading-none tracking-[0.08em] text-[#D6C48A]">
                  ★★★★★
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function BottomCta({ copy }: { copy: SiteCopy }) {
  return (
    <section className="anchor-section px-5 pb-8 pt-2 sm:px-8 lg:px-12 lg:pt-3" id="contact">
      <Reveal className="relative overflow-hidden rounded-[12px] bg-[linear-gradient(135deg,#161851,#14243A)] px-6 py-7 shadow-[0_22px_52px_rgba(15,23,54,0.18)] sm:px-10 lg:px-16">
        <div aria-hidden="true" className="cta-dot-pattern absolute inset-y-0 right-0 w-[40%] opacity-80" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-[clamp(1.55rem,3vw,2.12rem)] font-black leading-tight text-white">
              {copy.bottomCta.headline}
            </h2>
            <p className="mt-2 max-w-[720px] text-[1rem] font-medium leading-7 text-white/88">{copy.bottomCta.body}</p>
          </div>
          <a
            className="inline-flex w-fit items-center justify-center gap-4 rounded-[10px] bg-[#D6C48A] px-6 py-4 text-base font-black text-[#0F1736] shadow-[0_18px_34px_rgba(214,196,138,0.24)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#161851]"
            href="mailto:hello@philoo.nl"
          >
            <MailIcon className="h-5 w-5" />
            {copy.bottomCta.button}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
