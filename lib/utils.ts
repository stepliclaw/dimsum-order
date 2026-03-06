import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MenuItem, PricingTable } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateUnitPrice(item: MenuItem, pricing: PricingTable): number {
  if (item.priceType === 'fixed') {
    return item.price!
  }
  
  const tierPrice = pricing[item.tier!]
  if (tierPrice === undefined) {
    return 24 // Default to medium price if tier not found
  }
  return tierPrice
}

export function formatPrice(amount: number, locale: string = 'en'): string {
  if (locale === 'zh') {
    return `$${amount}`
  }
  return `$${amount}`
}

export function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const timestamp = Date.now()
  return `ORD-${date}-${timestamp.toString().slice(-3)}`
}

export function formatOrderDate(isoString: string, locale: string = 'en'): string {
  const date = new Date(isoString)
  
  if (locale === 'zh') {
    return date.toLocaleString('zh-HK', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getCategoryOrder(categoryId: string): number {
  const order: Record<string, number> = {
    'steamed': 1,
    'fried': 2,
    'rice': 3,
    'noodle': 4,
    'dessert': 5,
    'sets': 6
  }
  return order[categoryId] || 99
}

export function updateTextSizeCSS(size: 'small' | 'medium' | 'large'): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-text-size', size);
}
