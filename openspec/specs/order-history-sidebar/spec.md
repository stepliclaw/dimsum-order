## ADDED Requirements

### Requirement: Order history sidebar navigation
The system SHALL provide a navigation button in the left sidebar to access order history.

#### Scenario: Sidebar button visibility
- **WHEN** user has placed at least one order (`orders.length > 0`)
- **THEN** order history button is visible in the left sidebar

#### Scenario: Sidebar button hidden for new users
- **WHEN** user has no orders (`orders.length === 0`)
- **THEN** order history button is hidden

#### Scenario: Icon-only display
- **WHEN** order history button renders
- **THEN** it displays as an icon-only button (📋 clipboard)

#### Scenario: Button placement
- **WHEN** order history button renders in sidebar
- **THEN** it appears below category buttons

### Requirement: Order history navigation behavior
The system SHALL navigate to order history page when sidebar button is clicked.

#### Scenario: Click navigation
- **WHEN** user clicks order history sidebar button
- **THEN** navigate to `/orders` page

#### Scenario: Mobile touch target
- **WHEN** order history button renders on mobile
- **THEN** it has minimum 44x44px touch target

### Requirement: Sidebar visual consistency
The system SHALL maintain visual consistency with existing sidebar buttons.

#### Scenario: Button styling
- **WHEN** order history button renders
- **THEN** it uses same styling as category buttons (size, shape, hover)

#### Scenario: Active state
- **WHEN** user is on `/orders` page
- **THEN** order history button shows active state
