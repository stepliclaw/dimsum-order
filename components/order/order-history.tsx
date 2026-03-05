'use client'

import type { Order } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatOrderDate } from '@/lib/utils'

interface OrderHistoryProps {
  orders: Order[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const { t, language } = useAppTranslation()

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">
                    {t('orders.orderNumber')}: {order.id}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {formatOrderDate(order.submittedAt, language)}
                  </span>
                </div>
                
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    {order.items.length} {t('orders.items')}
                  </p>
                  <p className="font-bold text-xl text-primary mt-1">
                    {t('orders.total')}: ${order.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
