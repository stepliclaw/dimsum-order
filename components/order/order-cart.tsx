"use client";

import type { CartItem, PricingTable } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle } from "lucide-react";

interface OrderCartProps {
  items: CartItem[];
  pricing: PricingTable;
  onCheckout: () => void;
}

export function OrderCart({ items, onCheckout }: OrderCartProps) {
  const { t, language } = useAppTranslation();

  // Calculate total item count
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Don't render if no items
  if (totalCount === 0) {
    return null;
  }

  return (
    <div className="w-full bg-primary/95 backdrop-blur-sm border-t-4 border-primary shadow-2xl z-50">
      <div className="flex flex-col items-center justify-center p-5 gap-4">
        <div className="flex items-center gap-4">
          <ShoppingCart className="h-10 w-10 text-white drop-shadow-lg" />
          <span className="font-black text-2xl text-white drop-shadow-md">
            {language === "zh"
              ? `已揀選 ${totalCount} 款點心`
              : `Selected ${totalCount} items`}
          </span>
        </div>
        <Button
          onClick={onCheckout}
          className="w-full h-20 text-2xl shadow-2xl bg-primary-foreground text-primary hover:bg-white/95 border-4 border-primary/30"
          size="xl"
        >
          <CheckCircle className="mr-3 h-10 w-10" />
          {language === "zh" ? "確認下單" : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
}
