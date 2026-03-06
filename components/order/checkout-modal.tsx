"use client";

import { useRouter } from "next/navigation";
import { useOrderStore } from "@/lib/store";
import { useAppTranslation } from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Utensils } from "lucide-react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { language } = useAppTranslation();
  const orders = useOrderStore((state) => state.orders);
  const clearOrders = useOrderStore((state) => state.clearOrders);

  // Calculate grand total
  const grandTotal = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const handleStartOver = () => {
    clearOrders();
    router.push("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 relative border-4 border-primary/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Enhanced */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Close modal"
        >
          <X className="h-10 w-10" />
        </button>

        {/* Success Icon - Enhanced */}
        <div className="flex justify-center mb-6">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-2xl border-4 border-white/50">
            <CheckCircle className="h-20 w-20 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Welcome Message - Enhanced */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-black mb-4 text-primary">
            {language === "zh" ? "多謝光臨" : "Thank You"}
          </h2>
          <p className="text-xl text-muted-foreground font-medium">
            {language === "zh"
              ? "希望你有一次愉快的體驗"
              : "Hope you have a pleasant experience"}
          </p>
        </div>

        {/* Payment Instruction - Enhanced */}
        <div className="text-center mb-6 p-6 bg-primary/15 rounded-2xl border-4 border-primary/40">
          <Utensils className="h-12 w-12 mx-auto mb-4 text-primary" />
          <p className="text-2xl font-bold text-primary">
            {language === "zh"
              ? "請前往收銀處付款"
              : "Please proceed to cashier for payment"}
          </p>
        </div>

        {/* Grand Total - Enhanced */}
        <div className="text-center mb-6 p-6 bg-primary/10 rounded-2xl border-2 border-primary/30">
          <p className="text-xl text-muted-foreground mb-3 font-bold">
            {language === "zh" ? "總數" : "Grand Total"}
          </p>
          <p className="text-6xl font-black text-primary drop-shadow-sm">
            HKD ${grandTotal.toFixed(2)}
          </p>
        </div>

        {/* Start Over Button - Enhanced */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleStartOver}
            variant="outline"
            className="w-full h-20 text-2xl shadow-xl border-4"
            size="xl"
          >
            <Utensils className="mr-3 h-10 w-10" />
            {language === "zh" ? "重新開始" : "Start Over"}
          </Button>
        </div>
      </div>

      {/* Backdrop - click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
