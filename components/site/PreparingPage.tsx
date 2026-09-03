import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import type { Language } from "@/lib/i18n";

export function PreparingPage({ lang, name }: { lang: Language; name: string }) {
  const line = lang === "nl" ? "Deze pagina wordt voorbereid." : "This page is being prepared.";

  return (
    <div className="site-page flex min-h-svh flex-col">
      <SiteHeader lang={lang} />
      <main className="flex flex-1 items-center px-5 py-16 sm:px-8 lg:px-10">
        <section className="mx-auto w-full max-w-[1120px] rounded-[2rem] border border-[#E7E6F2] bg-white px-7 py-16 text-center shadow-[0_18px_50px_rgba(36,31,91,0.06)] sm:px-12 sm:py-24">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#684EFF]">Philoo</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#0B1239] sm:text-6xl">{name}</h1>
          <p className="mt-5 text-lg text-[#576080]">{line}</p>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
