'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { MenuItem, MenuConfig } from '@/lib/types'
import { loadMenuConfig } from '@/lib/menu-config'
import { useAppTranslation } from '@/app/i18n'
import { MenuLayout } from '@/components/menu/menu-layout'
import { OrderCart } from '@/components/order/order-cart'
import { LanguageToggle } from '@/components/language-toggle'
import { useOrderStore } from '@/lib/store'

export default function Home() {
  const router = useRouter()
  const { t, language, changeLanguage, ready } = useAppTranslation()
  const [menuConfig, setMenuConfig] = useState<MenuConfig | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const { currentItems, addItem, updateQuantity, removeItem, submitOrder } = useOrderStore()

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
    if (!menuConfig) return

    const order = submitOrder(menuConfig.pricing)
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
      <div className="container mx-auto px-4 py-6 pb-48">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t('老友茶居')}</h1>
            <p className="text-muted-foreground text-sm">{t('傳統的香港味道')}</p>
          </div>
          <LanguageToggle currentLanguage={language} onToggle={changeLanguage} />
        </header>

        <MenuLayout
          items={menuConfig.items}
          categories={menuConfig.categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <OrderCart
            items={currentItems}
            menuItems={menuConfig.items}
            pricing={menuConfig.pricing}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </main>
  )
}
