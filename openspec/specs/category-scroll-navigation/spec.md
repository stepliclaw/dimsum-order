## ADDED Requirements

### Requirement: Category section scroll navigation
The system SHALL provide smooth scroll navigation to category sections when sidebar buttons are clicked.

#### Scenario: Click category button scrolls to section
- **WHEN** user clicks a category button in the left sidebar
- **THEN** the page smoothly scrolls to display that category's section at the top of the content area

#### Scenario: Click All button scrolls to top
- **WHEN** user clicks the "全" (All) button in the sidebar
- **THEN** the page smoothly scrolls to the absolute top of the content area

#### Scenario: Smooth scroll animation
- **WHEN** scroll navigation is triggered
- **THEN** the scroll animation uses smooth easing behavior (not instant jump)

#### Scenario: Click same category toggles to All
- **WHEN** user clicks a category button that is already selected
- **THEN** the page scrolls back to the top (same as clicking "全")

#### Scenario: Navigation works on mobile
- **WHEN** user interacts with sidebar on mobile viewport (< 768px)
- **THEN** scroll navigation functions correctly with touch input

#### Scenario: Navigation works on desktop
- **WHEN** user interacts with sidebar on desktop viewport (≥ 768px)
- **THEN** scroll navigation functions correctly with mouse input

### Requirement: Category section structure
The system SHALL render all menu items grouped by category in the correct order.

#### Scenario: All categories displayed
- **WHEN** the menu renders
- **THEN** all categories from the configuration are displayed as sections

#### Scenario: Categories in correct order
- **WHEN** categories are displayed
- **THEN** they appear in ascending order by their `order` field value

#### Scenario: All items visible
- **WHEN** the menu renders
- **THEN** all available menu items are visible (no filtering)

#### Scenario: Items grouped by category
- **WHEN** items are displayed
- **THEN** they are grouped under their respective category section headers

#### Scenario: Category section has ref attribute
- **WHEN** a category section renders
- **THEN** it has a ref attribute for scroll navigation targeting

### Requirement: Sidebar button behavior
The system SHALL provide clear visual feedback for sidebar navigation buttons.

#### Scenario: Button shows category first character
- **WHEN** a category button renders
- **THEN** it displays the first character of the category name (in current UI language)

#### Scenario: All button shows 全 character
- **WHEN** the All button renders
- **THEN** it displays the character "全"

#### Scenario: Button has minimum touch target
- **WHEN** a sidebar button renders
- **THEN** it has minimum dimensions of 44x44px for touch accessibility

#### Scenario: Button provides hover state
- **WHEN** user hovers over a sidebar button (desktop)
- **THEN** the button shows a visual hover state
