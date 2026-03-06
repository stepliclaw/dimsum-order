import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MenuItem, Order } from "./types";
import { generateOrderId, calculateUnitPrice } from "./utils";

export type TextSize = "small" | "medium" | "large";

export const TEXT_SIZE_SCALE: Record<TextSize, number> = {
  small: 0.875,
  medium: 1,
  large: 1.25,
};

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
  submitOrder: (pricing: any, menuItems: MenuItem[]) => Order;
  reorder: (order: Order) => void;
  clearOrders: () => void;

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
      submitOrder: (pricing: any, menuItems: MenuItem[]) => {
        const state = get();
        const orderId = generateOrderId();
        const submittedAt = new Date().toISOString();

        // Convert cart items to order items with actual menu data
        const orderItems = state.currentItems.map((cartItem) => {
          // Find the menu item by ID
          const menuItem = menuItems.find((item) => item.id === cartItem.itemId);
          
          if (menuItem) {
            return {
              itemId: cartItem.itemId,
              name: menuItem.name,
              quantity: cartItem.quantity,
              priceType: menuItem.priceType,
              tier: menuItem.tier,
              unitPrice: calculateUnitPrice(menuItem, pricing),
            };
          }
          
          // Fallback for unavailable items
          return {
            itemId: cartItem.itemId,
            name: { en: "Unavailable", zh: "暫無供應" },
            quantity: cartItem.quantity,
            priceType: "fixed" as const,
            price: 0,
            unitPrice: 0,
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

      clearOrders: () => {
        set({ orders: [] });
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

// Text size preference store
interface TextSizeStore {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  resetToDefault: () => void;
  initializeFromSystem: () => void;
}

function getSystemFontSize(): number {
  if (typeof window === "undefined") return 16;
  const computed = window.getComputedStyle(document.documentElement);
  const fontSize = computed.fontSize;
  return parseFloat(fontSize) || 16;
}

function mapSystemToTextSize(fontSize: number): TextSize {
  if (fontSize < 15) return "small";
  if (fontSize > 17) return "large";
  return "medium";
}

function getInitialTextSize(): TextSize {
  if (typeof window === "undefined") return "medium";
  try {
    const stored = localStorage.getItem("dimsum-text-size");
    if (stored && ["small", "medium", "large"].includes(stored)) {
      return stored as TextSize;
    }
  } catch {
    // localStorage unavailable
  }
  const systemSize = getSystemFontSize();
  return mapSystemToTextSize(systemSize);
}

export const useTextSizeStore = create<TextSizeStore>()((set, get) => ({
  textSize: getInitialTextSize(),

  setTextSize: (size) => {
    set({ textSize: size });
    try {
      localStorage.setItem("dimsum-text-size", size);
    } catch {
      // localStorage unavailable, state still works for session
    }
  },

  resetToDefault: () => {
    get().setTextSize("medium");
  },

  initializeFromSystem: () => {
    const stored = localStorage.getItem("dimsum-text-size");
    if (!stored) {
      const systemSize = getSystemFontSize();
      const mapped = mapSystemToTextSize(systemSize);
      set({ textSize: mapped });
    }
  },
}));

// Cross-tab synchronization
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "dimsum-text-size" && event.newValue) {
      const newSize = event.newValue as TextSize;
      if (["small", "medium", "large"].includes(newSize)) {
        useTextSizeStore.setState({ textSize: newSize });
      }
    }
  });
}
