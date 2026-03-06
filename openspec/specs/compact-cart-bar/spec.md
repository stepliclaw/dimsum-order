## ADDED Requirements

### Requirement: Compact cart bar display
The system SHALL display a compact cart summary bar at the bottom of the screen when items are in cart.

#### Scenario: Bar visibility with items
- **WHEN** cart contains 1 or more items
- **THEN** compact cart bar is visible at bottom of screen

#### Scenario: Bar visibility without items
- **WHEN** cart contains 0 items
- **THEN** compact cart bar is hidden

#### Scenario: Fixed position
- **WHEN** cart bar is displayed
- **THEN** it remains fixed at bottom of viewport during scroll

### Requirement: Item count display
The system SHALL display the total number of items in the cart.

#### Scenario: Single item count
- **WHEN** cart contains 1 item total
- **THEN** display shows "已揀選 1" (Chinese) or "Selected 1" (English)

#### Scenario: Multiple item count
- **WHEN** cart contains multiple items
- **THEN** display shows "已揀選 [X]" where X is total quantity across all items

#### Scenario: Real-time count updates
- **WHEN** user adjusts quantity of any item
- **THEN** item count updates immediately

### Requirement: Checkout button
The system SHALL provide a checkout button in the compact cart bar.

#### Scenario: Button visibility
- **WHEN** cart bar is displayed
- **THEN** "確認下單" (Chinese) or "Confirm Order" (English) button is visible

#### Scenario: Button behavior
- **WHEN** user taps checkout button
- **THEN** order submission process begins (same as current checkout flow)

#### Scenario: Button styling
- **WHEN** checkout button renders
- **THEN** it is prominently styled and easily tappable

### Requirement: Cart bar dimensions
The system SHALL maintain compact dimensions for the cart bar to maximize menu browsing space.

#### Scenario: Bar height
- **WHEN** cart bar renders
- **THEN** height is approximately 56px (h-14)

#### Scenario: Full width
- **WHEN** cart bar renders
- **THEN** it spans full viewport width

#### Scenario: Content layout
- **WHEN** cart bar renders
- **THEN** item count is on left, checkout button is on right

### Requirement: No cart expansion
The system SHALL NOT expand the cart bar into a full panel.

#### Scenario: No popup on tap
- **WHEN** user taps cart bar
- **THEN** no popup or expansion occurs

#### Scenario: No separate cart view trigger
- **WHEN** cart bar is displayed
- **THEN** no additional action is needed to access checkout
