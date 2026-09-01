import Link from "next/link";
import { PhilooMark } from "@/components/site/PhilooMark";

export function PhilooLogo({ href = "/" }: { href?: string }) {
  return (
    <Link aria-label="Philoo home" className="inline-flex items-center gap-2.5 text-[#0A1034]" href={href}>
      <PhilooMark className="h-9 w-9 text-[#563DFF]" />
      <span className="text-[1.75rem] font-black leading-none tracking-[-0.075em]">philoo</span>
    </Link>
  );
}
