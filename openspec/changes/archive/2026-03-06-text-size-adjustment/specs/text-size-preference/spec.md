## ADDED Requirements

### Requirement: Text size toggle UI
The system SHALL provide a user interface control for adjusting text size with three options: Small, Medium, and Large.

#### Scenario: Toggle visibility
- **WHEN** user accesses the settings menu in the header
- **THEN** text size toggle control is visible with Small, Medium, Large options

#### Scenario: Current selection indication
- **WHEN** text size toggle is displayed
- **THEN** the currently active text size option is visually indicated with a checkmark or highlight

#### Scenario: Size option labels
- **WHEN** text size options are displayed
- **THEN** options are labeled as "S", "M", "L" or "Small", "Medium", "Large"

### Requirement: Text size application
The system SHALL apply the selected text size globally across all UI components.

#### Scenario: Small text size application
- **WHEN** user selects "Small" text size
- **THEN** all text in the application renders at 0.875rem (14px) base size

#### Scenario: Medium text size application
- **WHEN** user selects "Medium" text size
- **THEN** all text in the application renders at 1rem (16px) base size

#### Scenario: Large text size application
- **WHEN** user selects "Large" text size
- **THEN** all text in the application renders at 1.25rem (20px) base size

#### Scenario: Instant application
- **WHEN** user selects a different text size option
- **THEN** text size changes take effect immediately without page reload

### Requirement: System preference initialization
The system SHALL detect and respect system font size preferences on first visit.

#### Scenario: System preference detection
- **WHEN** user visits the application for the first time (no stored preference)
- **THEN** system reads the browser's computed root font size

#### Scenario: System preference mapping
- **WHEN** system font size differs from 16px default
- **THEN** text size initializes to the closest matching option (small/medium/large)

#### Scenario: Default initialization
- **WHEN** system font size is 16px or cannot be determined
- **THEN** text size initializes to "Medium" as the default

### Requirement: Text size component availability
The system SHALL make the text size toggle available on all pages and viewports.

#### Scenario: Header placement
- **WHEN** application header is rendered
- **THEN** text size toggle is accessible via settings icon in the header

#### Scenario: Mobile availability
- **WHEN** application is viewed on mobile viewport (< 768px)
- **THEN** text size toggle remains accessible in mobile navigation menu

#### Scenario: Consistent access
- **WHEN** user navigates between pages
- **THEN** text size toggle remains accessible from the same location
