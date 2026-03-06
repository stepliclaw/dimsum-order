## Context

The dimsum-order mobile ordering flow currently uses a desktop-like cart pattern where:
- Menu cards show an "+ Add" button
- Clicking add expands a bottom cart panel
- Quantity controls exist only in the expanded panel
- Item names are at `text-base` (16px), potentially hard to read for elderly users

**Current State:**
- `menu-item-compact.tsx` - Shows "+ 加入" / "+ Add" button
- `order-cart.tsx` - Full cart panel with quantity controls per item
- Cart expansion takes significant screen space
- Multiple taps required to adjust quantities

**Constraints:**
- Maintain existing store structure (useOrderStore handles quantities)
- Keep mobile-first approach (20% sidebar, category navigation)
- Preserve accessibility (44px minimum touch targets)
- Support both Chinese and English UI

## Goals / Non-Goals

**Goals:**
- Change card layout from vertical to horizontal (image left, details right)
- Hide images on small screens (< 375px viewport width) to save space
- Increase mobile item name font size to `text-lg` (18px)
- Replace "+ Add" button with inline quantity controls
- Show "+" only when quantity = 0
- Show "[- N +]" when quantity > 0
- Replace expanded cart panel with compact bottom bar
- Display "已揀選 [X]" (total items) in bottom bar
- Show "確認下單" checkout button in bottom bar
- Enable quantity adjustment without opening cart

**Non-Goals:**
- Changing desktop cart behavior (desktop uses different pattern)
- Modifying store state management
- Changing pricing or order submission logic
- Adding animations or transitions (keep simple)

## Decisions

### 1. Quantity Control Placement
**Decision:** Inline on menu item card, replacing the Add button

**Rationale:** Reduces interaction steps - users adjust quantity where they see the item. Matches patterns from Deliveroo, Uber Eats, Foodpanda.

**Alternatives Considered:**
- Separate quantity badge + Add button → More complex, redundant
- Quick-add modal popup → Extra interaction, slower
- Keep current cart-based controls → Requires opening cart panel

### 2. Button Behavior States
**Decision:** Two states based on quantity
- Quantity = 0: Show `[+]` button
- Quantity > 0: Show `[- N +]` controls

**Rationale:** Clear mental model - plus adds item, minus/plus adjust. Number in middle shows current quantity at a glance.

**Alternatives Considered:**
- `[+]` always, show quantity elsewhere → Less direct
- `[-] [+]` without number → User loses count
- `[Add 1] [Add 2] [Add 3]` quick buttons → Takes too much space

### 3. Bottom Bar Design
**Decision:** Compact fixed bar, always visible when items in cart
- Height: ~56px (h-14)
- Left side: "已揀選 [X]" text
- Right side: "確認下單" full-height button
- No expansion, no popup

**Rationale:** Maximum screen space for browsing menu. Checkout always one tap away. Clear cart status visible at all times.

**Alternatives Considered:**
- Expandable bottom sheet → Takes screen space when expanded
- Floating action button → Less clear cart status
- Top bar cart summary → Conflicts with header, less thumb-friendly

### 4. Card Layout Structure
**Decision:** Horizontal layout with responsive image hiding
- Viewport ≥ 375px: Image on left (80x80px), details on right
- Viewport < 375px: Image hidden, full-width details
- Details stacked: Name → Price → Quantity controls

**Rationale:** Horizontal layout is more space-efficient for cards with images. Hiding images on very small screens prevents cramped layouts and improves performance. Matches patterns from Deliveroo, Foodpanda mobile apps.

**Alternatives Considered:**
- Keep vertical layout → Takes more vertical space, fewer items visible
- Always show image → Cramped on 320px screens, poor UX
- Different breakpoint (350px) → 375px is iPhone SE (2nd gen+) standard

### 5. Font Size Increase
**Decision:** `text-base` (16px) → `text-lg` (18px) for item names

**Rationale:** Elderly-friendly without breaking horizontal layout. 12.5% increase improves readability while fitting within card constraints.

**Alternatives Considered:**
- `text-xl` (20px) → May cause text wrapping issues in horizontal layout
- `text-fluid-lg` (clamp) → More complex, inconsistent across items
- Keep `text-base` → Less accessible for target demographic

### 6. Button Symbol Language
**Decision:** Use "+" symbol only, no "加入" / "Add" text

**Rationale:** Universal symbol, saves space for quantity display. Reduces visual clutter.

**Alternatives Considered:**
- Keep "+ 加入" text → Clearer but takes space
- Icon only (no +) → Less clear for some users
- Language-specific text → Inconsistent width, layout issues

### 7. Quantity Control Layout
**Decision:** Horizontal layout: `[- N +]`
- Minus button: 36x36px (slightly smaller for space)
- Number: centered, monospace font
- Plus button: 36x36px
- Total width: ~120px

**Rationale:** Compact enough to fit next to price. Touch targets still adequate for most users.

**Alternatives Considered:**
- Full 44px buttons → Too wide for card layout
- Vertical stacking `[-]` / `[+]` → Takes too much vertical space
- Smaller buttons (32px) → Too small for elderly users

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Quantity controls too small for some users | Medium | Test with target demographic, consider 40px if 36px too small |
| Compact cart bar unclear to users | Low | Clear "已揀選" text, prominent checkout button |
| Accidental quantity changes | Medium | Add slight delay or confirmation for rapid taps |
| Layout breaks on small screens (320px) | Medium | Test on iPhone SE (1st gen), adjust spacing |
| Users miss cart expansion feature | Low | Compact bar always shows item count, familiar pattern |
| Image hiding may confuse users expecting photos | Low | Ensure text descriptions are clear, test with users |
| Horizontal layout reduces image size | Medium | Test image quality at 80x80px, ensure recognizable |

## Migration Plan

**Phase 1: Card Layout Restructure**
- Change from vertical to horizontal layout (flex row)
- Set image size to 80x80px fixed
- Add responsive image hiding (< 375px breakpoint)
- Stack details on right side (name → price → controls)

**Phase 2: Menu Item Card Update**
- Increase font size to `text-lg`
- Add quantity display logic (read from store)
- Replace Add button with quantity controls
- Test on mobile viewports

**Phase 2: Bottom Cart Bar**
- Simplify order-cart.tsx to compact bar
- Remove expansion/popup logic
- Add "已揀選 [X]" display
- Add "確認下單" button

**Phase 3: Integration**
- Connect quantity controls to store
- Test add/remove/adjust flows
- Verify checkout still works
- Test on real devices

**Phase 4: Polish**
- Adjust spacing and sizing based on testing
- Add subtle animations if needed
- Verify accessibility (touch targets, contrast)

**Rollback Strategy:**
- Revert component changes via git
- No database changes required
- Cart state compatible with old UI

## Open Questions

1. Should we add haptic feedback when adjusting quantity?
2. Should the bottom bar show total price in addition to item count?
3. What happens when quantity goes to 0 - show "+" immediately or after delay?
4. Should we add a "clear cart" option somewhere?
