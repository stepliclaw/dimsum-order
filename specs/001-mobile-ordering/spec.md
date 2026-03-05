# Feature Specification: Mobile Ordering System

**Feature Branch**: `001-mobile-ordering`  
**Created**: 2026-03-05  
**Status**: Draft  
**Input**: User description: "Dimsum Order v1是一個手機點餐，顧客透過手機瀏覽及揀選點心，顧客可以檢視已下單食物"

## User Scenarios & Testing

### User Story 1 - Browse and Select Dim Sum Items (Priority: P1)

**Description**: Customer opens the mobile app and browses available dim sum items, viewing details like name, price, image, and description. Customer can select items and add them to their order.

**Why this priority**: This is the core functionality of the ordering system. Without the ability to browse and select items, the app cannot fulfill its primary purpose.

**Independent Test**: User can successfully view the menu, select at least 3 different dim sum items, and see them added to a virtual cart with correct quantities and prices.

**Acceptance Scenarios**:

1. **Given** the app is open, **When** user navigates to the menu, **Then** all available dim sum items are displayed with name, photo, and price
2. **Given** user is viewing a dim sum item, **When** user taps "Add to Order", **Then** the item is added to the order with quantity 1
3. **Given** an item is in the order, **When** user increases quantity, **Then** the quantity updates and total price recalculates
4. **Given** user is browsing, **When** user filters by category, **Then** only items in that category are shown

---

### User Story 2 - View Order History (Priority: P2)

**Description**: Customer can view their submitted orders from the current session. Each order shows items, quantities, prices, and submission time.

**Why this priority**: Allows customers to verify what they ordered. Essential for building confidence in the mobile ordering process.

**Independent Test**: User can view a list of orders they placed, tap on any order to see details including items and total price.

**Acceptance Scenarios**:

1. **Given** user has placed orders, **When** user navigates to "My Orders", **Then** a list of all orders is displayed with date and total
2. **Given** user has orders, **When** user views order details, **Then** order items, quantities, prices, and submission time are shown
3. **Given** user is viewing an order, **When** user wants to order again, **Then** user can place the same order with one tap

---

### User Story 3 - Place and Confirm Order (Priority: P3)

**Description**: Customer reviews their selected items, confirms quantities, and submits the order. Customer receives order confirmation with order number.

**Why this priority**: Completes the ordering workflow. While browsing and viewing orders are valuable, the ability to actually place an order is the ultimate goal.

**Independent Test**: User can complete the checkout flow, submit an order, and receive a confirmation with order details.

**Acceptance Scenarios**:

1. **Given** user has items in cart, **When** user proceeds to checkout, **Then** order summary with all items, quantities, and total price is displayed
2. **Given** user confirms order, **When** order is submitted, **Then** confirmation screen shows order number, items, and total
3. **Given** order is placed, **When** user views "My Orders", **Then** the new order appears in the list

---

### Edge Cases

- What happens when an item becomes unavailable while user is browsing?
- How does system handle network disconnection during order placement?
- How does system handle duplicate simultaneous orders from same user?
- What happens when menu items are updated while user has them in cart?

## Requirements

### Functional Requirements

- **FR-001**: System MUST display all available dim sum items with name, photo, price, and description
- **FR-002**: System MUST support tiered pricing (小點/中點/大點/特點) and specific HKD prices for individual items
- **FR-003**: System MUST support both English and Traditional Chinese with language toggle
- **FR-004**: Users MUST be able to add items to their order and adjust quantities
- **FR-005**: System MUST calculate and display real-time order total including all items
- **FR-006**: System MUST allow users to view their order history
- **FR-007**: System MUST allow users to view detailed order information (items, quantities, prices, timestamp)
- **FR-008**: System MUST allow users to submit orders and receive confirmation
- **FR-009**: System MUST generate unique order numbers for tracking
- **FR-010**: System MUST save orders to order history for viewing
- **FR-011**: System MUST allow users to reorder from order history with one tap
- **FR-012**: System MUST handle multiple concurrent users placing orders
- **FR-013**: System MUST display all text in user's selected language (English or Traditional Chinese)
- **FR-014**: System MUST load menu items from editable JSON configuration file

### Key Entities

- **Dim Sum Item**: Menu item with name, description, price type (tier or fixed), price value, category, photo
- **Order**: Collection of items with quantities, submission timestamp, unique order number
- **Order Item**: Specific item within an order with quantity and unit price

## Pricing Model

- **Tiered pricing**: Most items use 小點/中點/大點/特點 (Small/Medium/Large/Special points)
- **Fixed pricing**: Some items have specific HKD prices
- **Price display**: Show tier name or HKD amount based on item type

## User Accounts

- **No account required**: Users can browse menu and place orders without registration
- **Demo mode**: System designed for training elderly users - simplicity prioritized over security
- **Session persistence**: Orders visible during session for reordering

## Localization

- **Languages**: English and Traditional Chinese
- **Language toggle**: Users can switch languages at any time
- **Elderly-friendly**: Large text, clear labels, minimal jargon

## Assumptions

- Users have smartphones with internet connectivity
- Menu items are managed via simple JSON configuration file
- System is a demo for training purposes - no real transactions
- No payment processing required - demo focuses on ordering flow only

## Clarifications

### Session 2026-03-05

- Q: How should users authenticate to access the ordering system? → A: No authentication - simple demo for elderly
- Q: What happens after a user submits an order in this demo system? → A: No status updates - order history only
- Q: How should payment be handled in this demo system? → A: No payment - customers can reorder multiple times
- Q: What language(s) should the demo interface support? → A: English and Traditional Chinese toggle
- Q: How should the dim sum menu data be provided to the app? → A: Simple JSON config file editable by staff
- Q: What information should menu items display? → A: Name and photo required (plus price, description, category)
- Q: How should pricing work for dim sum items? → A: Most items use 小點/中點/大點/特點 tiers, some have specific HKD prices
