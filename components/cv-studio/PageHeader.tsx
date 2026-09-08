import type { ReactNode } from "react";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-[720px]">
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.045em] text-[#091238]">{title}</h1>
        {description ? <p className="mt-3 text-base leading-7 text-[#5B6481]">{description}</p> : null}
      </div>
      {action}
    </header>
  );
}
