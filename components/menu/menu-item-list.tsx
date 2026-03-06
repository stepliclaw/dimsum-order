"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MenuItemListProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onDecrease: () => void;
}

export function MenuItemList({
  item,
  quantity,
  onAdd,
  onDecrease,
}: MenuItemListProps) {
  const { language } = useAppTranslation();

  if (!item.available) {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-md opacity-50 bg-muted/30">
        {/* Image - hidden on screens < 375px */}
        <div className="hidden min-[375px]:block relative w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-muted">
          <Image
            src={`/images/menu/${item.photo}`}
            alt={language === "zh" ? item.name.zh : item.name.en}
            fill
            className="object-cover grayscale"
            sizes="80px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">
            {language === "zh" ? item.name.zh : item.name.en}
          </h3>
          <p className="text-muted-foreground text-xs">暫時缺貨</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 p-3 border rounded-md hover:shadow-md transition-shadow bg-background">
      {/* Image - hidden on screens < 375px */}
      <div className="hidden min-[375px]:block relative w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-muted">
        <Image
          src={`/images/menu/${item.photo}`}
          alt={language === "zh" ? item.name.zh : item.name.en}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
        <h3 className="font-semibold text-lg truncate">
          {language === "zh" ? item.name.zh : item.name.en}
        </h3>
        <p className="font-bold text-base text-primary">
          {item.priceType === "fixed" ? `$${item.price}` : item.tier}
        </p>
      </div>

      <div className="flex items-center gap-1">
        {quantity > 0 ? (
          <>
            <Button
              variant="outline"
              onClick={onDecrease}
              className="h-9 w-9 p-0 min-touch-target"
              size="icon"
            >
              <span className="text-base font-bold">-</span>
            </Button>
            <span className="w-8 text-center font-semibold text-base">
              {quantity}
            </span>
            <Button
              variant="outline"
              onClick={onAdd}
              className="h-9 w-9 p-0 min-touch-target"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            onClick={onAdd}
            className="h-9 w-9 p-0 min-touch-target"
            size="icon"
          >
            <Plus className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
