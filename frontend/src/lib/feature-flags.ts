const isBrowser = typeof window !== 'undefined'

function readBoolean(value: string | null | undefined): boolean | null {
  if (!value) return null
  const normalized = value.trim().toLowerCase()
  if (['1', 'true', 'on', 'yes', 'enabled'].includes(normalized)) return true
  if (['0', 'false', 'off', 'no', 'disabled'].includes(normalized)) return false
  return null
}

export function isFaLocaleFeatureEnabled(): boolean {
  const envValue = readBoolean(process.env.NEXT_PUBLIC_FEATURE_FA_LOCALE_ENABLED)

  if (envValue !== null) return envValue

  if (!isBrowser) return false

  return readBoolean(window.localStorage.getItem('feature.fa_locale_enabled')) ?? false
}
