import type { Language } from "@/lib/i18n";

const whatsappUrl = "https://wa.me/31647937111";

const labels = {
  nl: "Neem contact op via WhatsApp",
  en: "Contact Philoo on WhatsApp",
} as const;

export function WhatsAppButton({ lang }: { lang: Language }) {
  return (
    <a
      aria-label={labels[lang]}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(15,23,54,0.24)] transition hover:-translate-y-0.5 hover:bg-[#1FBF5C] focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-[#25D366] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      href={whatsappUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <svg
        aria-hidden="true"
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16.02 4.16c-6.48 0-11.76 5.23-11.76 11.66 0 2.2.62 4.33 1.8 6.18l-1.22 4.46 4.58-1.2a11.85 11.85 0 0 0 6.6 1.99h.01c6.48 0 11.76-5.23 11.76-11.66S22.51 4.16 16.02 4.16Zm0 21.1h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-2.72.71.73-2.64-.24-.38a9.61 9.61 0 0 1-1.48-5.11c0-5.28 4.34-9.58 9.68-9.58 2.58 0 5 1 6.82 2.81a9.52 9.52 0 0 1 2.83 6.77c0 5.28-4.34 9.58-9.68 9.58Z" />
        <path d="M21.35 18.46c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.67.15-.19.29-.76.96-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.04 2.83 1.19 3.02c.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.12-.26-.19-.55-.34Z" />
      </svg>
    </a>
  );
}
