'use client'

import React, { useEffect, useState } from 'react'
import '@/lib/i18n'
import { LanguageLoadingOverlay } from '@/components/common/LanguageLoadingOverlay'
import i18n from '@/lib/i18n'
import { isFaLocaleFeatureEnabled } from '@/lib/feature-flags'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const applyLocaleDirection = (language: string) => {
      const isRtl = isFaLocaleFeatureEnabled() && language.toLowerCase().startsWith('fa')
      document.documentElement.setAttribute('lang', language)
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr')
    }

    applyLocaleDirection(i18n.language || 'en-US')
    i18n.on('languageChanged', applyLocaleDirection)

    return () => {
      i18n.off('languageChanged', applyLocaleDirection)
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
