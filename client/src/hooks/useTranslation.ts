import { useLocale } from "@/contexts/LocaleContext";
import { t as translate } from "@/lib/i18n";

export function useTranslation() {
  const { locale } = useLocale();

  const t = (key: string, params?: Record<string, string | number | boolean>): any => {
    return translate(key, locale, params);
  };

  return { t, locale };
}

