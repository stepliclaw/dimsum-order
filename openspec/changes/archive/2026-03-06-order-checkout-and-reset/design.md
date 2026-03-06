## Context

The dimsum-order application currently allows customers to place orders and view order history with a grand total bar at the bottom. However, there's no formal checkout flow to guide customers to payment, and no way to reset orders after completing a session. This creates friction for customers who want to start fresh or need clear payment instructions.

**Current State:**
- Order history page shows individual orders with items and quantities
- Grand total bar fixed at bottom showing sum of all orders
- No checkout button or payment instructions
- No way to clear order history (requires page refresh or browser storage clear)

**Constraints:**
- Maintain existing order history display format
- Support bilingual UI (Chinese and English)
- Keep grand total bar functionality
- Mobile-first responsive design

## Goals / Non-Goals

**Goals:**
- Add checkout button on order history page (visible when orders exist)
- Display modal with welcome message, payment instructions, and grand total
- Provide "Start Over" button to reset all orders
- Clear all orders and return to empty state
- Bilingual support for all new UI elements

**Non-Goals:**
- Payment processing integration (instruction only - "proceed to cashier")
- Order confirmation or receipt generation
- Partial order deletion (all or nothing)
- Order history persistence across sessions (uses existing storage)

## Decisions

### 1. Checkout Modal vs. New Page
**Decision:** Use modal dialog for checkout flow

**Rationale:** Modal keeps users in context, lighter weight than full page navigation, easy to dismiss if user changes mind. Checkout is informational (payment instructions) rather than a complex multi-step process.

**Alternatives Considered:**
- New page (`/orders/checkout`) → More navigation, breaks flow
- Inline expansion below orders → Takes screen space, less prominent
- Bottom sheet (mobile) → Similar to modal, but modal works better cross-platform

### 2. Reset Confirmation Dialog
**Decision:** No confirmation dialog - immediate reset on button click

**Rationale:** Users who click "Start Over" intend to clear orders. Extra confirmation adds friction. Order history is session-based anyway (not critical data). Matches existing UX patterns in the app.

**Alternatives Considered:**
- Confirmation dialog ("Are you sure?") → Safer but adds friction
- Undo option after reset → Complex, orders already cleared from store
- Reset only from menu page → Confusing, checkout is natural place

### 3. Checkout Button Placement
**Decision:** Fixed bottom bar alongside or replacing grand total bar

**Rationale:** Consistent with existing grand total bar pattern. Always visible when scrolling. Clear call-to-action at natural decision point.

**Alternatives Considered:**
- Top of order history page → Less visible, users may miss it
- In each order card → Redundant, checkout is for all orders
- Floating action button → Less clear purpose, conflicts with grand total

### 4. Modal Close Behavior
**Decision:** Modal closes when "Start Over" is clicked, returns to empty order history

**Rationale:** Clean transition from checkout to empty state. Modal no longer relevant after orders are cleared. User sees result of reset action immediately.

**Alternatives Considered:**
- Stay in modal, show success message → Extra step, unnecessary
- Navigate to home page → Too disruptive, user may want to browse menu first
- Close modal, stay on order history page → Shows empty state, most logical

### 5. Grand Total Display in Modal
**Decision:** Show same grand total as bottom bar (sum of all order totals)

**Rationale:** Consistency with what user already sees. No confusion about different totals. Grand total is already calculated and available.

**Alternatives Considered:**
- Show individual order totals in modal → Redundant, already visible in background
- Show total with breakdown (by category) → Overly complex for checkout
- Different total format → Confusing, should match existing display

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Users accidentally clear orders | Medium | Clear button labeling ("Start Over" / "重新開始"), visual distinction from other buttons |
| Modal blocks order review | Low | Easy to dismiss modal, orders still visible in background |
| Grand total confusion (modal vs. bar) | Low | Same value, same format (HKD $XX.XX) |
| Reset action feels destructive | Medium | Frame as positive ("Start Over" for new session, not "Delete Orders") |
| Modal not responsive on small screens | Medium | Test on 320px viewport, use responsive modal component |

## Migration Plan

**Phase 1: Store Action**
- Add `clearOrders` action to useOrderStore
- Clear orders array and reset to initial state

**Phase 2: Checkout Button**
- Add button to order history page (near grand total bar)
- Conditional rendering (show only when orders exist)

**Phase 3: Checkout Modal**
- Create modal component with bilingual text
- Display grand total from store
- Wire "Start Over" button to clearOrders action

**Phase 4: Integration**
- Connect modal close behavior to order history page
- Test flow: orders exist → checkout → reset → empty state
- Verify sidebar order history button hides after reset

**Rollback Strategy:**
- Revert store action and UI components via git
- No database migrations required
- Feature can be disabled by hiding checkout button

## Open Questions

1. Should checkout modal include order details (item list) or just grand total?
2. Should "Start Over" button have a different color (e.g., destructive red) to indicate it clears data?
3. Should we add an icon to the checkout button (e.g., shopping cart, checkout symbol)?
