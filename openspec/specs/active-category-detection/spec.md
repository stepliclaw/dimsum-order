## ADDED Requirements

### Requirement: Active category detection
The system SHALL automatically detect and highlight the category section currently visible in the viewport.

#### Scenario: Detect visible category on scroll
- **WHEN** user scrolls through the menu content
- **THEN** the system detects which category section is currently most visible

#### Scenario: Highlight active category in sidebar
- **WHEN** a category section is detected as visible
- **THEN** the corresponding sidebar button is highlighted with a distinct visual style

#### Scenario: Detection threshold
- **WHEN** a category section is 30% or more visible in the viewport
- **THEN** it is considered the active category

#### Scenario: Account for header and cart offsets
- **WHEN** detecting visible category
- **THEN** the system accounts for the fixed header (top) and cart bar (bottom) in visibility calculations

#### Scenario: Active state updates during scroll
- **WHEN** user scrolls from one category to another
- **THEN** the active highlight transitions to the new category smoothly

#### Scenario: No false positives on section boundaries
- **WHEN** user scrolls at the boundary between two categories
- **THEN** only one category is highlighted as active (not both)

### Requirement: Active category visual feedback
The system SHALL provide clear visual distinction for the active category button.

#### Scenario: Active category distinct from selected
- **WHEN** a category is active (in view) vs selected (clicked)
- **THEN** the visual states are distinguishable

#### Scenario: Active highlight visible on mobile
- **WHEN** active category is detected on mobile viewport
- **THEN** the highlight is clearly visible in the narrow sidebar

#### Scenario: Active highlight visible on desktop
- **WHEN** active category is detected on desktop viewport
- **THEN** the highlight is clearly visible in the full sidebar

#### Scenario: Active state updates in real-time
- **WHEN** scrolling occurs
- **THEN** the active category highlight updates without noticeable delay

### Requirement: IntersectionObserver performance
The system SHALL use efficient observation methods for active category detection.

#### Scenario: Observer uses threshold configuration
- **WHEN** IntersectionObserver is initialized
- **THEN** it uses a threshold of 0.3 (30% visibility)

#### Scenario: Observer uses root margin
- **WHEN** IntersectionObserver is initialized
- **THEN** it applies root margins to account for fixed header and cart bar

#### Scenario: Observer cleanup on unmount
- **WHEN** the menu component unmounts
- **THEN** the IntersectionObserver is properly disconnected to prevent memory leaks

#### Scenario: Observer tracks all category sections
- **WHEN** the menu renders with N categories
- **THEN** the observer monitors all N category section elements
