## 1. Order Confirmation Page Redesign

- [x] 1.1 Add "已下單" badge component at top of confirmation page
- [x] 1.2 Display order number prominently
- [x] 1.3 Display order timestamp in YYYY-MM-DD HH:mm format
- [x] 1.4 Display total amount with currency symbol
- [x] 1.5 Create item list section (name × quantity format)
- [x] 1.6 Implement language-aware item name lookup
- [x] 1.7 Handle unavailable items with fallback text
- [x] 1.8 Keep existing "View Orders" and "Menu" buttons
- [x] 1.9 Remove old confirmation page layout
- [ ] 1.10 Test checkout flow end-to-end

## 2. Order History Sidebar Button

- [x] 2.1 Add clipboard icon (📋) for order history
- [x] 2.2 Add conditional rendering logic (`orders.length > 0`)
- [x] 2.3 Position button below category buttons in sidebar
- [x] 2.4 Style button to match category buttons
- [x] 2.5 Add active state for `/orders` page
- [x] 2.6 Ensure 44x44px minimum touch target
- [ ] 2.7 Test visibility after first order placement
- [ ] 2.8 Test hidden state for new users

## 3. Order History Page Update

- [x] 3.1 Update order history page layout
- [x] 3.2 Display orders in reverse chronological order
- [x] 3.3 Show timestamp for each order
- [x] 3.4 Show order number for each order
- [x] 3.5 Display item list with quantities per order
- [x] 3.6 Show total amount per order
- [x] 3.7 Implement language-aware item names
- [x] 3.8 Add visual separators between orders
- [x] 3.9 Format items with "x" prefix for quantity

## 4. Empty State Implementation

- [x] 4.1 Create empty state component for order history
- [x] 4.2 Add empty state icon
- [x] 4.3 Add Chinese message "暫無訂單記錄"
- [x] 4.4 Add English message "No orders yet"
- [x] 4.5 Add "返回首頁" / "Return to Home" button
- [x] 4.6 Wire button to navigate to home page
- [ ] 4.7 Test empty state for new users

## 6. Styling and Layout

- [ ] 6.1 Style order confirmation badge
- [ ] 6.2 Style item list (no images, clean layout)
- [ ] 6.3 Style order history entries
- [ ] 6.4 Style empty state component
- [ ] 6.5 Ensure responsive layout on all viewports
- [ ] 6.6 Test on 320px viewport
- [ ] 6.7 Test on 375px viewport
- [ ] 6.8 Test on 414px viewport

## 7. Language Support

- [ ] 7.1 Verify Chinese item names display correctly
- [ ] 7.2 Verify English item names display correctly
- [ ] 7.3 Test language switching on confirmation page
- [ ] 7.4 Test language switching on order history page
- [ ] 7.5 Verify empty state messages in both languages
- [ ] 7.6 Verify "已下單" badge shows correct text

## 8. Testing

- [ ] 8.1 Test complete checkout flow
- [ ] 8.2 Test confirmation page displays all items correctly
- [ ] 8.3 Test order appears in history after checkout
- [ ] 8.4 Test sidebar button appears after first order
- [ ] 8.5 Test empty state for new users
- [ ] 8.6 Test with multiple orders
- [ ] 8.7 Test with 10+ items in single order
- [ ] 8.8 Test on iOS Safari
- [ ] 8.9 Test on Chrome Mobile
- [ ] 8.10 Verify no console errors

## 9. Cleanup

- [ ] 9.1 Remove unused imports
- [ ] 9.2 Update component comments
- [ ] 9.3 Remove debug console.log statements
- [ ] 9.4 Verify no TypeScript errors
- [ ] 9.5 Run build to verify no errors
