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

export function LanguageToggle({ iconOnly = false }: LanguageToggleProps) {
  const { language, setLanguage, t } = useTranslation()

  // Keep the actual language code for proper comparison
  const currentLang = language || 'en-US'

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
            <span>
              {code === 'fa-IR' && 'فارسی'}
              {code === 'en-US' && t('common.english')}
              {code === 'zh-CN' && t('common.chinese')}
              {code === 'zh-TW' && t('common.traditionalChinese')}
              {code === 'pt-BR' && t('common.portuguese')}
              {code === 'ja-JP' && t('common.japanese')}
              {code === 'it-IT' && 'Italiano'}
              {code === 'fr-FR' && t('common.french')}
              {code === 'ru-RU' && t('common.russian')}
              {code === 'bn-IN' && t('common.bengali')}
              {code === 'es-ES' && t('common.spanish')}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
