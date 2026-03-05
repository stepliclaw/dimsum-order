// CartItem is used in store.ts but not exported from types
// It's a local interface for the cart state

export interface CartItem {
  itemId: string
  quantity: number
}

export type Category = 'steamed' | 'fried' | 'dessert' | 'sets' | 'rice' | 'noodle'

export type PricingTier = '小點' | '中點' | '大點' | '特點' | '超點'

export interface LocalizedString {
  en: string
  zh: string
}

export interface MenuItem {
  id: string
  name: LocalizedString
  category: Category
  priceType: 'tier' | 'fixed'
  tier?: PricingTier
  price?: number
  photo: string
  available: boolean
}

export interface OrderItem {
  itemId: string
  name: LocalizedString
  quantity: number
  priceType: 'tier' | 'fixed'
  tier?: PricingTier
  price?: number
  unitPrice: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  submittedAt: string
  status: OrderStatus
}

export interface MenuConfig {
  version: string
  categories: CategoryDefinition[]
  pricing: PricingTable
  items: MenuItem[]
}

export interface CategoryDefinition {
  id: Category
  name: LocalizedString
  icon?: string
  order: number
}

export interface PricingTable {
  '小點': number
  '中點': number
  '大點': number
  '特點': number
  '超點'?: number
}
