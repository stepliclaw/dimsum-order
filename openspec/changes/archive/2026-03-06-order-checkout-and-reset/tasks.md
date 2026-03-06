## 1. Store Action for Reset

- [x] 1.1 Add `clearOrders` action to useOrderStore in lib/store.ts
- [x] 1.2 Implement clearOrders to reset orders array to empty
- [x] 1.3 Verify clearOrders persists to localStorage (if using persist middleware)
- [x] 1.4 Test clearOrders resets state correctly

## 2. Checkout Modal Component

- [x] 2.1 Create CheckoutModal component in components/order/checkout-modal.tsx
- [x] 2.2 Add welcome message "歡迎光臨" / "Welcome"
- [x] 2.3 Add experience wish "希望你有一次愉快的體驗" / "Hope you have a pleasant experience"
- [x] 2.4 Add payment instruction "請前往收銀處付款" / "Please proceed to cashier for payment"
- [x] 2.5 Display grand total in HKD currency format
- [x] 2.6 Add "Start Over" / "重新開始" button
- [x] 2.7 Add modal close functionality (click outside or close button)
- [x] 2.8 Implement bilingual text based on UI language
- [x] 2.9 Style modal for mobile responsiveness

## 3. Checkout Button on Order History

- [x] 3.1 Add "Check Out" / "結帳" button to order history page
- [x] 3.2 Position button near grand total bar (fixed bottom)
- [x] 3.3 Add conditional rendering (show only when orders.length > 0)
- [x] 3.4 Wire button to open checkout modal
- [x] 3.5 Style button to match existing UI patterns
## 3. Checkout Button on Order History

- [x] 3.1 Add "Check Out" / "結帳" button to order history page
- [x] 3.2 Position button near grand total bar (fixed bottom)
- [x] 3.3 Add conditional rendering (show only when orders.length > 0)
- [x] 3.4 Wire button to open checkout modal
- [x] 3.5 Style button to match existing UI patterns
- [x] 3.6 Ensure 44px minimum touch target

## 4. Integration and Wiring

- [x] 4.1 Import CheckoutModal in app/orders/page.tsx
- [x] 4.2 Add modal state (open/close) to order history page
- [x] 4.3 Connect checkout button to open modal
- [x] 4.4 Connect "Start Over" button to clearOrders action
- [x] 4.5 Close modal automatically after orders are cleared
- [x] 4.6 Navigate to home page after reset
- [ ] 4.7 Verify sidebar order history button hides after reset

## 5. Bilingual Support

- [x] 5.1 Add translation keys for checkout modal text to i18n
- [x] 5.2 Add Chinese translations (歡迎光臨，希望你有一次愉快的體驗，etc.)
- [x] 5.3 Add English translations (Welcome, Hope you have..., etc.)
- [ ] 5.4 Test language switching with modal open
- [ ] 5.5 Verify "Check Out" / "結帳" button text switches correctly
- [ ] 5.6 Verify "Start Over" / "重新開始" button text switches correctly

## 6. Styling and Layout

- [x] 6.1 Style checkout modal with proper spacing and padding
- [x] 6.2 Ensure modal is centered on screen
- [x] 6.3 Style grand total display in modal (prominent, bold)
- [x] 6.4 Style "Start Over" button (consider secondary or destructive variant)
- [ ] 6.5 Test modal on 320px viewport
- [ ] 6.6 Test modal on 375px viewport
- [ ] 6.7 Test modal on 768px viewport (tablet)

## 7. Edge Cases and Error Handling

- [x] 7.1 Handle case where modal opens with zero orders (should not happen)
- [x] 7.2 Handle grand total calculation edge case (0 orders = $0.00)
- [ ] 7.3 Test rapid clicking of "Start Over" button
- [ ] 7.4 Test modal behavior with very long order lists
- [x] 7.5 Verify no console errors during modal open/close

## 8. Testing

- [ ] 8.1 Test checkout flow: orders exist → click checkout → modal opens
- [ ] 8.2 Test grand total accuracy in modal (matches bottom bar)
- [ ] 8.3 Test "Start Over" clears all orders
- [ ] 8.4 Test modal closes after reset
- [ ] 8.5 Test empty state appears after reset
- [ ] 8.6 Test checkout button hidden when no orders
- [ ] 8.7 Test sidebar button hidden after reset
- [ ] 8.8 Test language switching in modal
- [ ] 8.9 Test modal close by clicking outside
- [ ] 8.10 Test on iOS Safari
- [ ] 8.11 Test on Chrome Mobile
- [ ] 8.12 Verify no TypeScript errors

## 9. Cleanup

- [x] 9.1 Remove unused imports
- [x] 9.2 Update component comments
- [x] 9.3 Remove debug console.log statements
- [x] 9.4 Verify no TypeScript errors
- [x] 9.5 Run build to verify no errors
