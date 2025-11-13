import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import en from "./locales/en.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
    },
    fallbackLng: "en",
    debug: import.meta.env.MODE === "development" ? true : false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
