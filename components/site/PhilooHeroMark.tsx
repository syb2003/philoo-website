import Image from "next/image";

export function PhilooHeroMark() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[430px]">
      <div className="absolute inset-[12%] rounded-full bg-[#7B61FF]/12 blur-3xl" />
      <svg className="absolute inset-0 h-full w-full text-[#9E90FF]" fill="none" viewBox="0 0 440 440">
        <ellipse cx="220" cy="220" rx="185" ry="105" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.3" transform="rotate(-16 220 220)" />
        <ellipse cx="220" cy="220" rx="158" ry="158" stroke="currentColor" strokeOpacity=".2" strokeWidth="1" transform="rotate(32 220 220)" />
        <ellipse cx="220" cy="220" rx="120" ry="198" stroke="currentColor" strokeOpacity=".18" strokeWidth="1" transform="rotate(50 220 220)" />
        <circle cx="75" cy="164" fill="currentColor" r="4" />
        <circle cx="330" cy="80" fill="currentColor" r="4" />
        <circle cx="365" cy="296" fill="currentColor" r="3.5" />
        <circle cx="138" cy="365" fill="currentColor" r="3.5" />
      </svg>
      <div className="absolute inset-[17%] grid place-items-center">
        <Image
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain drop-shadow-[0_24px_36px_rgba(80,55,255,0.24)]"
          height={1254}
          priority
          sizes="(max-width: 1023px) 130px, 240px"
          src="/philoo-logo.png"
          width={1254}
        />
      </div>
    </div>
  );
}
