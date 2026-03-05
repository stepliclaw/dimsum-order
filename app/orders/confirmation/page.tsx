'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { useAppTranslation } from '@/app/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t, language } = useAppTranslation()
  const orders = useOrderStore((state) => state.orders)
  
  const orderId = searchParams.get('orderId')
  const order = orders.find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Order not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
              
              <h1 className="text-3xl font-bold mb-2">
                {t('orders.confirmation.title')}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-6">
                {t('orders.confirmation.thankYou')}
              </p>

              <div className="bg-muted rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {t('orders.confirmation.orderNumber')}
                </p>
                <p className="text-2xl font-bold font-mono">{order.id}</p>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t('orders.total')}</span>
                    <span className="text-2xl font-bold text-primary">${order.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/orders')}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {t('orders.confirmation.viewOrders')}
                </Button>
                
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {t('menu.title')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}
