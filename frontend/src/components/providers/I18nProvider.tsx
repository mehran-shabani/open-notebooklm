'use client'

import React, { useEffect, useState } from 'react'
import i18n from '@/lib/i18n'
import { LanguageLoadingOverlay } from '@/components/common/LanguageLoadingOverlay'

const RTL_LANGUAGES = new Set(['fa', 'fa-IR', 'ar', 'he', 'ur'])

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateDocumentDirection = (language: string) => {
      const baseLanguage = language.split('-')[0]
      const isRtl = RTL_LANGUAGES.has(language) || RTL_LANGUAGES.has(baseLanguage)
      document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
      document.documentElement.lang = language
    }

    updateDocumentDirection(i18n.resolvedLanguage || i18n.language || 'en-US')
    i18n.on('languageChanged', updateDocumentDirection)

    return () => {
      i18n.off('languageChanged', updateDocumentDirection)
    }
  }, [])

  // Avoid hydration mismatch by waiting for mount
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <>
      <LanguageLoadingOverlay />
      {children}
    </>
  )
}
