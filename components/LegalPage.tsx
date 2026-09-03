import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import type { Language } from "@/lib/i18n";

type LegalPageProps = {
  lang: Language;
  title: string;
  children: ReactNode;
  backLabel: string;
};

export function LegalPage({ lang, title, children, backLabel }: LegalPageProps) {
  return (
    <div className="page-background min-h-screen">
      <main className="mx-auto max-w-[1620px] px-3 pb-8 pt-5 sm:px-5 lg:px-10 xl:px-12 2xl:px-14">
        <section className="overflow-hidden rounded-[18px] border border-[#E6E8EF]/78 bg-[#F7F8FA]/82 px-6 py-10 shadow-[0_24px_70px_rgba(15,23,54,0.06)] sm:px-8 lg:px-12 lg:py-12">
          <div className="max-w-[760px]">
            <span aria-hidden="true" className="mb-4 block h-px w-12 bg-[#D6C48A]" />
            <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-black leading-tight text-[#161851]">{title}</h1>
            <div className="mt-5 space-y-4 text-[1rem] font-medium leading-8 text-[#0F1736]/84">{children}</div>
            <Link
              className="mt-8 inline-flex items-center text-sm font-black text-[#161851] underline decoration-[#D6C48A] decoration-2 underline-offset-4 transition-opacity hover:opacity-80"
              href={`/${lang}`}
            >
              {backLabel}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
