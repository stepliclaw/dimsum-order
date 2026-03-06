'use client'

import type { CategoryDefinition, Order } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from 'next/navigation'

interface MobileSidebarNavProps {
  categories: CategoryDefinition[]
  selectedCategory: string | null
  activeCategory: string | null
  orders: Order[]
  onCategorySelect: (categoryId: string | null) => void
}

export function MobileSidebarNav({
  categories,
  selectedCategory,
  activeCategory,
  orders,
  onCategorySelect,
}: MobileSidebarNavProps) {
  const { language } = useAppTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order)

  const getDisplayChar = (text: string, isAll?: boolean): string => {
    if (isAll) {
      return language === 'zh' ? '全' : 'A'
    }
    return language === 'zh' ? text.charAt(0) : text.charAt(0)
  }

  return (
    <div className="md:hidden fixed left-0 top-16 bottom-0 z-40 w-[20%] min-w-[60px] bg-background border-r overflow-y-auto scroll-momentum">
      <div className="py-4 space-y-2 px-1">
        {/* All Items Option */}
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            'w-full aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-colors min-touch-target',
            selectedCategory === null
              ? 'bg-primary text-primary-foreground'
              : activeCategory === null
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
          )}
          aria-label={language === 'zh' ? '全部點心' : 'All Items'}
        >
          <span className={cn("text-sm", language === 'zh' ? 'text-lg' : 'font-bold')}>
            {language === 'zh' ? '全' : 'A'}
          </span>
        </button>

        {/* Category Options */}
        {sortedCategories.map((category) => {
          const name = language === 'zh' ? category.name.zh : category.name.en
          const displayName = language === 'zh' ? name.charAt(0) : name

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                'w-full aspect-square rounded-lg flex items-center justify-center transition-colors min-touch-target p-0.5',
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : activeCategory === category.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
              )}
              aria-label={name}
              title={name}
            >
              <span className={cn(
                "text-center leading-tight",
                language === 'zh' ? 'text-lg font-semibold' : 'text-[10px] font-medium'
              )}>
                {displayName}
              </span>
            </button>
          )
        })}

        {/* Order History Button - only shown when orders exist */}
        {orders.length > 0 && (
          <>
            <div className="border-t my-2" />
            <button
              onClick={() => router.push('/orders')}
              className={cn(
                'w-full aspect-square rounded-lg flex items-center justify-center transition-colors min-touch-target',
                pathname === '/orders'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
              )}
              aria-label={language === 'zh' ? '落單紀錄' : 'Order History'}
              title={language === 'zh' ? '落單紀錄' : 'Order History'}
            >
              <span className="text-lg">📋</span>
            </button>
          </>
        )}
      </div>
    </div>
  )
}
