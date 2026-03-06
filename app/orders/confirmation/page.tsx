'use client'

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { useAppTranslation } from '@/app/i18n'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, ArrowLeft } from 'lucide-react'

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
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="h-9 w-9 p-0 min-w-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 pt-20">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8">
              {/* Order Placed Badge */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  <CheckCircle className="h-4 w-4" />
                  <span>{language === 'zh' ? '已下單' : 'Order Placed'}</span>
                </div>
              </div>

              {/* Order Info */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground text-sm mb-2">
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
                </p>
                <p className="font-bold text-lg">
                  {order.id}
                </p>
              </div>

              {/* Item List */}
              <div className="border-t border-b py-4 mb-6">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.itemId} className="flex justify-between items-center">
                      <span className="text-base">
                        {language === 'zh' ? item.name.zh : item.name.en}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/')}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {language === 'zh' ? '返回首頁' : 'Continue Shopping'}
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
