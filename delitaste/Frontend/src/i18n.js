//i18next
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpAPI from "i18next-http-backend";

//locales
import { common_en } from "locale/en/common_en";
import { common_fr } from "locale/fr/common_fr";
import { common_vi } from "locale/vi/common_vi";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpAPI)
  .init({
    resources: {
      en: common_en,
      fr: common_fr,
      vi: common_vi,
    },
    whitelist: ["fr", "en", "vi"],
    fallbackLng: "en",
    defaultNS: "common",

    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },

    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: false },
  });

export default i18n;
