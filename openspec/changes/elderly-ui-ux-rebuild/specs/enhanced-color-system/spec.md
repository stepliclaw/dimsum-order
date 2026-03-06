## ADDED Requirements

### Requirement: High-Contrast Color Palette

The system SHALL implement a WCAG AAA compliant color palette with minimum contrast ratio of 7:1 for all interactive elements and critical UI components.

#### Scenario: Primary button contrast

- **WHEN** a user views a primary action button (e.g., "Add to Cart", "Checkout")
- **THEN** the button text and background color combination SHALL have a contrast ratio of at least 7:1

#### Scenario: Text readability on colored backgrounds

- **WHEN** text appears on any colored background (category badges, status indicators)
- **THEN** the text color SHALL provide WCAG AAA contrast (7:1 minimum) against that background

#### Scenario: Focus state visibility

- **WHEN** a user tabs to or focuses on an interactive element
- **THEN** the focus ring SHALL be clearly visible with high contrast (minimum 3px solid outline in high-contrast color)

### Requirement: Color-Coded Menu Categories

The system SHALL assign distinct, high-contrast colors to each of the 7 menu categories for quick visual recognition.

#### Scenario: Category badge color display

- **WHEN** a menu item is displayed with its category badge
- **THEN** the badge SHALL use the category's assigned color:
  - 蒸點 (Steamed): Red (#DC2626)
  - 腸粉 (Rice Rolls): Orange (#EA580C)
  - 包點 (Buns): Yellow (#CA8A04)
  - 煎炸 (Fried): Amber (#D97706)
  - 粥粉麵飯 (Rice & Noodle): Green (#16A34A)
  - 甜品 (Dessert): Purple (#9333EA)
  - 其他 (Other): Blue (#2563EB)

#### Scenario: Category filter color consistency

- **WHEN** a user views the category filter buttons
- **THEN** each filter button SHALL use the same color as its corresponding category badge

#### Scenario: Active category indication

- **WHEN** a category filter is selected/active
- **THEN** it SHALL have enhanced visual distinction (darker shade or filled background) while maintaining the category's base color

### Requirement: Enhanced Visual States

The system SHALL provide clear, color-based visual feedback for all interactive states (hover, active, disabled, loading).

#### Scenario: Hover state feedback

- **WHEN** a user hovers over any button or clickable element
- **THEN** the element SHALL change color/brightness by at least 15% to indicate interactivity

#### Scenario: Disabled state clarity

- **WHEN** a button or control is disabled (e.g., out of stock item, empty cart checkout)
- **THEN** it SHALL have reduced opacity (50%) and grayed-out color while maintaining readability

#### Scenario: Cart item status

- **WHEN** an item is added to cart
- **THEN** the cart indicator SHALL show a clear color change (e.g., badge color change or count badge in contrasting color)

#### Scenario: Success/error feedback

- **WHEN** an order is successfully placed
- **THEN** a green success indicator SHALL be displayed
- **WHEN** an error occurs
- **THEN** a red error indicator SHALL be displayed with clear visual distinction

### Requirement: Consistent Color Vocabulary

The system SHALL maintain a consistent color vocabulary across all pages and components to reduce cognitive load.

#### Scenario: Primary action consistency

- **WHEN** any primary action button appears in the system
- **THEN** it SHALL use the same primary color (not multiple different "primary" colors)

#### Scenario: Warning/danger consistency

- **WHEN** warning or danger states appear (e.g., delete, cancel, error)
- **THEN** they SHALL consistently use red/orange color family across all components

#### Scenario: Information consistency

- **WHEN** informational elements appear (e.g., tips, help text)
- **THEN** they SHALL consistently use blue color family
