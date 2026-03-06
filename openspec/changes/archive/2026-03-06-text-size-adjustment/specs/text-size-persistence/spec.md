## ADDED Requirements

### Requirement: Local storage persistence
The system SHALL persist the user's text size preference in browser local storage.

#### Scenario: Preference save on change
- **WHEN** user selects a text size option
- **THEN** the selected value is immediately saved to local storage with key "dimsum-text-size"

#### Scenario: Preference retrieval on load
- **WHEN** application loads and a stored preference exists
- **THEN** the application reads the text size from local storage and applies it

#### Scenario: Stored value format
- **WHEN** text size is persisted to local storage
- **THEN** the value is stored as a string: "small", "medium", or "large"

### Requirement: Session persistence
The system SHALL maintain text size preference throughout the user session.

#### Scenario: Navigation persistence
- **WHEN** user navigates between pages within the application
- **THEN** the selected text size remains consistent across all pages

#### Scenario: State synchronization
- **WHEN** text size is changed in one browser tab
- **THEN** other open tabs of the same application reflect the change (via storage event)

### Requirement: Preference reset capability
The system SHALL allow users to reset text size to the default medium setting.

#### Scenario: Reset option availability
- **WHEN** user opens the text size toggle menu
- **THEN** a "Reset to default" option is available

#### Scenario: Reset execution
- **WHEN** user selects "Reset to default"
- **THEN** text size is set to "medium" and local storage is updated

### Requirement: Local storage error handling
The system SHALL handle local storage availability gracefully.

#### Scenario: Storage unavailable
- **WHEN** local storage is disabled or unavailable (private browsing, storage quota exceeded)
- **THEN** text size preference applies for current session only without error

#### Scenario: Storage recovery
- **WHEN** local storage becomes available after being unavailable
- **THEN** current text size preference is persisted on next change
