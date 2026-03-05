'use client'

import Image from 'next/image'
import type { MenuItem } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface MenuItemProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemComponent({ item, onAddToCart }: MenuItemProps) {
  const { t, language } = useAppTranslation()

  if (!item.available) {
    return (
      <Card className="opacity-60">
        <CardContent className="p-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={`/images/menu/${item.photo}`}
              alt={language === 'zh' ? item.name.zh : item.name.en}
              fill
              className="object-cover grayscale"
            />
          </div>
          <div className="mt-3">
            <h3 className="font-semibold text-lg">
              {language === 'zh' ? item.name.zh : item.name.en}
            </h3>
            <Button disabled className="w-full mt-3 h-12 text-base">
              {t('menu.unavailable')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={`/images/menu/${item.photo}`}
            alt={language === 'zh' ? item.name.zh : item.name.en}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-lg">
            {language === 'zh' ? item.name.zh : item.name.en}
          </h3>
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold text-lg text-primary">
              ${item.priceType === 'fixed' ? item.price : item.tier}
            </span>
            <Button
              onClick={() => onAddToCart(item)}
              className="h-12 px-6 text-base"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              {t('menu.addToOrder')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
