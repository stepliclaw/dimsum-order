'use client'

import type { MenuItem, CartItem, PricingTable } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { calculateUnitPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface OrderCartProps {
  items: CartItem[]
  menuItems: MenuItem[]
  pricing: PricingTable
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onCheckout: () => void
}

export function OrderCart({
  items,
  menuItems,
  pricing,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: OrderCartProps) {
  const { t, language } = useAppTranslation()

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground text-base">{t('cart.empty')}</p>
        </CardContent>
      </Card>
    )
  }

  const total = items.reduce((sum, cartItem) => {
    const menuItem = menuItems.find((item) => item.id === cartItem.itemId)
    if (!menuItem) return sum
    
    const unitPrice = calculateUnitPrice(menuItem, pricing)
    return sum + unitPrice * cartItem.quantity
  }, 0)

  return (
    <Card className="sticky bottom-0 z-50">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-xl">{t('cart.title')}</h3>
        
        <div className="space-y-3">
          {items.map((cartItem) => {
            const menuItem = menuItems.find((item) => item.id === cartItem.itemId)
            if (!menuItem) return null

            const unitPrice = calculateUnitPrice(menuItem, pricing)

            return (
              <div key={cartItem.itemId} className="flex items-center justify-between border-b pb-3">
                <div className="flex-1">
                  <p className="font-medium">
                    {language === 'zh' ? menuItem.name.zh : menuItem.name.en}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ${unitPrice} × {cartItem.quantity} = ${unitPrice * cartItem.quantity}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(cartItem.itemId, cartItem.quantity - 1)}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(cartItem.itemId, cartItem.quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onRemoveItem(cartItem.itemId)}
                    className="h-10 w-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="font-bold text-xl">{t('cart.total')}:</span>
          <span className="font-bold text-2xl text-primary">${total}</span>
        </div>

        <Button onClick={onCheckout} className="w-full h-14 text-lg" size="lg">
          {t('cart.checkout')}
        </Button>
      </CardContent>
    </Card>
  )
}
