'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { MenuItem, MenuConfig } from '@/lib/types'
import { loadMenuConfig } from '@/lib/menu-config'
import { useAppTranslation } from '@/app/i18n'
import { MenuLayout } from '@/components/menu/menu-layout'
import { OrderCart } from '@/components/order/order-cart'
import { LanguageToggle } from '@/components/language-toggle'
import { TextSizeSettings } from '@/components/ui/text-size-settings'
import { useOrderStore } from '@/lib/store'

export default function Home() {
  const router = useRouter()
  const { t, language, changeLanguage, ready } = useAppTranslation()
  const [menuConfig, setMenuConfig] = useState<MenuConfig | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const { currentItems, addItem, updateQuantity, removeItem, submitOrder, orders } = useOrderStore()

  useEffect(() => {
    async function loadMenu() {
      try {
        const config = await loadMenuConfig()
        setMenuConfig(config)
      } catch (error) {
        console.error('Failed to load menu:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  const handleAddToCart = (item: MenuItem) => {
    addItem(item)
  }

  const handleCheckout = () => {
    if (!menuConfig) return;

    const order = submitOrder(menuConfig.pricing, menuConfig.items)
    router.push(`/orders/confirmation?orderId=${order.id}`)
  }

  if (loading || !ready || !menuConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base">{language === 'zh' ? '載入中...' : 'Loading...'}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-xl font-bold line-clamp-1">{t('老友茶居')}</h1>
              <p className="text-muted-foreground text-xs line-clamp-1">{t('傳統的香港味道')}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <TextSizeSettings />
              <LanguageToggle currentLanguage={language} onToggle={changeLanguage} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - with padding for fixed header and taller cart bar */}
      <div className="pt-16 pb-32">
        <div className="px-4">
          <MenuLayout
            items={menuConfig.items}
            categories={menuConfig.categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={updateQuantity}
            cartItems={currentItems}
            orders={orders}
          />
        </div>
      </div>

      {/* Fixed Bottom Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <OrderCart
          items={currentItems}
          pricing={menuConfig.pricing}
          onCheckout={handleCheckout}
        />
      </div>
    </main>
  )
}
