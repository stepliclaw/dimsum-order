'use client'

import { useTextSizeStore, type TextSize } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function TextSizeToggle() {
  const { textSize, setTextSize, resetToDefault } = useTextSizeStore()

  const sizes: { value: TextSize; label: string }[] = [
    { value: 'small', label: 'S' },
    { value: 'medium', label: 'M' },
    { value: 'large', label: 'L' },
  ]

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <Button
          key={size.value}
          variant={textSize === size.value ? 'default' : 'outline'}
          onClick={() => setTextSize(size.value)}
          className="h-10 w-10 p-0"
          aria-label={`Set text size to ${size.label}`}
          aria-pressed={textSize === size.value}
        >
          {textSize === size.value && (
            <Check className="h-4 w-4" />
          )}
          {textSize !== size.value && size.label}
        </Button>
      ))}
    </div>
  )
}
