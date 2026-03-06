## ADDED Requirements

### Requirement: Bottom tab navigation on mobile
The system SHALL display a fixed bottom tab bar for primary navigation on mobile viewports.

#### Scenario: Bottom bar visibility
- **WHEN** viewport width is less than 768px
- **THEN** bottom tab bar is fixed at viewport bottom with 3-5 primary navigation items

#### Scenario: Active tab indication
- **WHEN** user navigates to a section
- **THEN** corresponding tab shows active state with icon and label highlight

#### Scenario: Tab bar content
- **WHEN** bottom tab bar renders
- **THEN** each tab displays icon above label with sufficient touch target (44x44px minimum)

### Requirement: Hamburger menu for secondary navigation
The system SHALL provide a collapsible hamburger menu for secondary navigation items on mobile.

#### Scenario: Menu toggle
- **WHEN** user taps hamburger icon
- **THEN** navigation drawer slides in from left or appears as modal overlay

#### Scenario: Menu dismissal
- **WHEN** user taps outside menu or close button
- **THEN** navigation drawer closes smoothly

#### Scenario: Secondary items
- **WHEN** menu is open
- **THEN** displays secondary navigation items (settings, help, about, etc.)

### Requirement: Desktop top navigation
The system SHALL display traditional top navigation bar on desktop viewports.

#### Scenario: Top bar visibility
- **WHEN** viewport width is 768px or greater
- **THEN** navigation displays as horizontal top bar with all items visible

#### Scenario: Navigation transition
- **WHEN** viewport crosses 768px breakpoint
- **THEN** navigation smoothly transitions between bottom tab and top bar layouts

### Requirement: Mobile navigation state persistence
The system SHALL maintain navigation state across viewport changes.

#### Scenario: Active route preservation
- **WHEN** user resizes browser or rotates device
- **THEN** current active route remains highlighted in new navigation layout
