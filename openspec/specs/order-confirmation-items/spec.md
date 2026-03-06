## ADDED Requirements

### Requirement: Order confirmation item list display
The system SHALL display a list of ordered items on the order confirmation page.

#### Scenario: Show ordered items with quantities
- **WHEN** user views order confirmation page
- **THEN** all items from the order are displayed with their quantities

#### Scenario: Language-aware item names
- **WHEN** UI language is Chinese
- **THEN** item names display in Chinese

#### Scenario: Language-aware item names in English
- **WHEN** UI language is English
- **THEN** item names display in English

#### Scenario: No images on confirmation
- **WHEN** item list renders
- **THEN** no item images are displayed

#### Scenario: No prices on confirmation
- **WHEN** item list renders
- **THEN** no prices are displayed (only name and quantity)

### Requirement: Order confirmation layout
The system SHALL display order confirmation with a clear visual hierarchy.

#### Scenario: Order placed badge
- **WHEN** confirmation page renders
- **THEN** "已下單" (Order Placed) badge is displayed at the top

#### Scenario: Order number display
- **WHEN** confirmation page renders
- **THEN** order number is displayed prominently

#### Scenario: Order timestamp display
- **WHEN** confirmation page renders
- **THEN** order timestamp is displayed in format YYYY-MM-DD HH:mm

#### Scenario: Total amount display
- **WHEN** confirmation page renders
- **THEN** total order amount is displayed with currency symbol

#### Scenario: Action buttons
- **WHEN** confirmation page renders
- **THEN** "View Orders" and "Menu" buttons are displayed at bottom

### Requirement: Unavailable item handling
The system SHALL handle cases where ordered items are no longer in the menu.

#### Scenario: Item removed from menu
- **WHEN** an ordered item is no longer in the menu
- **THEN** display "Unavailable Item" or similar fallback text

#### Scenario: Item name changes
- **WHEN** an item name has changed since order was placed
- **THEN** display current menu item name
