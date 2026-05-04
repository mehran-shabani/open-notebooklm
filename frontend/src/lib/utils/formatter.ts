const DEFAULT_LOCALE = 'en-US'

const LOCALE_MAP: Record<string, string> = {
  'fa-IR': 'fa-IR',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  'en-US': 'en-US',
  'pt-BR': 'pt-BR',
  'ja-JP': 'ja-JP',
  'fr-FR': 'fr-FR',
  'ru-RU': 'ru-RU',
  'bn-IN': 'bn-IN',
  'es-ES': 'es-ES',
  'it-IT': 'it-IT',
}

export type DigitPolicy = 'locale-native' | 'latin'

const DIGIT_POLICY_BY_LANGUAGE: Record<string, DigitPolicy> = {
  'fa-IR': 'locale-native',
}

function resolveLocale(language?: string) {
  return (language && LOCALE_MAP[language]) || DEFAULT_LOCALE
}

function localeWithDigitPolicy(locale: string, language?: string): string {
  const policy = (language && DIGIT_POLICY_BY_LANGUAGE[language]) || 'latin'
  return policy === 'locale-native' ? locale : `${locale}-u-nu-latn`
}

export function formatDateTime(value: string | Date | number, language?: string, options?: Intl.DateTimeFormatOptions) {
  const locale = resolveLocale(language)
  return new Intl.DateTimeFormat(localeWithDigitPolicy(locale, language), options).format(new Date(value))
}

export function formatDate(value: string | Date | number, language?: string, options?: Intl.DateTimeFormatOptions) {
  return formatDateTime(value, language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

export function formatNumber(value: number, language?: string, options?: Intl.NumberFormatOptions) {
  const locale = resolveLocale(language)
  return new Intl.NumberFormat(localeWithDigitPolicy(locale, language), options).format(value)
}

export function formatPercent(value: number, language?: string, options?: Intl.NumberFormatOptions) {
  return formatNumber(value, language, { style: 'percent', ...options })
}
