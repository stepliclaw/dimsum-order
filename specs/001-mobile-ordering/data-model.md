# Data Model: Mobile Ordering System

**Date**: 2026-03-05  
**Branch**: `001-mobile-ordering`

## Core Entities

### MenuItem

Represents a single dim sum item on the menu.

```typescript
interface MenuItem {
  id: string                    // Unique identifier (kebab-case, e.g., "har-gow")
  name: LocalizedString         // Name in EN and ZH
  description: LocalizedString  // Description in EN and ZH
  category: Category            // Menu category
  priceType: 'tier' | 'fixed'   // Pricing model
  tier?: PricingTier            // If tiered: 小點/中點/大點/特點
  price?: number                // If fixed: HKD amount
  photo: string                 // Filename in /public/images/menu/
  available: boolean            // Availability status (default: true)
}
```

**Validation Rules**:
- `id`: Required, unique, kebab-case, 3-50 chars
- `name.en`, `name.zh`: Required, 2-100 chars
- `description.en`, `description.zh`: Required, 10-500 chars
- `category`: Required, must exist in categories list
- `priceType`: Required, enum
- If `priceType === 'tier'`: `tier` required
- If `priceType === 'fixed'`: `price` required, positive number
- `photo`: Required, valid filename with extension
- `available`: Optional, defaults to true

---

### OrderItem

Represents a line item within an order.

```typescript
interface OrderItem {
  itemId: string        // Reference to MenuItem.id
  name: LocalizedString // Snapshot of name at order time
  quantity: number      // Quantity ordered (positive integer)
  priceType: 'tier' | 'fixed'
  tier?: PricingTier
  price?: number        // Unit price in HKD
  unitPrice: number     // Calculated HKD amount per item
}
```

**Validation Rules**:
- `itemId`: Required, must reference existing MenuItem
- `name`: Required, snapshot from MenuItem
- `quantity`: Required, integer >= 1
- `unitPrice`: Required, positive number (calculated from tier or fixed)

---

### Order

Represents a complete order submitted by a user.

```typescript
interface Order {
  id: string              // Unique order number (e.g., "ORD-20260305-001")
  items: OrderItem[]      // Array of order items
  totalAmount: number     // Total HKD amount
  submittedAt: string     // ISO 8601 timestamp
  status: OrderStatus     // Order status (for demo: always 'completed')
}
```

**Validation Rules**:
- `id`: Required, unique, format: "ORD-YYYYMMDD-NNN"
- `items`: Required, non-empty array
- `totalAmount`: Required, sum of (unitPrice × quantity), >= 0
- `submittedAt`: Required, ISO 8601 format
- `status`: Required, enum: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed'

**Order Status Flow** (simplified for demo):
```
submitted → completed
```

---

### MenuConfig

Root configuration object for menu data.

```typescript
interface MenuConfig {
  version: string           // Config version for cache busting
  categories: Category[]    // Available categories
  pricing: PricingTable     // Tier pricing in HKD
  items: MenuItem[]         // All menu items
}
```

---

### Category

Menu category with localized names.

```typescript
type Category = 'steamed' | 'fried' | 'dessert' | 'sets' | 'rice' | 'noodle'

interface CategoryDefinition {
  id: Category
  name: LocalizedString
  icon?: string             // Optional icon name
  order: number             // Display order
}
```

**Default Categories**:
1. steamed (蒸點)
2. fried (煎炸)
3. rice (飯類)
4. noodle (麵類)
5. dessert (甜品)
6. sets (套餐)

---

### PricingTier

Dim sum pricing tier names (Traditional Chinese).

```typescript
type PricingTier = '小點' | '中點' | '大點' | '特點' | '超點'
```

**Pricing Table Example**:
```typescript
interface PricingTable {
  '小點': number    // e.g., 18
  '中點': number    // e.g., 24
  '大點': number    // e.g., 32
  '特點': number    // e.g., 42
  '超點'?: number   // e.g., 58 (optional premium tier)
}
```

---

### LocalizedString

Bilingual text container.

```typescript
interface LocalizedString {
  en: string   // English text
  zh: string   // Traditional Chinese text
}
```

---

## State Management (Zustand Store)

### OrderStore

```typescript
interface OrderStore {
  // State
  currentItems: MenuItem[]      // Items in current order (cart)
  orders: Order[]               // Order history (session-based)
  language: 'en' | 'zh'         // Current UI language
  
  // Actions
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  submitOrder: () => Order
  reorder: (order: Order) => void
  setLanguage: (lang: 'en' | 'zh') => void
  loadFromStorage: () => void
}
```

**Persistence**:
- `orders`: localStorage (session survives page refresh)
- `language`: localStorage (user preference)
- `currentItems`: sessionStorage (cleared on tab close)

---

## Relationships

```
MenuConfig
├── categories: Category[]
├── pricing: PricingTable
└── items: MenuItem[]

MenuItem
├── name: LocalizedString
├── description: LocalizedString
└── (references pricing via tier)

Order
├── items: OrderItem[]
│   └── references MenuItem.id
└── (snapshot of MenuItem data at order time)
```

---

## Data Flow

### Menu Loading
```
menu.json (file)
    ↓
loadMenuConfig()
    ↓
validate schema
    ↓
populate store
    ↓
render menu grid
```

### Order Submission
```
user clicks "Submit Order"
    ↓
generate order ID
    ↓
create Order object
    ↓
save to orders array
    ↓
persist to localStorage
    ↓
clear currentItems
    ↓
show confirmation
```

### Language Switching
```
user toggles language
    ↓
update store.language
    ↓
persist to localStorage
    ↓
re-render all components
    ↓
UI updates to new language
```

---

## localStorage Schema

```typescript
// Key: 'dimsum-orders'
{
  orders: Order[]
  language: 'en' | 'zh'
  lastUpdated: string
}

// Key: 'dimsum-cart' (sessionStorage)
{
  currentItems: Array<{
    itemId: string
    quantity: number
  }>
}
```

**Storage Limits**:
- localStorage: ~5-10MB
- sessionStorage: ~5-10MB
- Estimate per order: ~1KB
- Max orders before cleanup: ~1000 orders

---

## Validation Functions

```typescript
// Price calculation
function calculateUnitPrice(item: MenuItem, pricing: PricingTable): number {
  if (item.priceType === 'fixed') {
    return item.price!
  }
  return pricing[item.tier!]
}

// Order total
function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)
}

// Order ID generation
function generateOrderId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const timestamp = Date.now()
  return `ORD-${date}-${timestamp.toString().slice(-3)}`
}
```

---

## Type Definitions File

Location: `lib/types.ts`

All TypeScript interfaces above will be defined in this file for import throughout the application.
