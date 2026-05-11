export const languages = ["nl", "en"] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = "en";

export const languageStorageKey = "philoo-language";

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}
