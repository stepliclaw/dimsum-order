'use client'

import type { CategoryDefinition } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'

interface SidebarFilterProps {
  categories: CategoryDefinition[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export function SidebarFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: SidebarFilterProps) {
  const { t, language } = useAppTranslation()

  const sortedCategories = [...categories].sort(
    (a, b) => a.order - b.order
  )

  return (
    <aside className="w-16 flex-shrink-0 sticky top-6">
      <nav className="space-y-1">
        {sortedCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'ghost'}
            onClick={() => onSelectCategory(category.id)}
            className="w-full justify-start h-8 text-xs px-2 whitespace-nowrap"
            title={language === 'zh' ? category.name.zh : category.name.en}
          >
            {language === 'zh' ? category.name.zh : category.name.en}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
