import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MenuItem, Order } from "./types";
import { generateOrderId, calculateUnitPrice } from "./utils";

interface CartItem {
  itemId: string;
  quantity: number;
}

interface OrderStore {
  // State
  currentItems: CartItem[];
  orders: Order[];
  language: "en" | "zh";

  // Actions - Cart
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Actions - Orders
  submitOrder: (pricing: any) => Order;
  reorder: (order: Order) => void;

  // Actions - Language
  setLanguage: (lang: "en" | "zh") => void;

  // Actions - Persistence
  loadFromStorage: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentItems: [],
      orders: [],
      language: "zh",

      // Cart actions
      addItem: (item: MenuItem) => {
        set((state) => {
          const existingItem = state.currentItems.find(
            (ci) => ci.itemId === item.id,
          );

          if (existingItem) {
            return {
              currentItems: state.currentItems.map((ci) =>
                ci.itemId === item.id
                  ? { ...ci, quantity: ci.quantity + 1 }
                  : ci,
              ),
            };
          }

          return {
            currentItems: [
              ...state.currentItems,
              { itemId: item.id, quantity: 1 },
            ],
          };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          currentItems: state.currentItems.filter((ci) => ci.itemId !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          currentItems: state.currentItems.map((ci) =>
            ci.itemId === itemId ? { ...ci, quantity } : ci,
          ),
        }));
      },

      clearCart: () => {
        set({ currentItems: [] });
      },

      // Order actions
      submitOrder: (pricing: any) => {
        const state = get();
        const orderId = generateOrderId();
        const submittedAt = new Date().toISOString();

        // Convert cart items to order items
        const orderItems = state.currentItems.map((cartItem) => {
          // We need to get the item details from somewhere - for now we'll use a placeholder
          // In real usage, this would come from the menu config
          return {
            itemId: cartItem.itemId,
            name: { en: "Item", zh: "點心" }, // Placeholder - would be populated from menu
            quantity: cartItem.quantity,
            priceType: "tier" as const,
            tier: "中點" as const,
            unitPrice: pricing["中點"] || 24,
          };
        });

        const totalAmount = orderItems.reduce(
          (sum, item) => sum + item.unitPrice * item.quantity,
          0,
        );

        const order: Order = {
          id: orderId,
          items: orderItems,
          totalAmount,
          submittedAt,
          status: "completed",
        };

        set((state) => ({
          orders: [...state.orders, order],
          currentItems: [],
        }));

        return order;
      },

      reorder: (order: Order) => {
        // Copy order items back to cart
        const cartItems: CartItem[] = order.items.map((item) => ({
          itemId: item.itemId,
          quantity: item.quantity,
        }));

        set({ currentItems: cartItems });
      },

      // Language actions
      setLanguage: (lang: "en" | "zh") => {
        set({ language: lang });
      },

      // Load from storage (called automatically by persist middleware)
      loadFromStorage: () => {
        // Persist middleware handles this automatically
      },
    }),
    {
      name: "dimsum-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        orders: state.orders,
        language: state.language,
      }),
    },
  ),
);

// Cart stored in sessionStorage (cleared on tab close)
export const useCartStore = create<{
  currentItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}>((set) => ({
  currentItems: [],
  addItem: (item) =>
    set((state) => ({
      currentItems: [...state.currentItems, item],
    })),
  removeItem: (itemId) =>
    set((state) => ({
      currentItems: state.currentItems.filter((ci) => ci.itemId !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      currentItems: state.currentItems.map((ci) =>
        ci.itemId === itemId ? { ...ci, quantity } : ci,
      ),
    })),
  clearCart: () => set({ currentItems: [] }),
}));
