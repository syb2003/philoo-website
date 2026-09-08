"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ChartIcon, FileCheckIcon, ReceiptIcon, SlidersIcon } from "@/components/Icons";
import { PhilooLogo } from "@/components/site/PhilooLogo";
import { LogoutButton } from "@/components/cv-studio/LogoutButton";
import { cvStudioDemoConfig } from "@/lib/cv-studio/demo-display-config";

const navigation = [
  { href: "/cv-studio/dashboard", label: "Dashboard", icon: ChartIcon },
  { href: "/cv-studio/conversies", label: "Conversies", icon: FileCheckIcon },
  { href: "/cv-studio/templates", label: "Templates", icon: ReceiptIcon },
  { href: "/cv-studio/instellingen", label: "Instellingen", icon: SlidersIcon },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#091238]">
      <header className="sticky top-0 z-40 border-b border-[#E4E6EF] bg-white/95 backdrop-blur-xl">
        <div className="flex min-h-20 items-center justify-between gap-5 px-5 sm:px-8">
          <PhilooLogo />
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-[#DAD6FF] bg-[#F4F2FF] px-3 py-1.5 text-sm font-bold text-[#563DFF] sm:inline-flex">
              {cvStudioDemoConfig.companyName}
            </span>
            <details className="relative">
              <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-[#E0E2EC] bg-white px-3 text-sm font-bold text-[#192044] marker:content-none hover:bg-[#F8F8FC]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EDEAFF] text-xs text-[#563DFF]">{cvStudioDemoConfig.userInitial}</span>
                {cvStudioDemoConfig.userName}
                <span aria-hidden="true" className="text-[#7B8299]">⌄</span>
              </summary>
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#E1E3ED] bg-white p-2 shadow-[0_20px_55px_rgba(26,34,77,0.14)]">
                <p className="px-3 py-2 text-xs text-[#747C95]">{cvStudioDemoConfig.userEmail}</p>
                <LogoutButton className="min-h-10 w-full rounded-xl px-3 text-left text-sm font-bold text-[#20284C] hover:bg-[#F4F2FF]" />
              </div>
            </details>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[236px_minmax(0,1fr)]">
        <aside className="border-b border-[#E3E5EE] bg-white px-4 py-3 lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
          <nav aria-label="CV Studio navigatie" className="flex gap-2 overflow-x-auto lg:grid">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active = href === "/cv-studio/conversies" ? pathname.startsWith(href) : pathname === href;
              return (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3.5 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#563DFF] ${
                    active ? "bg-[#EEEBFF] text-[#4C34E8]" : "text-[#515A78] hover:bg-[#F6F7FB] hover:text-[#182044]"
                  }`}
                  href={href}
                  key={href}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-12">{children}</main>
      </div>
    </div>
  );
}
