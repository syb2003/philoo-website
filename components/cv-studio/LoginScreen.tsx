"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ArrowRightIcon, CheckCircleIcon, FileCheckIcon } from "@/components/Icons";
import { PhilooLogo } from "@/components/site/PhilooLogo";

const steps = [
  { title: "Huisstijl", body: "Kies de actieve huisstijl." },
  { title: "Kandidaat-cv", body: "Upload een kandidaat-cv." },
  { title: "Eind-cv", body: "Download een professioneel opgemaakt cv." },
];

export function LoginScreen({ email }: { email: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/cv-studio/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.get("email"), password: formData.get("password") }),
    });

    if (response.ok) {
      router.replace("/cv-studio/conversies/nieuw");
      router.refresh();
      return;
    }

    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    setError(result?.error || "Inloggen is niet gelukt. Probeer het opnieuw.");
    setPending(false);
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] text-[#091238]">
      <header className="border-b border-[#E5E7F0] bg-white">
        <div className="mx-auto flex min-h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <PhilooLogo />
          <span className="rounded-full border border-[#DAD6FF] bg-[#F4F2FF] px-3 py-1.5 text-sm font-bold text-[#563DFF]">
            CV Studio
          </span>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1240px] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.72fr)] lg:items-center lg:py-14">
        <section className="max-w-[650px]">
          <p className="text-xs font-black tracking-[0.1em] text-[#563DFF]">PHILOO CV STUDIO</p>
          <h1 className="mt-4 max-w-[620px] text-[clamp(2.5rem,5vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.045em]">
            Van kandidaat-cv naar professioneel cv
          </h1>
          <p className="mt-5 max-w-[580px] text-[1.05rem] leading-8 text-[#56607E]">
            Snel een professioneel cv in de gekozen huisstijl.
          </p>

          <div className="mt-9 flex max-w-[590px] items-center gap-3 rounded-[1.6rem] border border-[#DFE2EF] bg-white p-4 shadow-[0_18px_46px_rgba(27,36,87,0.07)] sm:gap-5 sm:p-5">
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-[#F6F7FB] p-3.5">
              <FileCheckIcon className="h-6 w-6 shrink-0 text-[#53617F]" />
              <span className="text-sm font-bold text-[#273151]">Kandidaat-cv</span>
            </div>
            <ArrowRightIcon className="h-5 w-5 shrink-0 text-[#563DFF]" />
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-[#F0EEFF] p-3.5">
              <CheckCircleIcon className="h-6 w-6 shrink-0 text-[#563DFF]" />
              <span className="text-sm font-bold text-[#342292]">Eind-cv</span>
            </div>
          </div>

          <ol className="mt-9 grid gap-4 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li className="flex gap-3" key={step.title}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#EDEAFF] text-sm font-bold text-[#563DFF]">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-sm font-bold text-[#11183B]">{step.title}</h2>
                  <p className="mt-1 text-sm leading-5 text-[#66708C]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[1.75rem] border border-[#E0E2EC] bg-white p-6 shadow-[0_24px_70px_rgba(20,29,75,0.11)] sm:p-8" aria-labelledby="login-heading">
          <h2 className="text-3xl font-bold tracking-[-0.04em]" id="login-heading">Inloggen op CV Studio</h2>
          <p className="mt-2 text-base leading-7 text-[#626B87]">Log in om CV Studio te openen.</p>
          <form className="mt-7 space-y-5" method="post" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-bold text-[#20284C]" htmlFor="email">E-mailadres</label>
              <input autoComplete="username" className="mt-2 min-h-12 w-full rounded-xl border border-[#D9DCE8] bg-white px-4 text-base text-[#11183B] outline-none transition focus:border-[#765FFF] focus:ring-4 focus:ring-[#765FFF]/10" defaultValue={email} id="email" name="email" required type="email" />
            </div>
            <div>
              <label className="text-sm font-bold text-[#20284C]" htmlFor="password">Wachtwoord</label>
              <input autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-xl border border-[#D9DCE8] bg-white px-4 text-base text-[#11183B] outline-none transition focus:border-[#765FFF] focus:ring-4 focus:ring-[#765FFF]/10" id="password" name="password" required type="password" />
            </div>
            {error ? <p className="rounded-xl bg-[#FFF2F1] px-4 py-3 text-sm font-semibold text-[#A73B31]" role="alert">{error}</p> : null}
            <button className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#563DFF] px-5 text-base font-bold text-white shadow-[0_12px_28px_rgba(86,61,255,0.25)] transition hover:bg-[#4930E7] disabled:cursor-wait disabled:opacity-70" disabled={pending} type="submit">
              {pending ? "Inloggen..." : "Inloggen"}
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-5 text-center text-sm text-[#7A8299]">
            <p className="font-bold text-[#5B6481]">Tijdelijke demo-omgeving</p>
            <p className="mt-1">Deze omgeving is bedoeld om de CV Studio-flow te ervaren.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
