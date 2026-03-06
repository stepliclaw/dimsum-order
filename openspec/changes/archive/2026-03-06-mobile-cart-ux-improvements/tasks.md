## 1. Card Layout Restructure

- [x] 1.1 Change card container from vertical to horizontal flex layout
- [x] 1.2 Set image container to fixed 80x80px
- [x] 1.3 Add responsive breakpoint for 375px viewport
- [x] 1.4 Hide image when viewport < 375px
- [x] 1.5 Stack details (name, price, button) on right side
- [x] 1.6 Adjust card padding for horizontal layout
- [x] 1.7 Ensure proper spacing between image and details
- [ ] 1.8 Test layout on 320px viewport
- [ ] 1.9 Test layout on 375px viewport
- [ ] 1.10 Test layout on 414px viewport

## 2. Menu Item Card Updates

- [x] 2.1 Increase item name font size from text-base to text-lg
- [x] 2.2 Import useOrderStore to read item quantities
- [x] 2.3 Add quantity display logic (show 0 vs > 0)
- [x] 2.4 Replace "+ 加入" / "+ Add" button with "+" symbol only
- [x] 2.5 Add minus button for quantity > 0
- [x] 2.6 Add plus button for quantity adjustment
- [x] 2.7 Display current quantity number between buttons
- [x] 2.8 Wire minus button to decrease quantity
- [x] 2.9 Wire plus button to increase quantity
- [x] 2.10 Handle transition from 0 to 1 (show controls)
- [x] 2.11 Handle transition from 1 to 0 (hide controls)

## 3. Compact Cart Bar Implementation

- [x] 3.1 Remove expanded cart panel logic from order-cart.tsx
- [x] 3.2 Create compact bar layout (h-14, full width)
- [x] 3.3 Add "已揀選 [X]" display on left side
- [x] 3.4 Calculate total item count from cart items
- [x] 3.5 Add "確認下單" checkout button on right side
- [x] 3.6 Wire checkout button to existing onCheckout handler
- [x] 3.7 Add conditional rendering (show only when items > 0)
- [x] 3.8 Remove cart detail display from bottom panel
- [x] 3.9 Remove quantity controls from cart panel
- [x] 3.10 Remove remove item button from cart panel

## 4. Store Integration

- [x] 4.1 Verify useOrderStore provides quantity per item
- [x] 4.2 Connect menu card quantity display to store
- [x] 4.3 Connect plus button to addItem action
- [x] 4.4 Connect minus button to updateQuantity action
- [x] 4.5 Verify item count calculation is correct
- [ ] 4.6 Test real-time updates when quantity changes

## 5. Styling and Layout

- [x] 5.1 Style quantity control buttons (36x36px)
- [x] 5.2 Center quantity number between buttons
- [x] 5.3 Ensure touch targets meet minimum requirements
- [x] 5.4 Adjust card padding for new button layout
- [x] 5.5 Style compact cart bar (background, border)
- [x] 5.6 Style item count text (readable, clear)
- [x] 5.7 Style checkout button (prominent, full-height)
- [ ] 5.8 Test layout on 320px viewport
- [ ] 5.9 Test layout on 375px viewport
- [ ] 5.10 Test layout on 414px viewport

## 6. Language Support

- [x] 6.1 Verify "已揀選" shows in Chinese UI
- [x] 6.2 Add English translation "Selected"
- [x] 6.3 Verify "確認下單" shows in Chinese UI
- [x] 6.4 Add English translation "Confirm Order"
- [ ] 6.5 Test language switching with items in cart

## 7. Testing

- [ ] 7.1 Test adding item (0 → 1)
- [ ] 7.2 Test increasing quantity (1 → 2 → 3)
- [ ] 7.3 Test decreasing quantity (3 → 2 → 1)
- [ ] 7.4 Test removing last item (1 → 0)
- [ ] 7.5 Verify cart bar appears when adding first item
- [ ] 7.6 Verify cart bar disappears when removing last item
- [ ] 7.7 Test item count accuracy with multiple items
- [ ] 7.8 Test checkout button functionality
- [ ] 7.9 Test rapid tapping of +/- buttons
- [ ] 7.10 Test with unavailable items
- [ ] 7.11 Test scrolling with fixed cart bar
- [ ] 7.12 Test on iOS Safari
- [ ] 7.13 Test on Chrome Mobile

## 8. Edge Cases

- [ ] 8.1 Handle very long item names with new layout
- [ ] 8.2 Handle maximum quantity limits (if any)
- [ ] 8.3 Test with cart containing 99+ items
- [ ] 8.4 Verify layout doesn't break with price tiers
- [ ] 8.5 Test with all items unavailable

## 9. Cleanup

- [x] 9.1 Remove unused cart panel styles
- [x] 9.2 Remove unused imports
- [ ] 9.3 Update component comments/documentation
- [x] 9.4 Remove console.log statements if added
- [x] 9.5 Verify no TypeScript errors
