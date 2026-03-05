'use client'

import { useAppTranslation, type SupportedLanguage } from '@/app/i18n'
import { Button } from '@/components/ui/button'

interface LanguageToggleProps {
  currentLanguage: SupportedLanguage
  onToggle: (lang: SupportedLanguage) => void
}

export function LanguageToggle({ currentLanguage, onToggle }: LanguageToggleProps) {
  const { t } = useAppTranslation()

  return (
    <div className="flex gap-2">
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'outline'}
        onClick={() => onToggle('en')}
        className="h-10 px-4 text-sm"
      >
        EN
      </Button>
      <Button
        variant={currentLanguage === 'zh' ? 'default' : 'outline'}
        onClick={() => onToggle('zh')}
        className="h-10 px-4 text-sm"
      >
        中文
      </Button>
    </div>
  )
}
