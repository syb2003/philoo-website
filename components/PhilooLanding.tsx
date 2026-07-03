import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChartIcon,
  ChatIcon,
  CheckCircleIcon,
  CubeIcon,
  FileCheckIcon,
  GraduationCapIcon,
  HandIcon,
  InboxIcon,
  LifeBuoyIcon,
  LightningIcon,
  MailIcon,
  ReceiptIcon,
  RocketIcon,
  SearchIcon,
  SlidersIcon,
  TrendIcon,
  UsersIcon,
} from "@/components/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import type { SiteCopy } from "@/lib/copy";
import { CALENDLY_URL, type Language } from "@/lib/i18n";

type PhilooLandingProps = {
  lang: Language;
  copy: SiteCopy;
};

const benefitIcons = [HandIcon, LightningIcon, ChartIcon, UsersIcon] as const;
const exampleIcons = [InboxIcon, FileCheckIcon, LifeBuoyIcon, ReceiptIcon] as const;
const processIcons = [ChatIcon, CubeIcon, RocketIcon, TrendIcon] as const;
const serviceIcons = [GraduationCapIcon, CubeIcon, SlidersIcon, SearchIcon] as const;

const heroWorkflowIcons = [InboxIcon, CalendarIcon, UsersIcon, ChatIcon, ChartIcon, FileCheckIcon] as const;

export function PhilooLanding({ lang, copy }: PhilooLandingProps) {
  const isDutch = lang === "nl";

  return (
    <div className="page-background">
      <Navbar copy={copy.nav} lang={lang} />

      <main className="mx-auto max-w-[1620px] px-3 pb-6 pt-5 sm:px-5 lg:px-10 xl:px-12 2xl:px-14">
        <section
          className="anchor-section overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 shadow-[0_24px_70px_rgba(15,23,54,0.06)]"
          id="home"
        >
          <div className="px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pb-7 lg:pt-12 2xl:pb-9 2xl:pt-16">
            <div className="grid items-center gap-10 min-[1180px]:grid-cols-[minmax(0,600px)_minmax(620px,1fr)] min-[1180px]:gap-10 xl:gap-12 2xl:grid-cols-[minmax(0,560px)_minmax(760px,1fr)] 2xl:gap-24">
              <Reveal
                className="max-w-[540px] min-[1180px]:pr-8 2xl:pr-12"
              >
                <h1
                  className={isDutch
                    ? "text-[clamp(2.85rem,4.5vw,4.55rem)] font-black leading-[1.04] tracking-[0] text-[#161851] min-[1180px]:text-[clamp(2.35rem,2.85vw,3.35rem)]"
                    : "text-[clamp(2.85rem,4.5vw,4.55rem)] font-black leading-[1.04] tracking-[0] text-[#161851] min-[1180px]:text-[clamp(2.3rem,2.25vw,2.7rem)]"}
                >
                  <span className="block min-[1180px]:whitespace-nowrap">{copy.hero.headline[0]}</span>
                  <span className="block min-[1180px]:whitespace-nowrap">{copy.hero.headline[1]}</span>
                </h1>
                <div className="mt-6 max-w-[590px] 2xl:mt-7 2xl:max-w-[560px]">
                  {copy.hero.lead ? (
                    <p className="text-[1rem] font-black leading-[1.55] text-[#161851] sm:text-[1.05rem]">{copy.hero.lead}</p>
                  ) : null}
                  <p
                    className={`${copy.hero.lead ? "mt-4 " : ""}text-[1.04rem] font-medium leading-[1.62] text-[#0F1736]/90 sm:text-[1.15rem]`}
                  >
                    {copy.hero.body}
                  </p>
                  {copy.hero.credibility ? (
                    <p className="mt-3 text-[0.9rem] font-medium leading-[1.6] text-[#0F1736]/62 sm:text-[0.94rem]">
                      {copy.hero.credibility}
                    </p>
                  ) : null}
                </div>
                <a
                  className="mt-5 inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#161851] px-6 py-4 text-[0.95rem] font-extrabold text-white shadow-[0_16px_32px_rgba(22,24,81,0.2)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#F7F8FA] 2xl:mt-8"
                  href={CALENDLY_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <CalendarIcon className="h-5 w-5 text-[#D6C48A]" />
                  {copy.hero.cta}
                  <ArrowRightIcon className="h-5 w-5 text-[#D6C48A]" />
                </a>
              </Reveal>

              <Reveal
                className={isDutch
                  ? "mx-auto w-full max-w-[880px] min-[1180px]:justify-self-end min-[1180px]:pl-8 xl:pl-14 2xl:pl-20"
                  : "mx-auto w-full max-w-[880px] min-[1180px]:justify-self-end min-[1180px]:pl-6 xl:pl-10 2xl:pl-14"}
                delay={100}
              >
                <HeroWorkflowVisual labels={copy.hero.workflow} />
              </Reveal>
            </div>
          </div>

          <Benefits copy={copy} />
        </section>

        <Pricing copy={copy} />
        <Examples copy={copy} />
        <Process copy={copy} />
        <AudienceAndTestimonial copy={copy} />
        <Services copy={copy} />
        <BottomCta copy={copy} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

function HeroWorkflowVisual({ labels }: { labels: string[] }) {
  const cardLayout = [
    { className: "left-[8%] top-[8%] w-[32%]", icon: heroWorkflowIcons[0] ?? InboxIcon, label: labels[0] },
    { className: "left-[1%] top-[39%] w-[31%]", icon: heroWorkflowIcons[1] ?? CalendarIcon, label: labels[1] },
    { className: "bottom-[8%] left-[8%] w-[34%]", icon: heroWorkflowIcons[2] ?? UsersIcon, label: labels[2] },
    { className: "right-[8%] top-[8%] w-[34%]", icon: heroWorkflowIcons[3] ?? ChatIcon, label: labels[3] },
    { className: "right-[1%] top-[39%] w-[31%]", icon: heroWorkflowIcons[4] ?? ChartIcon, label: labels[4] },
    { className: "bottom-[8%] right-[8%] w-[36%]", icon: heroWorkflowIcons[5] ?? FileCheckIcon, label: labels[5] },
  ];

  return (
    <div className="workflow-stage workflow-stage-image mx-auto px-1 py-4 sm:px-3">
      <div className="relative hidden min-h-[430px] w-full sm:block">
        <HeroWorkflowConnectorLines />
        <WorkflowSparkles />
        {cardLayout.map(({ className, icon: Icon, label }) =>
          label ? (
            <HeroWorkflowCard Icon={Icon} className={className} key={label} label={label} />
          ) : null,
        )}
        <HeroWorkflowCenter />
      </div>

      <div className="grid gap-3 sm:hidden">
        <HeroWorkflowCenter mobile />
        {labels.map((label, index) => {
          const Icon = heroWorkflowIcons[index] ?? InboxIcon;

          return <HeroWorkflowCard Icon={Icon} key={label} label={label} />;
        })}
      </div>
    </div>
  );
}

function HeroWorkflowCenter({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={
        mobile
          ? "mx-auto grid h-28 w-28 place-items-center rounded-[20px] border border-white/20 bg-[linear-gradient(135deg,#161851,#14243A)] text-center shadow-[0_20px_42px_rgba(15,23,54,0.22)]"
          : "absolute left-1/2 top-1/2 z-20 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[24px] border border-white/20 bg-[linear-gradient(135deg,#161851,#14243A)] text-center shadow-[0_22px_48px_rgba(15,23,54,0.24)]"
      }
    >
      <div>
        <CubeIcon className="mx-auto mb-2 h-7 w-7 text-[#D6C48A]" />
        <p className={mobile ? "text-[1.28rem] font-black leading-[1.02] text-white" : "text-[1.45rem] font-black leading-[1.02] text-white"}>
          Philoo
          <span className="block text-[#D6C48A]">Recruit</span>
        </p>
      </div>
    </div>
  );
}

function HeroWorkflowConnectorLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-[#D6C48A]"
      preserveAspectRatio="none"
      viewBox="0 0 720 430"
    >
      <defs>
        <marker id="workflow-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
          <path d="M0 0 8 4 0 8Z" fill="currentColor" opacity="0.62" />
        </marker>
      </defs>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" opacity="0.66">
        <path d="M288 75 H322 C337 75 337 142 360 142" />
        <path d="M432 142 C383 142 383 75 418 75" />
        <path d="M224 215 H288" />
        <path d="M432 215 H496" />
        <path d="M304 355 H334 C344 355 344 288 360 288" />
        <path d="M416 355 H386 C376 355 376 288 360 288" />
        <path d="M288 75 H418" markerEnd="url(#workflow-arrow)" opacity="0.52" />
        <path d="M662 75 C692 75 692 215 686 215" markerEnd="url(#workflow-arrow)" opacity="0.42" />
        <path d="M58 215 C36 215 36 75 58 75" markerEnd="url(#workflow-arrow)" opacity="0.38" />
        <path d="M416 355 H304" markerEnd="url(#workflow-arrow)" opacity="0.42" />
      </g>
      <g fill="currentColor" opacity="0.72">
        <circle cx="288" cy="75" r="4" />
        <circle cx="224" cy="215" r="4" />
        <circle cx="304" cy="355" r="4" />
        <circle cx="432" cy="142" r="4" />
        <circle cx="432" cy="215" r="4" />
        <circle cx="416" cy="355" r="4" />
      </g>
    </svg>
  );
}

function WorkflowSparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 text-[#D6C48A]">
      <span className="absolute left-[3%] top-[6%] text-xl font-black leading-none opacity-64">+</span>
      <span className="absolute right-[4%] top-[14%] text-lg font-black leading-none opacity-52">+</span>
      <span className="absolute bottom-[5%] left-[44%] text-lg font-black leading-none opacity-55">+</span>
      <span className="absolute bottom-[13%] right-[2%] text-xl font-black leading-none opacity-52">+</span>
    </div>
  );
}

function HeroWorkflowCard({
  Icon,
  className = "",
  label,
}: {
  Icon: (typeof heroWorkflowIcons)[number];
  className?: string;
  label: string;
}) {
  const positionClass = className ? `absolute ${className}` : "relative";

  return (
    <div className={`${positionClass} z-10 flex min-h-[68px] items-center gap-3 rounded-[13px] border border-[#E6E8EF] bg-white px-4 py-3 text-[#161851] shadow-[0_16px_34px_rgba(15,23,54,0.08)]`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F7F8FA] text-[#161851] ring-1 ring-[#E6E8EF]">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-[0.82rem] font-black leading-tight text-[#161851] sm:text-[0.9rem]">
        {label}
      </span>
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
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#E6E8EF] bg-[#F7F8FA] text-[#161851]">
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
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 px-5 pb-9 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.06)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="voorbeelden"
    >
      <Reveal className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="max-w-[760px] text-[clamp(1.75rem,4vw,2.38rem)] font-black leading-tight tracking-[0] text-[#161851]">
          {copy.examples.title}
        </h2>
        <a
          className="inline-flex items-center gap-2 text-sm font-black text-[#161851] transition-colors hover:text-[#D6C48A]"
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
              className="rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.08)] sm:p-7"
              delay={index * 70}
              key={card.eyebrow}
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-[#E6E8EF] bg-[#F7F8FA] text-[#161851]">
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
    </section>
  );
}

function Process({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 py-9 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:mt-5 sm:px-8 lg:mt-6 lg:px-12"
      id="werkwijze"
    >
      <Reveal>
        <h2 className="text-[clamp(1.6rem,3vw,2rem)] font-black leading-tight text-white">{copy.process.title}</h2>
      </Reveal>

      <div className="mt-5 grid gap-4 lg:grid-cols-4">
        {copy.process.steps.map((step, index) => {
          const Icon = processIcons[index];

          return (
            <Reveal
              className="rounded-[12px] border border-[#E6E8EF] bg-white p-6 text-[#161851] shadow-[0_18px_42px_rgba(15,23,54,0.055)]"
              delay={index * 90}
              key={step.number}
            >
              <div className="mb-5 flex items-start gap-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#D6C48A] text-base font-black text-[#161851]">
                  {step.number}
                </div>
                <Icon className="mt-1 h-9 w-9 text-[#161851]" />
              </div>
              <h3 className="text-lg font-black leading-snug text-[#161851]">{step.title}</h3>
              <p className="mt-2 text-[0.96rem] font-medium leading-7 text-[#0F1736]/82">{step.body}</p>
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
      className="anchor-section mt-4 overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.06)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="voor-wie"
    >
      <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
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
      </div>
    </section>
  );
}

function Pricing({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="pricing"
    >
      <Reveal className="mx-auto max-w-[900px] text-center">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#D6C48A]">{copy.pricing.label}</p>
        <h2 className="mt-3 text-[clamp(1.85rem,4vw,2.55rem)] font-black leading-tight tracking-[0] text-white">
          {copy.pricing.title}
        </h2>
        <div className="mx-auto mt-5 grid max-w-[820px] gap-3 text-[1rem] font-medium leading-7 text-white/86">
          <p>{copy.pricing.intro}</p>
          <p>{copy.pricing.secondParagraph}</p>
        </div>
      </Reveal>

      <Reveal
        className="mx-auto mt-7 max-w-[980px] rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.12)] sm:p-7 lg:p-8"
        delay={60}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-[#D6C48A]" />
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#161851]/68">{copy.pricing.subtitle}</p>
        </div>
        <h3 className="mt-4 text-[1.2rem] font-black leading-snug text-[#161851]">{copy.pricing.exampleLabel}</h3>
        <p className="mt-3 max-w-[760px] text-[1rem] font-medium leading-7 text-[#0F1736]/84">
          {copy.pricing.calculationIntro}
        </p>

        <div className="mt-6 grid gap-3 rounded-[12px] border border-[#E6E8EF] bg-[#F7F8FA] p-5 sm:p-6">
          {copy.pricing.impactLines.map((line, index) => (
            <p
              className={`leading-6 text-[#161851] ${index === copy.pricing.impactLines.length - 1 ? "rounded-[10px] border border-[#D6C48A]/45 bg-[#D6C48A]/10 px-3 py-3 text-[1.16rem] font-black" : "text-[1rem] font-bold"}`}
              key={line}
            >
              {line}
            </p>
          ))}
        </div>

        <p className="mt-5 max-w-[760px] text-[1rem] font-black leading-7 text-[#161851]">{copy.pricing.finalLine}</p>
        <p className="mt-3 text-[0.84rem] font-medium leading-6 text-[#0F1736]/62">{copy.pricing.disclaimer}</p>
      </Reveal>
    </section>
  );
}


function Services({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="services"
    >
      <Reveal className="mb-6 max-w-[760px]">
        <h2 className="text-[clamp(1.7rem,4vw,2.2rem)] font-black leading-tight tracking-[0] text-white">
          {copy.services.title}
        </h2>
        <p className="mt-3 max-w-[700px] text-[0.98rem] font-medium leading-7 text-white/86">{copy.services.intro}</p>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2 lg:mx-auto lg:max-w-[1120px] lg:grid-cols-3">
        {copy.services.cards.map((card, index) => {
          const Icon = serviceIcons[index] ?? CubeIcon;

          return (
            <Reveal
              className="h-full rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.12)] sm:p-7"
              delay={index * 70}
              key={card.title}
            >
              <div className="flex h-full flex-col">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-[#E6E8EF] bg-[#F7F8FA] text-[#161851]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-[1.12rem] font-black leading-snug text-[#161851]">{card.title}</h3>
                <p className="mt-4 flex-1 text-[0.96rem] font-medium leading-7 text-[#0F1736]/88">{card.body}</p>
                <div className="mt-5 pt-4">
                  <span className="inline-flex rounded-full border border-[#D6C48A]/45 px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-[#161851]/68">
                    {card.price}
                  </span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function BottomCta({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-8 overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 px-6 py-8 shadow-[0_18px_46px_rgba(15,23,54,0.06)] sm:mt-10 sm:px-10 sm:py-9 lg:mt-12 lg:px-16"
      id="contact"
    >
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-[clamp(1.55rem,3vw,2.12rem)] font-black leading-tight text-[#161851]">
              {copy.bottomCta.headline}
            </h2>
            <p className="mt-2 max-w-[720px] text-[1rem] font-medium leading-7 text-[#0F1736]/84">{copy.bottomCta.body}</p>
          </div>
          <a
            className="inline-flex w-fit items-center justify-center gap-4 rounded-[10px] bg-[#D6C48A] px-6 py-4 text-base font-black text-[#0F1736] shadow-[0_18px_34px_rgba(214,196,138,0.18)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-white"
            href={CALENDLY_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <MailIcon className="h-5 w-5" />
            {copy.bottomCta.button}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
