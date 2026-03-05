'use client'

import type { CategoryDefinition } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'

interface CategoryFilterProps {
  categories: CategoryDefinition[]
  selectedCategory: string | null
  onSelectCategory: (categoryId: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { t, language } = useAppTranslation()

  const sortedCategories = [...categories].sort(
    (a, b) => a.order - b.order
  )

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        onClick={() => onSelectCategory(null)}
        className="flex-shrink-0 h-12 px-6 text-base"
        size="lg"
      >
        {t('menu.allCategories')}
      </Button>
      {sortedCategories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category.id)}
          className="flex-shrink-0 h-12 px-6 text-base"
          size="lg"
        >
          {language === 'zh' ? category.name.zh : category.name.en}
        </Button>
      ))}
    </div>
  )
}
