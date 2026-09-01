import Image from "next/image";
import type { ComponentProps } from "react";

type PhilooMarkProps = Omit<ComponentProps<typeof Image>, "alt" | "height" | "src" | "width">;

export function PhilooMark({ className = "", ...props }: PhilooMarkProps) {
  return (
    <Image
      aria-hidden="true"
      alt=""
      className={className}
      height={1254}
      src="/philoo-logo.png"
      width={1254}
      {...props}
    />
  );
}
