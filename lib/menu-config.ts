import type { MenuConfig } from './types'

const MENU_URL = '/menu.json'

export async function loadMenuConfig(): Promise<MenuConfig> {
  try {
    const response = await fetch(MENU_URL)
    
    if (!response.ok) {
      throw new Error(`Failed to load menu: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Basic validation
    if (!data.version || !data.items || !data.pricing || !data.categories) {
      throw new Error('Invalid menu configuration structure')
    }
    
    // Validate items have required fields
    for (const item of data.items) {
      if (!item.id || !item.name || !item.priceType) {
        throw new Error(`Invalid menu item: ${item.id}`)
      }
      
      if (item.priceType === 'tier' && !item.tier) {
        throw new Error(`Item ${item.id} has tier pricing but no tier specified`)
      }
      
      if (item.priceType === 'fixed' && !item.price) {
        throw new Error(`Item ${item.id} has fixed pricing but no price specified`)
      }
    }
    
    return data
  } catch (error) {
    console.error('Error loading menu config:', error)
    throw error
  }
}

export function getAvailableItems(items: Array<any>): Array<any> {
  return items.filter(item => item.available !== false)
}

export function getItemsByCategory(items: Array<any>, category: string): Array<any> {
  return items.filter(item => item.category === category)
}
