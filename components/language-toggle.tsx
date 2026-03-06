'use client'

import { useAppTranslation, type SupportedLanguage } from '@/app/i18n'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

interface LanguageToggleProps {
  currentLanguage: SupportedLanguage
  onToggle: (lang: SupportedLanguage) => void
}

export function LanguageToggle({ currentLanguage, onToggle }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      onClick={() => onToggle(currentLanguage === 'en' ? 'zh' : 'en')}
      className="h-9 px-3 text-xs min-w-[44px] gap-1"
    >
      <Languages className="h-3.5 w-3.5" />
      <span>{currentLanguage === 'en' ? '中' : 'EN'}</span>
    </Button>
  )
}
