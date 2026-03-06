"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Utensils } from "lucide-react";

interface MenuItemProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export function MenuItemComponent({ item, onAddToCart }: MenuItemProps) {
  const { t, language } = useAppTranslation();

  if (!item.available) {
    return (
      <Card className="opacity-60 bg-muted/30">
        <CardContent className="p-5">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={`/images/menu/${item.photo}`}
              alt={language === "zh" ? item.name.zh : item.name.en}
              fill
              className="object-cover grayscale"
            />
          </div>
          <div className="mt-4">
            <h3 className="font-bold text-xl">
              {language === "zh" ? item.name.zh : item.name.en}
            </h3>
            <Button disabled className="w-full mt-4 h-14 text-lg" size="lg">
              {t("menu.unavailable")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all hover:shadow-2xl hover:border-primary cursor-pointer bg-white">
      <CardContent className="p-5">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted/50 border-2">
          <Image
            src={`/images/menu/${item.photo}`}
            alt={language === "zh" ? item.name.zh : item.name.en}
            fill
            className="object-cover"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-2xl text-foreground">
              {language === "zh" ? item.name.zh : item.name.en}
            </h3>
            <Badge
              variant={item.category as any}
              size="lg"
              className="flex-shrink-0 shadow-md"
            >
              <Utensils className="w-6 h-6 mr-1" />
              {item.category}
            </Badge>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-black text-3xl text-primary drop-shadow-sm">
              ${item.priceType === "fixed" ? item.price : item.tier}
            </span>
            <Button
              onClick={() => onAddToCart(item)}
              className="h-16 px-10 text-xl shadow-xl hover:shadow-2xl"
              size="lg"
            >
              <Plus className="mr-2 h-8 w-8" />
              {t("menu.addToOrder")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
