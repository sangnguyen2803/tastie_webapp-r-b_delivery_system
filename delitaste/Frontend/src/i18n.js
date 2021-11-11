import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { resources } from "languages/resources";

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    whitelist: ["fr", "en", "vi"],
    fallbackLng: "fr",
    defaultNS: "common",

    detection: {
      lookupFromPathIndex: 0,
      checkWhitelist: true,
    },

    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
