## ADDED Requirements

### Requirement: Horizontal card layout
The system SHALL display menu item cards with a horizontal layout on mobile viewports.

#### Scenario: Image on left
- **WHEN** viewport width is ≥ 375px
- **THEN** image displays on left side of card (80x80px fixed size)

#### Scenario: Details on right
- **WHEN** card renders with horizontal layout
- **THEN** item name, price, and quantity controls display on right side

#### Scenario: Vertical stacking of details
- **WHEN** details section renders
- **THEN** elements stack vertically: name → price → quantity controls

### Requirement: Responsive image hiding
The system SHALL hide images on small viewports to optimize space usage.

#### Scenario: Image visible on standard mobile
- **WHEN** viewport width is ≥ 375px
- **THEN** image is visible in card layout

#### Scenario: Image hidden on small mobile
- **WHEN** viewport width is < 375px
- **THEN** image is hidden and details use full card width

#### Scenario: Smooth transition between breakpoints
- **WHEN** viewport crosses 375px breakpoint
- **THEN** layout adapts without visual glitches

### Requirement: Image sizing
The system SHALL display menu item images at a fixed size for consistency.

#### Scenario: Fixed image dimensions
- **WHEN** image is displayed
- **THEN** it renders at 80x80px fixed size

#### Scenario: Image aspect ratio
- **WHEN** source image has different aspect ratio
- **THEN** image is cropped to square using object-cover

#### Scenario: Image quality
- **WHEN** image renders at 80x80px
- **THEN** it remains clear and recognizable

### Requirement: Card width and spacing
The system SHALL maintain consistent card dimensions for grid layouts.

#### Scenario: Full width on small screens
- **WHEN** viewport is < 375px
- **THEN** card uses full available width

#### Scenario: Grid layout on standard screens
- **WHEN** viewport is ≥ 375px
- **THEN** cards display in responsive grid (1-2 columns based on width)

#### Scenario: Card padding
- **WHEN** card renders
- **THEN** consistent padding is applied for visual rhythm
