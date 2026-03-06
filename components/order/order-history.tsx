"use client";

import type { Order } from "@/lib/types";
import { useAppTranslation } from "@/app/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatOrderDate } from "@/lib/utils";
import { Clock, CheckCircle, Package } from "lucide-react";

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const { language } = useAppTranslation();

  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-category-success" />;
      case "ready":
      case "confirmed":
        return <Package className="h-6 w-6 text-category-noodle" />;
      default:
        return <Clock className="h-6 w-6 text-category-fried" />;
    }
  };

  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      pending: { zh: "等待中", en: "Pending" },
      confirmed: { zh: "已確認", en: "Confirmed" },
      preparing: { zh: "準備中", en: "Preparing" },
      ready: { zh: "就緒", en: "Ready" },
      completed: { zh: "已完成", en: "Completed" },
    };
    return language === "zh" ? labels[status].zh : labels[status].en;
  };

  return (
    <div className="space-y-6 px-4 pb-24">
      {sortedOrders.map((order) => (
        <Card key={order.id} className="shadow-md">
          <CardContent className="p-6">
            {/* Order Header - Enhanced */}
            <div className="mb-4 pb-4 border-b-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <span className="font-bold text-xl">{order.id}</span>
                </div>
                <Badge
                  variant={order.status === "completed" ? "noodle" : "outline"}
                  size="lg"
                >
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-lg">
                  {formatOrderDate(order.submittedAt, language)}
                </span>
              </div>
            </div>

            {/* Items List - Enhanced */}
            <div className="border-b-2 py-4 mb-4">
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex justify-between items-center text-lg py-2"
                  >
                    <span className="font-medium">
                      {language === "zh" ? item.name.zh : item.name.en}
                    </span>
                    <span className="font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                      × {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Total - Enhanced */}
            <div className="flex justify-end items-center gap-3">
              <span className="text-lg font-semibold">
                {language === "zh" ? "總計:" : "Total:"}
              </span>
              <span className="text-3xl font-bold text-primary">
                HKD ${order.totalAmount.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
