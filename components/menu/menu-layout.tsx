"use client";

import { useRef } from "react";
import type { MenuItem, CategoryDefinition, CartItem } from "@/lib/types";
import { MenuItemList } from "./menu-item-list";
import { SidebarNav } from "./sidebar-nav";
import { useAppTranslation } from "@/app/i18n";

interface MenuLayoutProps {
  items: MenuItem[];
  categories: CategoryDefinition[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
}

export function MenuLayout({
  items,
  categories,
  selectedCategory,
  onCategorySelect,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
}: MenuLayoutProps) {
  const { t, language } = useAppTranslation();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  const availableItems = items.filter((item) => item.available);

  const filteredItems = selectedCategory
    ? availableItems.filter((item) => item.category === selectedCategory)
    : availableItems;

  const getQuantity = (itemId: string) => {
    return cartItems.find((ci) => ci.itemId === itemId)?.quantity || 0;
  };

  const handleCategorySelect = (categoryId: string | null) => {
    onCategorySelect(categoryId);
    if (categoryId && categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (categoryId === null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderCategorySection = (
    categoryId: string | null,
    categoryItems: MenuItem[],
  ) => {
    const category = categories.find((c) => c.id === categoryId);
    const categoryTitle = category
      ? language === "zh"
        ? category.name.zh
        : category.name.en
      : language === "zh"
        ? "全部點心"
        : "All Items";

    return (
      <div
        key={categoryId || "all"}
        ref={(el) => {
          if (categoryId) {
            categoryRefs.current[categoryId] = el;
          }
        }}
        className="mb-8 scroll-mt-24"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          {categoryTitle}
          <span className="text-sm text-muted-foreground font-normal">
            ({categoryItems.length})
          </span>
        </h2>
        <div className="space-y-2">
          {categoryItems.map((item) => (
            <MenuItemList
              key={item.id}
              item={item}
              quantity={getQuantity(item.id)}
              onAdd={() => onAddToCart(item)}
              onRemove={() => onRemoveFromCart(item)}
            />
          ))}
        </div>
      </div>
    );
  };

  if (selectedCategory) {
    const category = categories.find((c) => c.id === selectedCategory);
    const categoryItems = availableItems.filter(
      (item) => item.category === selectedCategory,
    );

    if (categoryItems.length === 0) {
      return (
        <div className="flex gap-4">
          <SidebarNav
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
          <div className="flex-1">
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">
                {language === "zh"
                  ? "此分類暫無項目"
                  : "No items in this category"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex gap-4">
        <SidebarNav
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <div className="flex-1">
          {renderCategorySection(selectedCategory, categoryItems)}
        </div>
      </div>
    );
  }

  const itemsByCategory = sortedCategories.map((category) => ({
    category,
    items: availableItems.filter((item) => item.category === category.id),
  }));

  const uncategorizedItems = availableItems.filter(
    (item) => !categories.some((c) => c.id === item.category),
  );

  return (
    <div className="flex gap-4">
      <SidebarNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />
      <div className="flex-1">
        {uncategorizedItems.length > 0 &&
          renderCategorySection(null, uncategorizedItems)}
        {itemsByCategory.map(
          ({ category, items: catItems }) =>
            catItems.length > 0 && renderCategorySection(category.id, catItems),
        )}
      </div>
    </div>
  );
}
