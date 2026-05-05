import { formatDistanceToNow } from 'date-fns'
import { getDateLocale } from '@/lib/utils/date-locale'

export type DigitPolicy = 'locale-default' | 'latin'

function getDigitPolicy(language: string): DigitPolicy {
  return language === 'fa-IR' ? 'locale-default' : 'latin'
}

function getNumberingSystem(policy: DigitPolicy): string | undefined {
  return policy === 'latin' ? 'latn' : undefined
}

function getLocale(language: string): string {
  return language || 'en-US'
}

export function formatRelativeTime(value: string | Date, language: string): string {
  return formatDistanceToNow(new Date(value), {
    addSuffix: true,
    locale: getDateLocale(language),
  })
}

export function formatDateTime(value: string | Date, language: string): string {
  const locale = getLocale(language)
  const numberingSystem = getNumberingSystem(getDigitPolicy(language))
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    numberingSystem,
  }).format(new Date(value))
}

export function formatDate(value: string | Date, language: string): string {
  const locale = getLocale(language)
  const numberingSystem = getNumberingSystem(getDigitPolicy(language))
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    numberingSystem,
  }).format(new Date(value))
}

export function formatNumber(value: number, language: string, options?: Intl.NumberFormatOptions): string {
  const locale = getLocale(language)
  const numberingSystem = getNumberingSystem(getDigitPolicy(language))
  return new Intl.NumberFormat(locale, { numberingSystem, ...options }).format(value)
}

export function formatPercent(value: number, language: string, digits = 1): string {
  return formatNumber(value / 100, language, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}
