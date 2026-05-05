'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Languages } from 'lucide-react'
import { useTranslation } from '@/lib/hooks/use-translation'
import { languages, type LanguageCode } from '@/lib/locales'

interface LanguageToggleProps {
  iconOnly?: boolean
}

const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  'fa-IR': 'فارسی',
  'en-US': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'pt-BR': 'Português',
  'ja-JP': '日本語',
  'it-IT': 'Italiano',
  'fr-FR': 'Français',
  'ru-RU': 'Русский',
  'bn-IN': 'বাংলা',
  'es-ES': 'Español',
}

export function LanguageToggle({ iconOnly = false }: LanguageToggleProps) {
  const { language, setLanguage, t } = useTranslation()

  // Keep the actual language code for proper comparison
  const currentLang = language || 'en-US'
  const faEnabled = isFaLocaleFeatureEnabled()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={iconOnly ? 'ghost' : 'outline'}
          size={iconOnly ? 'icon' : 'default'}
          className={iconOnly ? 'h-9 w-full sidebar-menu-item' : 'w-full justify-start gap-2 sidebar-menu-item'}
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          {!iconOnly && <span>{t('common.language')}</span>}
          <span className="sr-only">{t('navigation.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(({ code }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code)}
            className={currentLang === code || currentLang.startsWith(code.split('-')[0]) ? 'bg-accent' : ''}
          >
            <span>{LANGUAGE_LABELS[code]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
