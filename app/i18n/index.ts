"use client";

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { useEffect, useState } from "react";
import { useOrderStore } from "@/lib/store";

const supportedLanguages = ["en", "zh"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`@/app/i18n/${language}.${namespace}.json`),
    ),
  )
  .init({
    supportedLngs: supportedLanguages,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "translation",
  });

export function useAppTranslation() {
  const storeLanguage = useOrderStore((state) => state.language);
  const setStoreLanguage = useOrderStore((state) => state.setLanguage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("dimsum-storage")
        : null;
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const lang = parsed.state?.language || "en";
        i18next.changeLanguage(lang).then(() => {
          setReady(true);
        });
        return;
      } catch (e) {
        // ignore
      }
    }

    i18next.changeLanguage("en").then(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    i18next.changeLanguage(storeLanguage);
  }, [storeLanguage]);

  const changeLanguage = (lang: SupportedLanguage) => {
    setStoreLanguage(lang);
  };

  return {
    t: i18next.t.bind(i18next),
    language: storeLanguage,
    changeLanguage,
    ready,
  };
}

export { i18next };
export default i18next;
