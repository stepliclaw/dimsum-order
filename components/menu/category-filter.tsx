"use client";

import type { CategoryDefinition } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Utensils } from "lucide-react";

interface CategoryFilterProps {
  categories: CategoryDefinition[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const { t, language } = useAppTranslation();

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // Map category IDs to badge variants
  const getCategoryVariant = (categoryId: string) => {
    const variantMap: Record<string, string> = {
      steamed: "steamed",
      fried: "fried",
      dessert: "dessert",
      sets: "other",
      rice: "noodle",
      noodle: "noodle",
    };
    return variantMap[categoryId] || "outline";
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className="flex-shrink-0 h-14 px-8 text-lg shadow-sm"
        size="lg"
      >
        <Utensils className="mr-2 h-7 w-7" />
        {t("menu.allCategories")}
      </Button>
      {sortedCategories.map((category) => {
        const isSelected = selectedCategory === category.id;
        const variant = getCategoryVariant(category.id);

        return (
          <Button
            key={category.id}
            variant={isSelected ? (variant as any) : "outline"}
            onClick={() => onSelectCategory(category.id)}
            className="flex-shrink-0 h-14 px-8 text-lg shadow-sm"
            size="lg"
          >
            {language === "zh" ? category.name.zh : category.name.en}
          </Button>
        );
      })}
    </div>
  );
}
