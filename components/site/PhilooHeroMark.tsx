import Image from "next/image";

export function PhilooHeroMark() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[360px]">
      <div className="absolute inset-[26%] rounded-full bg-[#7B61FF]/7 blur-2xl" />
      <svg className="absolute inset-0 h-full w-full text-[#9E90FF]" fill="none" viewBox="0 0 440 440">
        <ellipse cx="220" cy="220" rx="178" ry="102" stroke="currentColor" strokeOpacity=".09" strokeWidth=".9" transform="rotate(-16 220 220)" />
        <ellipse cx="220" cy="220" rx="151" ry="151" stroke="currentColor" strokeOpacity=".045" strokeWidth=".8" transform="rotate(32 220 220)" />
        <circle cx="92" cy="168" fill="currentColor" fillOpacity=".22" r="2" />
        <circle cx="328" cy="100" fill="currentColor" fillOpacity=".2" r="2" />
      </svg>
      <div className="absolute inset-[26%] grid place-items-center">
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
          height={1254}
          priority
          sizes="(max-width: 1023px) 48px, 120px"
          src="/philoo-logo.png"
          width={1254}
        />
      </div>
    </div>
  );
}
