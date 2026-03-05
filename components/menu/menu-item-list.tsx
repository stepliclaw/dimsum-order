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
  onRemove: () => void;
}

export function MenuItemList({
  item,
  quantity,
  onAdd,
  onRemove,
}: MenuItemListProps) {
  const { language } = useAppTranslation();

  if (!item.available) {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-md opacity-50 bg-muted/30">
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
          <Image
            src={`/images/menu/${item.photo}`}
            alt={language === "zh" ? item.name.zh : item.name.en}
            fill
            className="object-cover grayscale"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">
            {language === "zh" ? item.name.zh : item.name.en}
          </h3>
          <p className="text-muted-foreground text-xs">暫時缺貨</p>
        </div>
      </div>
    );
  }

  const priceDisplay =
    item.priceType === "fixed" ? `$${item.price}` : `$${item.tier}`;

  return (
    <div className="flex items-center gap-3 p-3 border rounded-md hover:shadow-md transition-shadow bg-background">
      <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
        <Image
          src={`/images/menu/${item.photo}`}
          alt={language === "zh" ? item.name.zh : item.name.en}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">
          {language === "zh" ? item.name.zh : item.name.en}
        </h3>
        <p className="text-muted-foreground text-xs">
          ${item.priceType === "fixed" ? item.price : item.tier}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {quantity > 0 ? (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={onRemove}
              className="h-8 w-8 rounded-full"
            >
              <span className="text-base font-bold">-</span>
            </Button>
            <span className="w-6 text-center font-semibold text-sm">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={onAdd}
              className="h-8 w-8 rounded-full"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={onAdd}
            className="h-8 px-4 rounded-full"
          >
            <Plus className="h-4 w-4 mr-1" />加
          </Button>
        )}
      </div>

      <div className="w-16 text-right">
        <span className="font-bold text-primary">{priceDisplay}</span>
      </div>
    </div>
  );
}
