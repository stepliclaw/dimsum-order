## ADDED Requirements

### Requirement: Order history list display
The system SHALL display a chronological list of past orders on the order history page.

#### Scenario: Orders grouped by timestamp
- **WHEN** user views order history page
- **THEN** orders are displayed in reverse chronological order (newest first)

#### Scenario: Order timestamp format
- **WHEN** order entry renders
- **THEN** timestamp displays in format YYYY-MM-DD HH:mm

#### Scenario: Order number display
- **WHEN** order entry renders
- **THEN** order number is displayed (e.g., "Order #ABC123")

#### Scenario: Item list per order
- **WHEN** order entry renders
- **THEN** all items from that order are listed with quantities

#### Scenario: Language-aware item names
- **WHEN** UI language changes
- **THEN** item names in order history update to match current UI language

#### Scenario: Total amount display
- **WHEN** order entry renders
- **THEN** total order amount is displayed with currency symbol

### Requirement: Order history empty state
The system SHALL display an empty state when user has no order history.

#### Scenario: Empty state message
- **WHEN** user has no orders and views `/orders` page
- **THEN** display message "暫無訂單記錄" (Chinese) or "No orders yet" (English)

#### Scenario: Empty state icon
- **WHEN** empty state displays
- **THEN** show an illustrative icon (e.g., empty box, clipboard)

#### Scenario: Return to home button
- **WHEN** empty state displays
- **THEN** "返回首頁" / "Return to Home" button is shown

#### Scenario: Empty state navigation
- **WHEN** user clicks "Return to Home" button
- **THEN** navigate to home page `/`

### Requirement: Order history layout
The system SHALL display order history in a scannable, readable format.

#### Scenario: Visual separation between orders
- **WHEN** multiple orders are displayed
- **THEN** each order is visually separated (divider line or spacing)

#### Scenario: Item indentation
- **WHEN** items are listed under an order
- **THEN** items are indented or prefixed (e.g., with bullet or dash)

#### Scenario: Item quantity format
- **WHEN** item is displayed
- **THEN** quantity is shown with "x" prefix (e.g., "蝦餃 x 2")

### Requirement: Order history performance
The system SHALL handle order history efficiently for users with many orders.

#### Scenario: Initial load performance
- **WHEN** order history page loads
- **THEN** display orders within 1 second

#### Scenario: Large order history
- **WHEN** user has 50+ orders
- **THEN** consider pagination or virtual scrolling
