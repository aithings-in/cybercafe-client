import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

export type Locale = "en" | "hi";

export const locales: Locale[] = ["en", "hi"];
export const defaultLocale: Locale = "hi";

export const translations = {
  en,
  hi,
};

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] || translations[defaultLocale];
}

// Helper function to get nested translation (can return string, array, or object)
export function t(
  key: string,
  locale: Locale = defaultLocale,
  params?: Record<string, string | number>
): any {
  const translation = getTranslations(locale);
  const keys = key.split(".");
  let value: any = translation;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  // If value is a string and has params, replace them
  // Support both {{key}} and {key} formats
  if (typeof value === "string" && params) {
    return value
      .replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      })
      .replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
  }

  return value;
}

