'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { CategoryDefinition } from '@/lib/types'
import { useAppTranslation } from '@/app/i18n'
import { Button } from '@/components/ui/button'

interface MobileCategoryNavProps {
  categories: CategoryDefinition[]
  selectedCategory: string | null
  onCategorySelect: (categoryId: string | null) => void
}

export function MobileCategoryNav({
  categories,
  selectedCategory,
  onCategorySelect,
}: MobileCategoryNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useAppTranslation()

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order)

  const handleSelect = (categoryId: string | null) => {
    onCategorySelect(categoryId)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <div className="sticky top-0 z-50 bg-background border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="gap-2 min-touch-target"
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">
              {language === 'zh' ? '分類' : 'Categories'}
            </span>
          </Button>
          <span className="text-sm text-muted-foreground">
            {sortedCategories.length} {language === 'zh' ? '個分類' : 'categories'}
          </span>
        </div>
      </div>

      {/* Mobile Category Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-[73px] left-0 right-0 z-50 bg-background border-b shadow-lg max-h-[70vh] overflow-y-auto scroll-momentum">
            <div className="p-4 space-y-2">
              {/* All Items Option */}
              <button
                onClick={() => handleSelect(null)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors min-touch-target flex items-center justify-between ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                <span className="font-medium">
                  {language === 'zh' ? '全部點心' : 'All Items'}
                </span>
                {selectedCategory === null && (
                  <span className="text-sm">✓</span>
                )}
              </button>

              {/* Category Options */}
              {sortedCategories.map((category) => {
                const name = language === 'zh' ? category.name.zh : category.name.en
                const isSelected = selectedCategory === category.id

                return (
                  <button
                    key={category.id}
                    onClick={() => handleSelect(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors min-touch-target flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <span className="font-medium">{name}</span>
                    {isSelected && <span className="text-sm">✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
