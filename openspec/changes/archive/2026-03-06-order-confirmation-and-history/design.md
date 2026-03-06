## Context

The current dimsum-order application has a basic order confirmation page that shows only the order number and total amount. Users cannot see what items they ordered without navigating to the separate order history page. Additionally, there's no visible navigation to order history from the main menu interface.

**Current State:**
- `/orders/confirmation` page shows: Order #, Total Amount, View Orders button, Menu button
- `/orders` page shows: List of orders in a basic format
- No sidebar navigation to order history
- Order history button only accessible from confirmation page

**Constraints:**
- Maintain existing checkout flow (add to cart → cart bar → checkout)
- Keep existing store structure (zustand for cart and orders)
- Support bilingual UI (Chinese/English)
- Mobile-first responsive design

## Goals / Non-Goals

**Goals:**
- Replace confirmation page with item list display
- Add "已下單" status badge at top of confirmation
- Show order timestamp and total amount
- Display item names (language-aware) and quantities only (no images, no prices)
- Add order history icon button to left sidebar
- Order history button appears only when `orders.length > 0`
- Update order history page to show grouped orders with items
- Add empty state for order history page

**Non-Goals:**
- Changing order submission logic
- Modifying cart functionality
- Adding payment processing
- Order status tracking (delivered, cancelled, etc.)
- Reorder functionality

## Decisions

### 1. Order Confirmation Page Layout
**Decision:** Vertical stack: Badge → Order Info → Item List → Buttons

**Rationale:** Clear visual hierarchy. Status badge immediately confirms order placement. Item list provides detailed review. Buttons at bottom maintain existing UX.

**Alternatives Considered:**
- Horizontal layout with badge and order # side-by-side → Cramped on mobile
- Item list in expandable accordion → Extra interaction, hides information
- Keep current design with item list modal → Extra click, less discoverable

### 2. Order History Sidebar Button
**Decision:** Icon-only button (📋) below category buttons

**Rationale:** Icon-only fits narrow sidebar (20% width). Clipboard icon universally represents orders/lists. Appears below categories to separate navigation from history.

**Alternatives Considered:**
- Text "Orders" in English → Doesn't fit narrow width
- Text "落單紀錄" stacked vertically → Too tall, harder to tap
- Always visible vs conditional → Conditional reduces clutter for new users

### 3. Order History Display Format
**Decision:** Grouped by order with timestamp, order #, and item list

```
2026-03-06 14:30
Order #ABC123
- 蝦餃 x 2
- 燒賣 x 3
─────────────
2026-03-05 12:15
Order #DEF456
- 蝦餃 x 1
```

**Rationale:** Chronological order is intuitive. Grouping shows all items per order. Timestamp provides context for "when". No prices keeps focus on items.

**Alternatives Considered:**
- Show prices → Clutters display, prices may change
- Collapse items with "X items" text → Hides useful information
- Show images → Takes too much space, slow loading

### 4. Item Name Storage Strategy
**Decision:** Look up item names from current menu at display time

**Rationale:** Simpler data model (store only item IDs). Item names rarely change. If items are removed from menu, show "Unavailable Item" fallback.

**Alternatives Considered:**
- Store item names in order → More data, but preserves historical accuracy
- Store full item snapshot → Overkill for this use case
- Hybrid (store names, update on menu change) → Complex, unnecessary

### 5. Empty State
**Decision:** Show empty state message with "Return to Home" button

**Rationale:** Clear communication that no orders exist. Provides clear next action. Better than automatic redirect which can be disorienting.

**Alternatives Considered:**
- Auto-redirect to home → Confusing, user loses context
- Show blank page → Unclear what's happening
- Show onboarding message → Overkill for simple case

### 6. Sidebar Icon Visibility
**Decision:** Show only when `orders.length > 0`

**Rationale:** Reduces visual clutter for new users. Appears naturally after first order. Prevents confusion from clicking empty history.

**Alternatives Considered:**
- Always visible → Clutters sidebar, leads to empty state
- Show after 1+ items in cart → Premature, user hasn't ordered yet
- Show based on account age → Arbitrary, doesn't match user intent

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Item names change after order | Low | Show "Unavailable" fallback, acceptable for edge case |
| Sidebar icon confuses new users | Low | Hidden until first order, clear icon design |
| Order history page slow with many orders | Medium | Paginate after 50 orders, virtual scroll |
| Confirmation page too long on mobile | Medium | Limit visible items, scrollable container |
| Icon not recognized as "Order History" | Medium | Add tooltip on desktop, test with users |

## Migration Plan

**Phase 1: Order Confirmation Page**
- Update `/orders/confirmation/page.tsx`
- Add item list display
- Add "已下單" badge component
- Test checkout flow end-to-end

**Phase 2: Sidebar Navigation**
- Add order history icon to mobile sidebar
- Add conditional rendering logic
- Test appearance after first order

**Phase 3: Order History Page**
- Update `/orders/page.tsx` with new format
- Add empty state component
- Test with multiple orders

**Phase 4: Testing**
- Test bilingual display (Chinese/English)
- Test with various order quantities
- Test empty state flow
- Test sidebar icon visibility

**Rollback Strategy:**
- Revert confirmation page to original design via git
- Hide sidebar icon via feature flag
- No database migrations required

## Open Questions

1. Should we add a "Reorder" button to quickly repeat past orders?
2. Should order history be paginated or infinite scroll?
3. Should we add order status badges (Completed, Cancelled) for future expansion?
4. Should the "已下單" badge have a checkmark icon or just text?
