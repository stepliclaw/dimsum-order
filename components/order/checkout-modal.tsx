'use client'

import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/store'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter()
  const { language } = useAppTranslation()
  const orders = useOrderStore((state) => state.orders)
  const clearOrders = useOrderStore((state) => state.clearOrders)

  // Calculate grand total
  const grandTotal = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  const handleStartOver = () => {
    clearOrders()
    router.push('/')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div 
        className="bg-background rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {language === 'zh' ? '歡迎光臨' : 'Welcome'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {language === 'zh' 
              ? '希望你有一次愉快的體驗' 
              : 'Hope you have a pleasant experience'}
          </p>
        </div>

        {/* Payment Instruction */}
        <div className="text-center mb-6 p-4 bg-muted rounded-lg">
          <p className="text-base font-medium">
            {language === 'zh' 
              ? '請前往收銀處付款' 
              : 'Please proceed to cashier for payment'}
          </p>
        </div>

        {/* Grand Total */}
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-1">
            {language === 'zh' ? '總數' : 'Grand Total'}
          </p>
          <p className="text-3xl font-bold text-primary">
            HKD ${grandTotal.toFixed(2)}
          </p>
        </div>

        {/* Start Over Button */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleStartOver}
            variant="outline"
            className="w-full h-12 text-base"
            size="lg"
          >
            {language === 'zh' ? '重新開始' : 'Start Over'}
          </Button>
        </div>
      </div>

      {/* Backdrop - click to close */}
      <div 
        className="fixed inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  )
}
