## ADDED Requirements

### Requirement: Increased Base Icon Size

The system SHALL increase all interactive icons from standard size (16-20px) to elderly-friendly sizes (24-32px minimum).

#### Scenario: Primary action icons

- **WHEN** an icon appears on a primary action button (e.g., cart, checkout, add item)
- **THEN** the icon SHALL be at least 28px × 28px in size

#### Scenario: Secondary action icons

- **WHEN** an icon appears on a secondary action (e.g., quantity adjust, remove item)
- **THEN** the icon SHALL be at least 24px × 24px in size

#### Scenario: Navigation icons

- **WHEN** an icon is used for navigation (e.g., back arrow, menu toggle, language switch)
- **THEN** the icon SHALL be at least 28px × 28px in size

#### Scenario: Decorative icons

- **WHEN** an icon is used for decorative purposes only (e.g., category icons in headers)
- **THEN** the icon SHALL be at least 32px × 32px in size

### Requirement: Icon + Text Combination

The system SHALL display both icon and Chinese text labels for all interactive buttons, except for universally recognized symbols (close ×, search 🔍).

#### Scenario: Primary button layout

- **WHEN** a button has both icon and text
- **THEN** the layout SHALL be horizontal with icon on the left and text on the right, with 8px spacing between them

#### Scenario: Icon-only exceptions

- **WHEN** a button uses a universally recognized symbol (close ×, search 🔍, menu ☰)
- **THEN** it MAY be icon-only, but SHALL have clear aria-label for screen readers

#### Scenario: Chinese text priority

- **WHEN** displaying bilingual labels
- **THEN** Chinese text SHALL be primary (larger or first), with English as secondary if space permits

### Requirement: Icon Size Variants

The system SHALL define and use consistent icon size variants (sm, md, lg, xl) across all components.

#### Scenario: Small icon variant (sm)

- **WHEN** an icon size of "sm" is specified
- **THEN** it SHALL render at 20px × 20px (for secondary actions only)

#### Scenario: Medium icon variant (md)

- **WHEN** an icon size of "md" is specified
- **THEN** it SHALL render at 24px × 24px (standard interactive elements)

#### Scenario: Large icon variant (lg)

- **WHEN** an icon size of "lg" is specified
- **THEN** it SHALL render at 28px × 28px (primary actions)

#### Scenario: Extra-large icon variant (xl)

- **WHEN** an icon size of "xl" is specified
- **THEN** it SHALL render at 32px × 32px (decorative or high-priority actions)

### Requirement: Touch Target Enhancement

The system SHALL ensure all icon buttons have touch targets of at least 48px × 48px, with clear visual boundaries.

#### Scenario: Minimum touch target

- **WHEN** any icon button is rendered
- **THEN** its clickable/tappable area SHALL be at least 48px × 48px

#### Scenario: Visual boundary clarity

- **WHEN** an icon button is displayed
- **THEN** it SHALL have clear visual boundaries (padding, border, or background) so users can see the full touch target area

#### Scenario: Spacing between touch targets

- **WHEN** multiple icon buttons are adjacent (e.g., quantity controls)
- **THEN** there SHALL be at least 8px spacing between touch targets to prevent accidental taps

### Requirement: Icon Clarity and Recognition

The system SHALL use icons that are easily recognizable by elderly users, avoiding abstract or modern iconography.

#### Scenario: Icon selection criteria

- **WHEN** selecting icons for actions
- **THEN** preference SHALL be given to literal, representational icons over abstract ones (e.g., shopping cart 🛒 over bag 🛍️ for cart)

#### Scenario: Icon testing

- **WHEN** new icons are added to the system
- **THEN** they SHALL be tested for clarity at their intended display size (no pixelation, clear strokes)

#### Scenario: Lucide icon consistency

- **WHEN** using Lucide React icons
- **THEN** all icons SHALL use consistent stroke width (2px minimum for elderly visibility)

### Requirement: Cart and Order Status Icons

The system SHALL use enhanced icon sizes and colors for cart and order status indicators to provide clear visual feedback.

#### Scenario: Cart item count badge

- **WHEN** items are added to cart
- **THEN** the cart icon SHALL display a count badge in contrasting color (e.g., red badge on cart icon) with minimum 24px badge size

#### Scenario: Order confirmation icon

- **WHEN** an order is successfully placed
- **THEN** a large checkmark icon (minimum 48px) SHALL be displayed with success color (green)

#### Scenario: Order history status icons

- **WHEN** displaying order history
- **THEN** each order SHALL have a status icon (completed, pending, cancelled) with minimum 28px size and appropriate color
