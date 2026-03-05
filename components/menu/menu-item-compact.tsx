'use client'

import Image from 'next/image'
import type { MenuItem } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface MenuItemCompactProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemCompact({ item, onAddToCart }: MenuItemCompactProps) {
  const { t, language } = useAppTranslation()

  if (!item.available) {
    return (
      <div className="flex items-center gap-2 p-2 border rounded-md opacity-50">
        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded bg-muted">
          <Image
            src={`/images/menu/${item.photo}`}
            alt={language === 'zh' ? item.name.zh : item.name.en}
            fill
            className="object-cover grayscale"
            sizes="48px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-xs truncate">
            {language === 'zh' ? item.name.zh : item.name.en}
          </h3>
          <p className="text-muted-foreground text-[10px]">
            ${item.priceType === 'fixed' ? item.price : item.tier}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 p-2 border rounded-md hover:shadow-md transition-shadow">
      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded bg-muted">
        <Image
          src={`/images/menu/${item.photo}`}
          alt={language === 'zh' ? item.name.zh : item.name.en}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-xs truncate">
          {language === 'zh' ? item.name.zh : item.name.en}
        </h3>
        <div className="flex items-center justify-between mt-1">
          <span className="font-bold text-xs text-primary">
            ${item.priceType === 'fixed' ? item.price : item.tier}
          </span>
          <Button
            onClick={() => onAddToCart(item)}
            className="h-6 w-6 p-0 rounded-full flex-shrink-0"
            size="icon"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}
