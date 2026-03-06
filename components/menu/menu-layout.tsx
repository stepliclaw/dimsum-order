"use client";

import { useRef, useEffect, useState } from "react";
import type { MenuItem, CategoryDefinition, CartItem, Order } from "@/lib/types";
import { MenuItemList } from "./menu-item-list";
import { SidebarNav } from "./sidebar-nav";
import { MobileSidebarNav } from "@/components/mobile/mobile-sidebar-nav";
import { useAppTranslation } from "@/app/i18n";

interface MenuLayoutProps {
  items: MenuItem[];
  categories: CategoryDefinition[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  cartItems: CartItem[];
  orders: Order[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
}

export function MenuLayout({
  items,
  categories,
  selectedCategory,
  onCategorySelect,
  cartItems,
  orders,
  onAddToCart,
  onUpdateQuantity,
}: MenuLayoutProps) {
  const { t, language } = useAppTranslation();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  const availableItems = items.filter((item) => item.available);

  // Remove filtering - always show all items grouped by category
  const getQuantity = (itemId: string) => {
    return cartItems.find((ci) => ci.itemId === itemId)?.quantity || 0;
  };

  // Set up IntersectionObserver for active category detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible category (highest intersection ratio)
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and get the most visible one
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const mostVisible = visibleEntries[0];
          const categoryId = mostVisible.target.getAttribute('data-category');
          if (categoryId) {
            setActiveCategory(categoryId);
          }
        }
      },
      { 
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-100px 0px -200px 0px' // Account for header (~64px) and cart bar (~80px)
      }
    );

    // Observe all category sections
    const sections = document.querySelectorAll('[data-category]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleCategorySelect = (categoryId: string | null) => {
    // Toggle behavior: clicking same category scrolls to top
    if (categoryId === selectedCategory) {
      onCategorySelect(null);
      // Scroll content area to top
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    onCategorySelect(categoryId);
    
    if (categoryId === null) {
      // Scroll to absolute top for "All" button
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (categoryRefs.current[categoryId]) {
      categoryRefs.current[categoryId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
        data-category={categoryId || undefined}
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
              onDecrease={() => onUpdateQuantity(item.id, getQuantity(item.id) - 1)}
            />
          ))}
        </div>
      </div>
    );
  };

  // Always render all categories (no filtering)
  const itemsByCategory = sortedCategories.map((category) => ({
    category,
    items: availableItems.filter((item) => item.category === category.id),
  }));

  const uncategorizedItems = availableItems.filter(
    (item) => !categories.some((c) => c.id === item.category),
  );

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Mobile Narrow Sidebar - 25% width, fixed below header */}
      <MobileSidebarNav
        categories={categories}
        selectedCategory={selectedCategory}
        activeCategory={activeCategory}
        orders={orders}
        onCategorySelect={handleCategorySelect}
      />

      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block w-64 shrink-0">
        <SidebarNav
          categories={categories}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Items Container - 80% on mobile, rest on desktop */}
      <div 
        ref={contentRef}
        className="flex-1 ml-[20%] min-w-[80%] md:ml-0 overflow-y-auto scroll-momentum pb-32"
      >
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
