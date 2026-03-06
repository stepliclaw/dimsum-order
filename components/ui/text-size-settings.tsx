'use client'

import { useTextSizeStore, type TextSize } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { useAppTranslation } from '@/app/i18n'

export function TextSizeSettings() {
  const { textSize, setTextSize, resetToDefault } = useTextSizeStore()
  const { language } = useAppTranslation()

  const sizes: { value: TextSize; label: string; labelZh: string }[] = [
    { value: 'small', label: 'S', labelZh: '細' },
    { value: 'medium', label: 'M', labelZh: '中' },
    { value: 'large', label: 'L', labelZh: '大' },
  ]

  const cycleTextSize = () => {
    const currentIndex = sizes.findIndex(s => s.value === textSize)
    const nextIndex = (currentIndex + 1) % sizes.length
    setTextSize(sizes[nextIndex].value)
  }

  const currentSize = sizes.find(s => s.value === textSize)
  const displayLabel = language === 'zh' ? currentSize?.labelZh : currentSize?.label

  return (
    <Button
      variant="outline"
      onClick={cycleTextSize}
      aria-label={`Text size: ${displayLabel}. Tap to cycle`}
      className="h-9 px-3 text-xs min-w-[44px] gap-1 font-semibold"
      title={language === 'zh' ? '點擊切換文字大小' : 'Tap to change text size'}
    >
      <span>{displayLabel}</span>
    </Button>
  )
}
