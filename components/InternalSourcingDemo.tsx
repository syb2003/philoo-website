import { ArrowRightIcon, CheckCircleIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import type { SiteCopy } from "@/lib/copy";
import { CALENDLY_URL } from "@/lib/i18n";

type InternalSourcingDemoProps = {
  copy: NonNullable<SiteCopy["internalSourcingDemo"]>;
};

export function InternalSourcingDemo({ copy }: InternalSourcingDemoProps) {
  return (
    <section
      aria-labelledby="internal-sourcing-demo-title"
      className="anchor-section mt-4 overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 p-3 shadow-[0_22px_56px_rgba(15,23,54,0.06)] sm:mt-5 sm:p-4 lg:mt-6 lg:p-5"
      id="interne-sourcing-demo"
    >
      <div className="overflow-hidden rounded-[16px] bg-[linear-gradient(135deg,#161851,#14243A)] px-5 py-9 shadow-[0_22px_56px_rgba(15,23,54,0.18)] sm:px-8 sm:py-11 lg:px-10 min-[1180px]:px-12 min-[1180px]:py-12">
        <div className="mx-auto grid max-w-[1320px] gap-9 min-[1180px]:grid-cols-[minmax(0,0.76fr)_minmax(0,1.08fr)] min-[1180px]:items-center min-[1180px]:gap-12 xl:gap-16">
          <Reveal className="max-w-[610px]">
            <p className="text-sm font-black uppercase tracking-[0.08em] text-[#D6C48A]">
              {copy.eyebrow}
            </p>
            <h2
              className="mt-3 text-[clamp(1.85rem,4vw,2.65rem)] font-black leading-tight tracking-[0] text-white"
              id="internal-sourcing-demo-title"
            >
              {copy.title}
            </h2>
            <p className="mt-5 text-[1rem] font-medium leading-7 text-white/86 sm:text-[1.05rem]">
              {copy.body}
            </p>

            <ul className="mt-6 grid gap-3">
              {copy.supportingPoints.map((point) => (
                <li className="flex items-start gap-3 text-[0.98rem] font-bold leading-6 text-white" key={point}>
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#D6C48A]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 max-w-[520px] text-[0.98rem] font-black leading-6 text-white">
              {copy.ctaIntroduction}
            </p>
            <a
              className="mt-4 inline-flex items-center justify-center gap-3 rounded-[10px] bg-[#D6C48A] px-6 py-4 text-[0.95rem] font-extrabold text-[#0F1736] shadow-[0_16px_32px_rgba(214,196,138,0.18)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#161851]"
              href={CALENDLY_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {copy.cta}
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </Reveal>

          <Reveal className="min-w-0" delay={90}>
            <div className="overflow-hidden rounded-[14px] border border-white/16 bg-white shadow-[0_24px_60px_rgba(7,12,38,0.28)]">
              <video
                aria-label={copy.title}
                className="block aspect-video w-full bg-[#0F1736] object-contain"
                controls
                height={1080}
                playsInline
                poster="/videos/philoo-auto-sourcing-demo-poster.webp"
                preload="none"
                width={1920}
              >
                <source src="/videos/philoo-auto-sourcing-demo.mp4" type="video/mp4" />
                Je browser ondersteunt deze video niet.
              </video>
              <p className="border-t border-[#E6E8EF] bg-white px-4 py-3 text-[0.82rem] font-medium leading-5 text-[#0F1736]/68 sm:px-5">
                {copy.microcopy}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
