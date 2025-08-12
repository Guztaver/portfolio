import { useCallback } from "react";
import { Language, UseTranslationReturn } from "../types";
import { translations } from "../data/translations";

export const useTranslation = (
  currentLanguage: Language,
  onLanguageChange: (lang: Language) => void,
): UseTranslationReturn => {
  const t = useCallback(
    (key: string, params?: Record<string, string>): string => {
      const keys = key.split(".");
      let value: unknown = translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      if (typeof value !== "string") {
        console.warn(`Translation value is not a string: ${key}`);
        return key;
      }

      // Replace parameters if provided
      if (params) {
        return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
          return str.replace(new RegExp(`{${paramKey}}`, "g"), paramValue);
        }, value);
      }

      return value;
    },
    [currentLanguage],
  );

  const changeLanguage = useCallback(
    (language: Language) => {
      onLanguageChange(language);
    },
    [onLanguageChange],
  );

  return {
    t,
    currentLanguage,
    changeLanguage,
    translations,
  };
};
