import Image from "next/image";

export function PhilooHeroMark() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[330px]">
      <div className="absolute inset-[21%] rounded-full bg-[#7B61FF]/10 blur-2xl" />
      <svg className="absolute inset-0 h-full w-full text-[#9E90FF]" fill="none" viewBox="0 0 440 440">
        <ellipse cx="220" cy="220" rx="178" ry="102" stroke="currentColor" strokeOpacity=".24" strokeWidth="1.1" transform="rotate(-16 220 220)" />
        <ellipse cx="220" cy="220" rx="151" ry="151" stroke="currentColor" strokeOpacity=".13" strokeWidth="1" transform="rotate(32 220 220)" />
        <circle cx="92" cy="168" fill="currentColor" fillOpacity=".68" r="3.5" />
        <circle cx="328" cy="100" fill="currentColor" fillOpacity=".68" r="3.5" />
        <circle cx="350" cy="284" fill="currentColor" fillOpacity=".58" r="3" />
      </svg>
      <div className="absolute inset-[24%] grid place-items-center">
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain drop-shadow-[0_18px_28px_rgba(80,55,255,0.18)]"
          height={1254}
          priority
          sizes="(max-width: 1023px) 70px, 180px"
          src="/philoo-logo.png"
          width={1254}
        />
      </div>
    </div>
  );
}
