"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function GuideEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(utmKeys.map((key) => [key, searchParams.get(key) ?? ""]));

    setStatus("loading");

    try {
      const response = await fetch("/api/guide-lead", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          website: formData.get("website") ?? "",
          page: {
            referrer: document.referrer,
          },
          attribution,
        }),
      });

      if (!response.ok) {
        throw new Error("Guide request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-[12px] bg-[#F7F8FA] p-4 sm:p-5">
      {status === "success" ? (
        <p aria-live="polite" className="font-extrabold leading-7 text-[#161851]">
          Gelukt. De gids komt zo je kant op.
        </p>
      ) : (
        <>
          <p className="text-sm font-medium leading-6 text-[#0F1736]/78 sm:text-base">
            Wil je hem liever in de mailbox? Laat hier je e-mailadres achter.
          </p>

          <form className="mt-4 flex flex-col gap-3 xl:flex-row" onSubmit={handleSubmit}>
            <div className="min-w-0 flex-1">
              <label className="sr-only" htmlFor="guide-email">
                E-mailadres
              </label>
              <input
                autoComplete="email"
                className="min-h-12 w-full rounded-[10px] border border-[#D5D9E3] bg-white px-4 text-base text-[#0F1736] outline-none transition-colors placeholder:text-[#0F1736]/42 focus:border-[#161851] focus:ring-2 focus:ring-[#D6C48A]/45 disabled:cursor-not-allowed disabled:bg-[#EDEFF3]"
                disabled={status === "loading"}
                id="guide-email"
                inputMode="email"
                maxLength={254}
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="jij@bedrijf.nl"
                required
                type="email"
                value={email}
              />
            </div>

            <div className="sr-only" aria-hidden="true">
              <label htmlFor="guide-website">Website</label>
              <input autoComplete="off" id="guide-website" name="website" tabIndex={-1} type="text" />
            </div>

            <button
              className="min-h-12 w-full shrink-0 rounded-[10px] border border-[#161851] bg-white px-5 text-sm font-extrabold text-[#161851] transition-colors hover:bg-[#161851] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D6C48A] focus:ring-offset-2 focus:ring-offset-[#F7F8FA] disabled:cursor-not-allowed disabled:border-[#161851]/35 disabled:text-[#161851]/50 xl:w-[176px]"
              disabled={status === "loading"}
              type="submit"
            >
              {status === "loading" ? "Bezig met versturen…" : "Stuur mij de gids"}
            </button>
          </form>

          <div aria-live="polite">
            {status === "error" ? (
              <p className="mt-3 text-sm font-semibold leading-6 text-[#8A2633]">
                Dat ging niet goed. Probeer het opnieuw of download de gids direct.
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
