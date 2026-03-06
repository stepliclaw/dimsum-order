"use client";

import type { CategoryDefinition, Order } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { Utensils, ClipboardList } from "lucide-react";

interface MobileSidebarNavProps {
  categories: CategoryDefinition[];
  selectedCategory: string | null;
  activeCategory: string | null;
  orders: Order[];
  onCategorySelect: (categoryId: string | null) => void;
}

export function MobileSidebarNav({
  categories,
  selectedCategory,
  activeCategory,
  orders,
  onCategorySelect,
}: MobileSidebarNavProps) {
  const { language } = useAppTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // Map category IDs to color classes
  const getCategoryColor = (categoryId: string, isSelected: boolean) => {
    if (!isSelected) return "bg-muted hover:bg-muted/80 text-foreground";

    const colorMap: Record<string, string> = {
      steamed: "bg-category-steamed text-white",
      "rice-rolls": "bg-category-rice-rolls text-white",
      buns: "bg-category-buns text-white",
      fried: "bg-category-fried text-white",
      noodle: "bg-category-noodle text-white",
      dessert: "bg-category-dessert text-white",
      other: "bg-category-other text-white",
    };
    return colorMap[categoryId] || "bg-primary text-primary-foreground";
  };

  return (
    <div className="md:hidden fixed left-0 top-16 bottom-0 z-40 w-[20%] min-w-[70px] bg-background border-r-2 overflow-y-auto scroll-momentum">
      <div className="py-5 space-y-3 px-2">
        {/* All Items Option */}
        <button
          onClick={() => onCategorySelect(null)}
          className={cn(
            "w-full aspect-square rounded-xl flex items-center justify-center font-bold transition-all min-touch-target shadow-sm",
            selectedCategory === null
              ? "bg-primary text-white"
              : activeCategory === null
                ? "bg-accent text-accent-foreground"
                : "bg-muted hover:bg-muted/80 text-foreground",
          )}
          aria-label={language === "zh" ? "全部點心" : "All Items"}
        >
          <Utensils
            className={cn(
              "h-8 w-8",
              selectedCategory === null || activeCategory === null
                ? "text-white"
                : "text-foreground",
            )}
          />
        </button>

        {/* Category Options */}
        {sortedCategories.map((category) => {
          const name = language === "zh" ? category.name.zh : category.name.en;
          const isSelected = selectedCategory === category.id;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                "w-full aspect-square rounded-xl flex items-center justify-center transition-all min-touch-target shadow-sm",
                isSelected
                  ? getCategoryColor(category.id, true)
                  : isActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground",
              )}
              aria-label={name}
              title={name}
            >
              <span
                className={cn(
                  "text-center font-bold leading-tight",
                  language === "zh" ? "text-2xl" : "text-base",
                )}
              >
                {language === "zh" ? name.charAt(0) : name.charAt(0)}
              </span>
            </button>
          );
        })}

        {/* Order History Button - only shown when orders exist */}
        {orders.length > 0 && (
          <>
            <div className="border-t-2 my-3" />
            <button
              onClick={() => router.push("/orders")}
              className={cn(
                "w-full aspect-square rounded-xl flex items-center justify-center transition-all min-touch-target shadow-sm",
                pathname === "/orders"
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground",
              )}
              aria-label={language === "zh" ? "落單紀錄" : "Order History"}
              title={language === "zh" ? "落單紀錄" : "Order History"}
            >
              <ClipboardList
                className={cn(
                  "h-8 w-8",
                  pathname === "/orders" ? "text-white" : "text-foreground",
                )}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
