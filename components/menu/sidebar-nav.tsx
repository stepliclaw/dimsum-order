"use client";

import type { CategoryDefinition } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  categories: CategoryDefinition[];
  selectedCategory: string | null;
  activeCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function SidebarNav({
  categories,
  selectedCategory,
  activeCategory,
  onSelectCategory,
}: SidebarNavProps) {
  const { language } = useAppTranslation();

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-muted/30">
      <div className="sticky top-6 space-y-2 p-4">
        <Button
          variant={selectedCategory === null ? "default" : activeCategory === null ? "secondary" : "ghost"}
          onClick={() => onSelectCategory(null)}
          className={cn(
            "w-full h-auto py-3 text-sm px-3 flex-col gap-1 min-touch-target",
            selectedCategory === null && "font-bold"
          )}
        >
          <span className="font-medium">
            {language === "zh" ? "全部" : "All"}
          </span>
        </Button>

        {sortedCategories.map((category) => {
          const name = language === "zh" ? category.name.zh : category.name.en
          const isSelected = selectedCategory === category.id
          const isActive = activeCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : isActive ? "secondary" : "ghost"}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "w-full h-auto py-3 text-sm px-3 flex-col gap-1 min-touch-target",
                isSelected && "font-bold"
              )}
            >
              <span className="font-medium">{name}</span>
            </Button>
          )
        })}
      </div>
    </aside>
  );
}
