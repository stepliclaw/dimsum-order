## Why

Customers need a clear way to complete their ordering journey and view their grand total before proceeding to payment. Currently, the order history page shows individual order totals but lacks a checkout flow with payment instructions and the ability to reset orders after completion.

## What Changes

- Add "Check Out" / "結帳" button on order history page (visible when orders exist)
- Display checkout modal with welcome message, experience wish, and payment instructions
- Show grand total (sum of all orders) in checkout modal
- Add "Start Over" / "重新開始" button to reset all order history
- Clear all orders and return to empty state after reset
- Bilingual support for all new UI elements (Chinese and English)

## Capabilities

### New Capabilities

- `checkout-modal`: Modal dialog displaying checkout instructions, grand total, and reset action
- `order-history-reset`: Ability to clear all order history and return to empty state

### Modified Capabilities

- `order-history-list`: Adding checkout button to order history page UI

## Impact

- `components/order/order-history.tsx` - Add checkout button and modal component
- `app/orders/page.tsx` - May need padding adjustment for new button
- `lib/store.ts` - Add action to clear all orders (reset functionality)
- User experience: Clear checkout flow, easy order reset for new sessions
