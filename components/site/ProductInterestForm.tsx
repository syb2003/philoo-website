"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { getFirstTouchAttribution } from "@/lib/attribution";
import { trackEvent, type AnalyticsEvent } from "@/components/site/Analytics";
import type { Language } from "@/lib/i18n";

type InterestType = "cvstudio_early_access" | "autosourcer_interest";
type FormStatus = "idle" | "loading" | "success" | "error";

type Copy = { name: string; email: string; company: string; submit: string; success: string; error: string; privacy: string; privacyLabel: string; loading: string };

const copy: Record<Language, Copy> = {
  nl: { name: "Naam", email: "Zakelijke e-mail", company: "Bedrijf", submit: "Meld je aan voor vroege toegang", success: "Bedankt. We nemen contact op zodra er plek is.", error: "Dat ging niet goed. Controleer je gegevens en probeer het opnieuw.", privacy: "We gebruiken je gegevens alleen om contact met je op te nemen over dit product.", privacyLabel: "Privacybeleid", loading: "Bezig…" },
  en: { name: "Name", email: "Business email", company: "Company", submit: "Join early access", success: "Thanks. We’ll get in touch when there is an opportunity to join.", error: "Something went wrong. Check your details and try again.", privacy: "We only use your details to contact you about this product.", privacyLabel: "Privacy Policy", loading: "Sending…" },
};

export function ProductInterestForm({ interestType, language, submitLabel, successMessage, successTitle, privacyText, clickEvent, submitEvent }: { interestType: InterestType; language: Language; submitLabel?: string; successMessage?: string; successTitle?: string; privacyText?: string; clickEvent: AnalyticsEvent; submitEvent: AnalyticsEvent }) {
  const words = copy[language];
  const [status, setStatus] = useState<FormStatus>("idle");
  const started = useRef(false);
  const privacyHref = language === "nl" ? "/nl/privacybeleid" : "/en/privacy-policy";

  function trackStart() {
    if (started.current) return;
    started.current = true;
    trackEvent(clickEvent, { language });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    trackStart();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");

    try {
      const response = await fetch("/api/product-interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name") ?? "",
          email: data.get("email") ?? "",
          company: data.get("company") ?? "",
          website: data.get("website") ?? "",
          interest_type: interestType,
          language,
          page_path: window.location.pathname,
          referrer: getFirstTouchAttribution().initial_referrer,
          attribution: getFirstTouchAttribution(),
        }),
      });

      if (!response.ok) throw new Error("Product interest request failed");
      setStatus("success");
      trackEvent(submitEvent, { language });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    if (!successTitle) {
      return <p aria-live="polite" className="rounded-xl border border-[#CFEFDB] bg-[#F3FFF8] px-5 py-4 text-base font-bold leading-7 text-[#176A45]">{successMessage ?? words.success}</p>;
    }

    return (
      <div aria-live="polite" className="mt-7 rounded-2xl border border-[#CFEFDB] bg-[#F3FFF8] px-5 py-5 text-[#176A45] sm:px-6">
        <h3 className="text-[1.15rem] font-black tracking-[-0.03em]">{successTitle}</h3>
        <p className="mt-2 text-[0.98rem] font-medium leading-7">{successMessage ?? words.success}</p>
      </div>
    );
  }

  return <form className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-start" onFocusCapture={trackStart} onSubmit={handleSubmit}>
    <Field label={words.name} maxLength={120} name="name" disabled={status === "loading"} />
    <Field label={words.email} maxLength={254} name="email" type="email" disabled={status === "loading"} />
    <Field label={words.company} maxLength={160} name="company" disabled={status === "loading"} />
    <div className="sr-only" aria-hidden="true"><label htmlFor={`${interestType}-website`}>Website</label><input autoComplete="off" id={`${interestType}-website`} name="website" tabIndex={-1} type="text" /></div>
    <button className="min-h-12 rounded-xl bg-[#563DFF] px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,.24)] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#563DFF] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1" disabled={status === "loading"} type="submit">{status === "loading" ? words.loading : submitLabel ?? words.submit}</button>
    <p className="text-xs leading-5 text-[#5B6381] sm:col-span-2 lg:col-span-4">{privacyText ?? words.privacy} <Link className="font-bold text-[#563DFF] underline underline-offset-2" href={privacyHref}>{words.privacyLabel}</Link></p>
    {status === "error" ? <p aria-live="polite" className="text-sm font-semibold text-[#9A3042] sm:col-span-2 lg:col-span-4">{words.error}</p> : null}
  </form>;
}

function Field({ label, name, type = "text", maxLength, disabled }: { label: string; name: string; type?: string; maxLength: number; disabled: boolean }) {
  const id = `interest-${name}`;
  return <div><label className="sr-only" htmlFor={id}>{label}</label><input autoComplete={name === "email" ? "email" : name === "company" ? "organization" : "name"} className="min-h-12 w-full rounded-xl border border-[#D9DDF0] bg-white px-4 text-base text-[#152049] outline-none transition-colors placeholder:text-[#78809B] focus:border-[#563DFF] focus:ring-2 focus:ring-[#DCD7FF] disabled:cursor-not-allowed disabled:bg-[#F4F4F8]" disabled={disabled} id={id} maxLength={maxLength} name={name} placeholder={label} required type={type} /></div>;
}
