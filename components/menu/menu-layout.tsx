'use client'

import type { MenuItem, CategoryDefinition } from '@/lib/types'
import { MenuItemCompact } from './menu-item-compact'
import { SidebarFilter } from './sidebar-filter'

interface MenuLayoutProps {
  items: MenuItem[]
  categories: CategoryDefinition[]
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
  onAddToCart: (item: MenuItem) => void
}

export function MenuLayout({
  items,
  categories,
  selectedCategory,
  onCategorySelect,
  onAddToCart,
}: MenuLayoutProps) {
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory && item.available)
    : items.filter((item) => item.available)

  return (
    <div className="flex gap-4">
      <SidebarFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onCategorySelect}
      />
      
      <div className="flex-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No items available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredItems.map((item) => (
              <MenuItemCompact
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
