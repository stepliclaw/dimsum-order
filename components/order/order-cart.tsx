'use client'

import type { CartItem, PricingTable } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'

interface OrderCartProps {
  items: CartItem[]
  pricing: PricingTable
  onCheckout: () => void
}

export function OrderCart({
  items,
  onCheckout,
}: OrderCartProps) {
  const { language } = useAppTranslation()

  // Calculate total item count
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Don't render if no items
  if (totalCount === 0) {
    return null
  }

  return (
    <div className="w-full bg-background border-t shadow-lg z-50">
      <div className="flex flex-col items-center justify-center p-3 gap-2">
        <span className="font-medium text-base">
          {language === 'zh' ? `已揀選 ${totalCount}` : `Selected ${totalCount}`}
        </span>
        <Button
          onClick={onCheckout}
          className="w-full h-12"
          size="default"
        >
          {language === 'zh' ? '確認下單' : 'Confirm Order'}
        </Button>
      </div>
    </div>
  )
}
