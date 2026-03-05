"use client";

import type { CategoryDefinition } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";

interface SidebarNavProps {
  categories: CategoryDefinition[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function SidebarNav({
  categories,
  selectedCategory,
  onSelectCategory,
}: SidebarNavProps) {
  const { language } = useAppTranslation();

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <aside className="w-20 flex-shrink-0">
      <div className="sticky top-6 space-y-2">
        <Button
          variant={selectedCategory === null ? "default" : "ghost"}
          onClick={() => onSelectCategory(null)}
          className="w-full h-auto py-2 text-xs px-1 flex-col gap-1"
        >
          <span className="font-medium">
            {language === "zh" ? "全部" : "All"}
          </span>
        </Button>

        {sortedCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            onClick={() => onSelectCategory(category.id)}
            className="w-full h-auto py-2 text-xs px-1 flex-col gap-1"
          >
            <span className="font-medium">
              {language === "zh" ? category.name.zh : category.name.en}
            </span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
