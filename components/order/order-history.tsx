'use client'

import type { Order } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { formatOrderDate } from '@/lib/utils'

interface OrderHistoryProps {
  orders: Order[]
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const { language } = useAppTranslation()

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )

  return (
    <div className="space-y-4 px-4 pb-24">
      {sortedOrders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            {/* Order Header */}
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base">
                  {order.id}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(order.submittedAt).toLocaleString(
                    language === 'zh' ? 'zh-HK' : 'en-US',
                    { 
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    }
                  )}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="border-b py-3 mb-3">
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.itemId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {language === 'zh' ? item.name.zh : item.name.en}
                    </span>
                    <span className="text-foreground">
                      x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
