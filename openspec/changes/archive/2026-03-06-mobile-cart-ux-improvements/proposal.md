## Why

The current mobile menu card and cart experience requires too many interactions to adjust item quantities. Users must tap "+ Add" multiple times and open an expanded cart panel to modify quantities. For elderly users and quick ordering scenarios, this creates unnecessary friction. Additionally, item names are difficult to read at the current size on mobile screens.

## What Changes

- **BREAKING**: Mobile menu item cards change from vertical layout to horizontal layout (image left, details right)
- **BREAKING**: Mobile menu item cards change from "Add button" to inline quantity controls
- **BREAKING**: Images hidden on small screens (< 375px viewport width)
- Increase mobile item name font size from `text-base` (16px) to `text-lg` (18px)
- Replace "+ 加入" / "+ Add" button with simple "+" symbol
- Transform button to "[- 1 +]" quantity control when item quantity > 0
- Replace bottom cart panel with compact bar showing "已揀選 [X]" and "確認下單" button
- Remove cart popup/expansion behavior - checkout button always accessible
- Quantity adjustments happen directly on menu cards, not in cart panel

## Capabilities

### New Capabilities
- `inline-quantity-controls`: Quantity adjustment directly on menu item cards with [- N +] interface
- `compact-cart-bar`: Always-visible compact cart summary with item count and checkout button
- `responsive-card-layout`: Horizontal card layout with image hiding on small screens (< 375px)

### Modified Capabilities
- `mobile-navigation`: Updating cart interaction pattern from expandable panel to compact bar
- `touch-interactions`: Adapting to horizontal card layout and quantity controls

## Impact

- `components/mobile/menu-item-compact.tsx` - Add quantity display and controls, increase text size
- `components/order/order-cart.tsx` - Simplify to compact bar, remove expanded panel
- `app/page.tsx` - Remove cart popup handling, update layout
- User experience: Faster quantity adjustments, clearer cart status, one-tap checkout access
- Reduced screen space used by cart interface
