'use client'

import type { MenuItem, CategoryDefinition } from '@/lib/types'
import { MenuItemComponent } from './menu-item'
import { CategoryFilter } from './category-filter'
import { ResponsiveGrid } from '@/components/responsive/responsive-grid'

interface MenuGridProps {
  items: MenuItem[]
  categories: CategoryDefinition[]
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
  onAddToCart: (item: MenuItem) => void
}

export function MenuGrid({
  items,
  categories,
  selectedCategory,
  onCategorySelect,
  onAddToCart,
}: MenuGridProps) {
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory && item.available)
    : items.filter((item) => item.available)

  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onCategorySelect}
      />
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">No items available in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id}>
              <MenuItemComponent
                item={item}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
