"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { trackEvent } from "@/components/site/Analytics";
import { getFirstTouchAttribution } from "@/lib/attribution";
import styles from "@/components/scout/scout.module.css";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ScoutUpdatesForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const started = useRef(false);

  function trackStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("scout_updates_click", { language: "nl", sourceCategory: "scout:home-updates" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    trackStart();
    const data = new FormData(event.currentTarget);
    const firstTouch = getFirstTouchAttribution();
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
          interest_type: "scout_updates",
          language: "nl",
          page_path: window.location.pathname,
          referrer: firstTouch.initial_referrer,
          attribution: firstTouch,
        }),
      });

      if (!response.ok) throw new Error("Scout update request failed");
      setStatus("success");
      trackEvent("scout_updates_submit", { language: "nl", sourceCategory: "scout:home-updates" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p aria-live="polite" className={styles.updatesSuccess}>
        Je bent aangemeld. We houden je op de hoogte van Scout.
      </p>
    );
  }

  return (
    <form className={styles.updatesForm} onFocusCapture={trackStart} onSubmit={handleSubmit}>
      <UpdatesField disabled={status === "loading"} label="Naam" maxLength={120} name="name" />
      <UpdatesField disabled={status === "loading"} label="Zakelijk e-mailadres" maxLength={254} name="email" required type="email" />
      <UpdatesField disabled={status === "loading"} label="Bedrijf" maxLength={160} name="company" />

      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="scout-updates-website">Website</label>
        <input autoComplete="off" id="scout-updates-website" name="website" tabIndex={-1} type="text" />
      </div>

      <button disabled={status === "loading"} type="submit">
        {status === "loading" ? "Bezig…" : "Houd me op de hoogte"}
      </button>

      <p className={styles.updatesPrivacy}>
        We gebruiken je gegevens alleen om contact met je op te nemen over dit product.{" "}
        <Link href="/nl/privacybeleid">Privacybeleid</Link>
      </p>

      {status === "error" ? (
        <p aria-live="polite" className={styles.updatesError}>
          Aanmelden lukt nu niet. Controleer je e-mailadres en probeer het opnieuw.
        </p>
      ) : null}
    </form>
  );
}

function UpdatesField({
  disabled,
  label,
  maxLength,
  name,
  required = false,
  type = "text",
}: {
  disabled: boolean;
  label: string;
  maxLength: number;
  name: string;
  required?: boolean;
  type?: string;
}) {
  const id = `scout-updates-${name}`;
  return (
    <div className={styles.updatesField}>
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
      <input
        autoComplete={name === "email" ? "email" : name === "company" ? "organization" : "name"}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}
