## ADDED Requirements

### Requirement: Inline quantity display on menu cards
The system SHALL display the current quantity of each menu item directly on the menu card.

#### Scenario: Quantity zero display
- **WHEN** an item has quantity 0 in cart
- **THEN** the card shows only a "+" button

#### Scenario: Quantity greater than zero display
- **WHEN** an item has quantity > 0 in cart
- **THEN** the card shows "[- N +]" where N is the current quantity

#### Scenario: Real-time quantity updates
- **WHEN** user adjusts quantity of an item
- **THEN** the display updates immediately to reflect new quantity

### Requirement: Inline quantity adjustment
The system SHALL allow users to adjust item quantity directly from the menu card.

#### Scenario: Add first item
- **WHEN** user taps "+" on an item with quantity 0
- **THEN** item quantity becomes 1 and display changes to "[- 1 +]"

#### Scenario: Increase quantity
- **WHEN** user taps "+" on an item with quantity > 0
- **THEN** item quantity increases by 1

#### Scenario: Decrease quantity
- **WHEN** user taps "-" on an item with quantity > 1
- **THEN** item quantity decreases by 1

#### Scenario: Remove last item
- **WHEN** user taps "-" on an item with quantity 1
- **THEN** item quantity becomes 0 and display changes to "[+]"

### Requirement: Touch target sizing for quantity controls
The system SHALL provide adequate touch targets for quantity adjustment buttons.

#### Scenario: Plus button minimum size
- **WHEN** quantity controls are displayed
- **THEN** the "+" button has minimum dimensions of 36x36px

#### Scenario: Minus button minimum size
- **WHEN** quantity controls are displayed
- **THEN** the "-" button has minimum dimensions of 36x36px

#### Scenario: Button spacing
- **WHEN** quantity controls are displayed
- **THEN** buttons have adequate spacing to prevent accidental taps

### Requirement: Item name font size
The system SHALL display menu item names at an increased font size for readability.

#### Scenario: Mobile item name size
- **WHEN** menu card renders on mobile viewport (< 768px)
- **THEN** item name displays at `text-lg` (18px) font size

#### Scenario: Line clamping for long names
- **WHEN** item name exceeds available space
- **THEN** name is clamped to 2 lines maximum with ellipsis

### Requirement: Button symbol display
The system SHALL use universal symbols for quantity controls.

#### Scenario: Plus symbol
- **WHEN** add/increase button renders
- **THEN** it displays "+" symbol without additional text

#### Scenario: Minus symbol
- **WHEN** decrease button renders
- **THEN** it displays "-" symbol

#### Scenario: Language independence
- **WHEN** UI language changes between Chinese and English
- **THEN** quantity control symbols remain "+" and "-"
