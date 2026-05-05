import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { namespaces, resources } from './locales'
import { isFaLocaleFeatureEnabled } from './feature-flags'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    lng: isFaLocaleFeatureEnabled() ? 'fa-IR' : 'en-US',
    supportedLngs: isFaLocaleFeatureEnabled() ? ['fa-IR', 'en-US'] : ['en-US'],
    ns: namespaces,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
