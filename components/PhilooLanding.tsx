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
const clientCaseBeforeAfterIcons = [CalendarIcon, LightningIcon] as const;
const heroWorkflowIcons = [InboxIcon, CalendarIcon, UsersIcon, ChatIcon, ChartIcon, FileCheckIcon] as const;
const processIcons = [ChatIcon, CubeIcon, RocketIcon, TrendIcon] as const;
const serviceIcons = [GraduationCapIcon, CubeIcon, SlidersIcon, SearchIcon] as const;
const resultCardLabelClassName = "min-h-5 text-xs font-black uppercase leading-5 tracking-[0.08em] text-[#D6C48A]";

export function PhilooLanding({ lang, copy }: PhilooLandingProps) {
  const isDutch = lang === "nl";

  return (
    <div className="page-background">
      <Navbar copy={copy.nav} lang={lang} />

      <main className="mx-auto max-w-[1760px] px-3 pb-6 pt-5 sm:px-5 lg:px-10 xl:px-12 2xl:px-14">
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
                <HeroWorkflowVisual labels={copy.hero.workflow} visualAria={copy.hero.visualAria} />
              </Reveal>
            </div>
          </div>

          <Benefits copy={copy} />
        </section>

        <Pricing copy={copy} />
        <Examples copy={copy} />
        <ClientCase copy={copy} />
        <Process copy={copy} />
        <Audience copy={copy} />
        <Services copy={copy} />
        <BottomCta copy={copy} />
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}

function HeroWorkflowVisual({ labels, visualAria }: { labels: string[]; visualAria: string }) {
  const cardLayout = [
    "left-[6%] top-[7%] w-[34%]",
    "left-[0%] top-[39%] w-[32%]",
    "bottom-[8%] left-[7%] w-[35%]",
    "right-[7%] top-[7%] w-[35%]",
    "right-[0%] top-[39%] w-[33%]",
    "bottom-[8%] right-[7%] w-[36%]",
  ];

  return (
    <div aria-label={visualAria} className="workflow-stage mx-auto" role="img">
      <div className="hidden sm:block">
        <HeroWorkflowConnectorLines />
        <WorkflowSparkles />
        <HeroWorkflowCenter />
        {labels.map((label, index) => {
          const Icon = heroWorkflowIcons[index] ?? FileCheckIcon;

          return (
            <HeroWorkflowCard
              className={cardLayout[index]}
              icon={Icon}
              key={label}
              label={label}
            />
          );
        })}
      </div>

      <div className="grid gap-3 sm:hidden">
        <HeroWorkflowCenter mobile />
        {labels.map((label, index) => {
          const Icon = heroWorkflowIcons[index] ?? FileCheckIcon;

          return <HeroWorkflowCard icon={Icon} key={label} label={label} />;
        })}
      </div>
    </div>
  );
}

function HeroWorkflowCenter({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      className={mobile
        ? "mx-auto grid h-[118px] w-[118px] place-items-center rounded-[24px] border border-white/15 bg-[linear-gradient(145deg,#161851,#14243A)] text-center text-white shadow-[0_24px_46px_rgba(15,23,54,0.18)]"
        : "absolute left-1/2 top-1/2 z-20 grid h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[26px] border border-white/15 bg-[linear-gradient(145deg,#161851,#14243A)] text-center text-white shadow-[0_26px_54px_rgba(15,23,54,0.2),inset_0_1px_0_rgba(255,255,255,0.16)]"}
    >
      <div>
        <CubeIcon className="mx-auto mb-3 h-8 w-8 text-[#D6C48A]" />
        <span className="block text-[1.45rem] font-black leading-[0.95] tracking-[0]">Philoo</span>
        <span className="block text-[1.42rem] font-black leading-[0.95] tracking-[0] text-[#D6C48A]">Recruit</span>
      </div>
    </div>
  );
}

function HeroWorkflowCard({
  className = "",
  icon: Icon,
  label,
}: {
  className?: string;
  icon: typeof InboxIcon;
  label: string;
}) {
  const positionClass = className ? `absolute ${className}` : "relative";

  return (
    <div
      className={`${positionClass} z-10 flex min-h-[70px] items-center gap-3 rounded-[14px] border border-[#E6E8EF] bg-white px-4 py-3 text-[#161851] shadow-[0_18px_42px_rgba(15,23,54,0.075)]`}
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#E6E8EF] bg-[#F7F8FA] text-[#161851]">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-[clamp(0.76rem,1.1vw,0.9rem)] font-black leading-tight tracking-[0]">{label}</span>
    </div>
  );
}

function HeroWorkflowConnectorLines() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full text-[#D6C48A]"
      fill="none"
      viewBox="0 0 720 430"
    >
      <defs>
        <marker
          id="workflow-arrow"
          markerHeight="8"
          markerWidth="8"
          orient="auto"
          refX="7"
          refY="4"
          viewBox="0 0 8 8"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="currentColor" opacity="0.78" />
        </marker>
      </defs>
      <g opacity="0.74" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M266 77 H454" markerEnd="url(#workflow-arrow)" />
        <path d="M272 85 V122 C272 146 299 146 321 146" />
        <path d="M448 85 V122 C448 146 421 146 399 146" />
        <path d="M232 215 H292" />
        <path d="M428 215 H488" />
        <path d="M278 350 H322 C338 350 338 294 338 282" />
        <path d="M442 350 H398 C382 350 382 294 382 282" />
        <path d="M558 87 H612 C634 87 640 103 640 124 V176" markerEnd="url(#workflow-arrow)" />
        <path d="M642 253 V305 C642 329 624 350 596 350 H454" markerEnd="url(#workflow-arrow)" />
        <path d="M166 350 H106 C78 350 70 330 70 305 V262" markerEnd="url(#workflow-arrow)" />
        <path d="M72 177 V125 C72 102 82 86 106 86 H160" />
      </g>
      <g opacity="0.82">
        <circle cx="272" cy="122" r="4" fill="currentColor" />
        <circle cx="448" cy="122" r="4" fill="currentColor" />
        <circle cx="292" cy="215" r="4" fill="currentColor" />
        <circle cx="428" cy="215" r="4" fill="currentColor" />
        <circle cx="338" cy="282" r="4" fill="currentColor" />
        <circle cx="382" cy="282" r="4" fill="currentColor" />
      </g>
    </svg>
  );
}

function WorkflowSparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 text-[#D6C48A]">
      <span className="absolute left-[5%] top-[16%] text-2xl font-black leading-none opacity-80">+</span>
      <span className="absolute right-[8%] bottom-[15%] text-2xl font-black leading-none opacity-72">+</span>
      <span className="absolute bottom-[6%] left-[47%] text-xl font-black leading-none opacity-58">+</span>
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

function ClientCase({ copy }: { copy: SiteCopy }) {
  const beforeAfterCards = [copy.clientCase.beforeAfter.before, copy.clientCase.beforeAfter.after];

  return (
    <section
      aria-labelledby="client-case-title"
      className="anchor-section mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="case-study"
    >
      <Reveal className="mx-auto max-w-[1320px]">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#D6C48A]">{copy.clientCase.eyebrow}</p>
        <div className="mt-3 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D6C48A]/45 bg-white/8 px-4 py-2 text-[0.96rem] font-extrabold leading-snug text-white shadow-[0_10px_24px_rgba(15,23,54,0.08)] sm:text-[1.04rem]">
          <UsersIcon className="h-5 w-5 shrink-0 text-[#D6C48A]" />
          <span>{copy.clientCase.clientLabel}</span>
        </div>
        <h2
          className="mt-5 max-w-[980px] text-[clamp(1.9rem,4vw,2.85rem)] font-black leading-tight tracking-[0] text-white"
          id="client-case-title"
        >
          {copy.clientCase.title}
        </h2>
        <p className="mt-5 max-w-[840px] text-[1.12rem] font-black leading-7 text-white/90 sm:text-[1.22rem]">
          {copy.clientCase.intro}
        </p>
      </Reveal>

      <div className="mx-auto mt-7 grid max-w-[1320px] gap-5 lg:grid-cols-2">
        {beforeAfterCards.map((card, index) => (
          <BeforeAfterCard
            card={card}
            delay={index * 70}
            icon={clientCaseBeforeAfterIcons[index] ?? FileCheckIcon}
            key={card.title}
          />
        ))}
      </div>

      <Reveal className="mx-auto mt-6 max-w-[1320px]" delay={90}>
        <p className="text-[1rem] font-black leading-7 text-white sm:text-[1.08rem]">
          {copy.clientCase.shortlistReadyText}
        </p>
      </Reveal>

      <Reveal className="mx-auto mt-3 max-w-[1320px]" delay={105}>
        <ShortlistEmailMockup emailPreview={copy.clientCase.emailPreview} />
      </Reveal>

      <Reveal className="mx-auto mt-7 max-w-[1320px]" delay={115}>
        <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white">
          {copy.clientCase.resultsTitle}
        </h3>
      </Reveal>

      <Reveal
        className="mx-auto mt-4 max-w-[1320px]"
        delay={120}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {copy.clientCase.metrics.map((metric, index) => (
            <div
              className="flex min-w-0 flex-col items-center rounded-[14px] border border-[#E6E8EF] bg-white p-6 text-center shadow-[0_18px_42px_rgba(15,23,54,0.12)] sm:p-7 lg:min-h-[230px] lg:p-8"
              key={`${metric.value}-${index}`}
            >
              {metric.label ? (
                <p className={resultCardLabelClassName}>{metric.label}</p>
              ) : null}
              <p className="mt-4 break-words text-[1.75rem] font-black leading-tight tracking-[0] text-[#161851] sm:text-[2rem] lg:text-[2.15rem]">
                {metric.value}
              </p>
              {metric.supportingText ? (
                <p className="mx-auto mt-5 max-w-[340px] text-[0.95rem] font-medium leading-6 text-[#161851]/86">
                  {metric.supportingText}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-[1320px] lg:mt-16" delay={145}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.35fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.08em] text-[#D6C48A]">
              {copy.clientCase.testimonialHeader.eyebrow}
            </p>
            <h3 className="mt-2 max-w-[520px] text-[clamp(1.45rem,3vw,1.9rem)] font-black leading-tight tracking-[0] text-white">
              {copy.clientCase.testimonialHeader.title}
            </h3>
          </div>

          <div className="rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.12)] sm:p-7">
            <span aria-hidden="true" className="text-5xl font-black leading-none text-[#D6C48A]">
              “
            </span>
            <blockquote className="mt-1 text-[1rem] font-medium italic leading-7 text-[#0F1736]/90">
              {copy.clientCase.quote}
            </blockquote>
            <p className="mt-5 text-sm font-black text-[#161851]">{copy.clientCase.attribution}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function BeforeAfterCard({
  card,
  delay,
  icon: Icon,
}: {
  card: SiteCopy["clientCase"]["beforeAfter"]["before"];
  delay: number;
  icon: typeof CalendarIcon;
}) {
  return (
    <Reveal
      className="h-full rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.1)] sm:p-7"
      delay={delay}
    >
      <div className="grid h-full grid-cols-[56px_minmax(0,1fr)] gap-x-5">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-[#E6E8EF] bg-[#F7F8FA] text-[#D6C48A]">
          <Icon className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <h3 className="text-[1.14rem] font-black leading-snug text-[#161851] sm:text-[1.22rem]">{card.title}</h3>
          <ul className="mt-4 grid gap-3">
            {card.items.map((item) => (
              <li className="flex items-start gap-3 text-[0.96rem] font-medium leading-6 text-[#0F1736]/84" key={item}>
                <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#D6C48A]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-[#E6E8EF] pt-5 text-left">
            <p className="text-[1rem] font-black leading-6 text-[#161851]">{card.outcome}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ShortlistEmailMockup({
  emailPreview,
}: {
  emailPreview: SiteCopy["clientCase"]["emailPreview"];
}) {
  return (
    <div
      aria-label={emailPreview.ariaLabel}
      className="overflow-hidden rounded-[14px] border border-[#E6E8EF] bg-white shadow-[0_18px_42px_rgba(15,23,54,0.12)]"
      role="group"
    >
      <div className="hidden grid-cols-[64px_minmax(150px,220px)_minmax(0,1fr)_76px] border-b border-[#E6E8EF] bg-white px-4 py-3 text-xs font-black text-[#0F1736]/58 sm:grid sm:px-5">
        <span aria-hidden="true" />
        <span>{emailPreview.columns.from}</span>
        <span>{emailPreview.columns.subject}</span>
        <span className="text-right">{emailPreview.columns.time}</span>
      </div>
      <InboxEmailRow email={emailPreview.preparedEmail} selected />
      <InboxEmailRow email={emailPreview.requestEmail} />
    </div>
  );
}

function InboxEmailRow({
  email,
  selected = false,
}: {
  email: SiteCopy["clientCase"]["emailPreview"]["preparedEmail"];
  selected?: boolean;
}) {
  const initials = email.sender === "Philoo" ? "Ph" : email.sender;

  return (
    <div
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-3 gap-y-2 border-l-4 border-b border-[#E6E8EF] px-3 py-4 last:border-b-0 sm:grid-cols-[64px_minmax(150px,220px)_minmax(0,1fr)_76px] sm:items-center sm:px-5 ${
        selected ? "border-l-[#D6C48A] bg-[#F3F7FE]" : "border-l-transparent bg-white"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span aria-hidden="true" className="h-4 w-4 rounded-[4px] border border-[#9CA8C4] bg-white" />
        <span aria-hidden="true" className="text-xl leading-none text-[#9CA8C4]">
          ☆
        </span>
      </div>
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black ${
            selected ? "bg-[#161851] text-white" : "bg-[#E6E8EF] text-[#161851]"
          }`}
        >
          {initials}
        </span>
        <span className="min-w-0 break-words text-[0.95rem] font-black leading-5 text-[#161851]">{email.sender}</span>
      </div>
      <div className="col-span-3 min-w-0 sm:col-span-1">
        <p className="break-words text-[0.95rem] font-black leading-5 text-[#161851]">{email.subject}</p>
        <p className="mt-1 break-words text-[0.88rem] font-medium leading-5 text-[#0F1736]/70">{email.preview}</p>
      </div>
      <div className="col-start-3 row-start-1 flex items-center justify-end gap-2 text-[0.94rem] font-bold text-[#161851]/76 sm:col-start-4">
        <span>{email.time}</span>
        {selected ? <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#D6C48A]" /> : null}
      </div>
    </div>
  );
}

function Process({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 px-5 py-9 shadow-[0_22px_56px_rgba(15,23,54,0.06)] sm:mt-5 sm:px-8 lg:mt-6 lg:px-12"
      id="werkwijze"
    >
      <Reveal>
        <h2 className="text-[clamp(1.6rem,3vw,2rem)] font-black leading-tight text-[#161851]">{copy.process.title}</h2>
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

function Audience({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="voor-wie"
    >
      <Reveal className="max-w-[1120px]">
        <h2 className="text-[clamp(1.6rem,3vw,2.05rem)] font-black leading-tight text-white">
          {copy.audience.title}
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {copy.audience.bullets.map((bullet) => (
            <li className="flex items-start gap-4 text-[0.98rem] font-medium leading-7 text-white/86" key={bullet}>
              <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#D6C48A]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function Pricing({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="pricing"
    >
      <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1fr)] lg:items-start xl:gap-12">
        <Reveal className="max-w-[640px] lg:mx-0">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#D6C48A]">{copy.pricing.label}</p>
          <h2 className="mt-3 text-[clamp(1.85rem,4vw,2.55rem)] font-black leading-tight tracking-[0] text-white">
            {copy.pricing.title}
          </h2>
          <div className="mt-5 grid max-w-[760px] gap-3 text-[1rem] font-medium leading-7 text-white/86">
            <p>{copy.pricing.intro}</p>
            <p>{copy.pricing.secondParagraph}</p>
          </div>
        </Reveal>

        <Reveal
          className="mx-auto mt-7 w-full max-w-[760px] rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.12)] sm:p-7 lg:mt-0 lg:justify-self-end lg:p-8"
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
      </div>
    </section>
  );
}


function Services({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-4 overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 px-5 pb-10 pt-12 shadow-[0_22px_56px_rgba(15,23,54,0.06)] sm:mt-5 sm:px-8 sm:pt-12 lg:mt-6 lg:px-12 lg:pt-14"
      id="services"
    >
      <Reveal className="mb-6 max-w-[760px]">
        <h2 className="text-[clamp(1.7rem,4vw,2.2rem)] font-black leading-tight tracking-[0] text-[#161851]">
          {copy.services.title}
        </h2>
        <p className="mt-3 max-w-[700px] text-[0.98rem] font-medium leading-7 text-[#0F1736]/84">{copy.services.intro}</p>
      </Reveal>

      <div className="mt-7 rounded-[16px] border border-[#E6E8EF] bg-white p-5 shadow-[0_18px_42px_rgba(15,23,54,0.08)] sm:p-7 lg:p-9">
        <div className="mx-auto grid w-full max-w-[1180px] gap-6 md:grid-cols-2 md:justify-items-center lg:gap-16 xl:gap-24">
          {copy.services.cards.map((card, index) => {
          const Icon = serviceIcons[index] ?? CubeIcon;

          return (
            <Reveal
              className="h-full w-full max-w-[460px] rounded-[14px] border border-[#E6E8EF] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,54,0.12)] sm:p-7"
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
      </div>
    </section>
  );
}

function BottomCta({ copy }: { copy: SiteCopy }) {
  return (
    <section
      className="anchor-section mt-8 overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#161851,#14243A)] px-6 py-8 shadow-[0_18px_46px_rgba(15,23,54,0.18)] sm:mt-10 sm:px-10 sm:py-9 lg:mt-12 lg:px-16"
      id="contact"
    >
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-[clamp(1.55rem,3vw,2.12rem)] font-black leading-tight text-white">
              {copy.bottomCta.headline}
            </h2>
            <p className="mt-2 max-w-[720px] text-[1rem] font-medium leading-7 text-white/84">{copy.bottomCta.body}</p>
          </div>
          <a
            className="inline-flex w-fit items-center justify-center gap-4 rounded-[10px] bg-[#D6C48A] px-6 py-4 text-base font-black text-[#0F1736] shadow-[0_18px_34px_rgba(214,196,138,0.18)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#161851]"
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
