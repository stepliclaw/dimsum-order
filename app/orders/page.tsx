'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { useAppTranslation } from '@/app/i18n'
import { OrderHistory } from '@/components/order/order-history'
import { CheckoutModal } from '@/components/order/checkout-modal'
import { Button } from '@/components/ui/button'
import { TextSizeSettings } from '@/components/ui/text-size-settings'
import { ArrowLeft } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()
  const { language } = useAppTranslation()
  const orders = useOrderStore((state) => state.orders)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="h-9 w-9 p-0 min-w-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-xl font-bold line-clamp-1">
                {language === 'zh' ? '落單紀錄' : 'Order History'}
              </h1>
            </div>
            <div className="shrink-0">
              <TextSizeSettings />
            </div>
          </div>
        </div>
      </header>

      {/* Content with padding for fixed header and bottom grand total */}
      <div className="pt-16 pb-24">

        {orders.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="mb-6">
              <svg className="w-20 h-20 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-muted-foreground text-lg mb-2">
              {language === 'zh' ? '暫無訂單記錄' : 'No orders yet'}
            </p>
            <Button onClick={() => router.push('/')} className="mt-4 h-12 px-6 text-base">
              {language === 'zh' ? '返回首頁' : 'Return to Home'}
            </Button>
          </div>
        ) : (
          <OrderHistory orders={orders} />
        )}
      </div>

      {/* Checkout Button - Fixed Bottom */}
      {orders.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-40">
          <div className="container mx-auto">
            <Button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full h-12 text-base"
              size="lg"
            >
              {language === 'zh' ? '結帳' : 'Check Out'}
            </Button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </main>
  )
}
