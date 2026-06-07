export const languages = ["nl", "en"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export const languageStorageKey = "philoo-language";

export const CALENDLY_URL = "https://calendly.com/syb-philoo/30min";

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}
