## Why

Users need clear confirmation of their order with a detailed item list, and easy access to view their order history. Currently, the confirmation page only shows order number and total amount without item details, and there's no visible navigation to order history from the menu sidebar.

## What Changes

- Replace current order confirmation page with detailed item list view
- Add "已下單" (Order Placed) badge at top of confirmation page
- Display ordered items with names (language-aware) and quantities
- Show order timestamp and total amount on confirmation
- Add "Order History" icon button to left sidebar (appears when orders exist)
- Update order history page (`/orders`) to show grouped orders with timestamps and item lists
- Add empty state for order history when no orders exist

## Capabilities

### New Capabilities
- `order-confirmation-items`: Display ordered items list on confirmation page with quantities and language-aware names
- `order-history-sidebar`: Sidebar navigation button for order history that appears when user has placed orders
- `order-history-list`: Display past orders grouped by timestamp with item details and total amounts

### Modified Capabilities
- None (all new capabilities)

## Impact

- `app/orders/confirmation/page.tsx` - Complete redesign to show item list and badge
- `components/mobile/mobile-sidebar-nav.tsx` - Add conditional order history button
- `app/orders/page.tsx` - Update to show order history list format
- `lib/store.ts` - May need to store item names in orders for persistence
- `components/order/order-cart.tsx` - No changes (checkout button unchanged)
- User experience: Clearer order confirmation, easier access to order history
