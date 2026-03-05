'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { useAppTranslation } from '@/app/i18n'
import { OrderHistory } from '@/components/order/order-history'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()
  const { t, language } = useAppTranslation()
  const orders = useOrderStore((state) => state.orders)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <header className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="h-10 w-10 p-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{t('orders.title')}</h1>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t('orders.empty')}</p>
            <Button onClick={() => router.push('/')} className="mt-4 h-12 px-6 text-base">
              {t('menu.title')}
            </Button>
          </div>
        ) : (
          <OrderHistory orders={orders} />
        )}
      </div>
    </main>
  )
}
