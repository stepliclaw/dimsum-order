## ADDED Requirements

### Requirement: Enhanced Visual Hierarchy

The system SHALL implement clear visual hierarchy using size, color, and spacing to guide elderly users through the ordering flow.

#### Scenario: Page title prominence

- **WHEN** a page loads with a main title
- **THEN** the title SHALL be the largest text element (minimum 28px) with high contrast and clear spacing from other content

#### Scenario: Section separation

- **WHEN** content is organized into sections (e.g., menu categories, cart items)
- **THEN** sections SHALL be visually separated using either color-coded headers, spacing (minimum 24px), or subtle background color differences

#### Scenario: Action priority indication

- **WHEN** multiple actions are available (e.g., "Add to Cart" vs "View Details")
- **THEN** the primary action SHALL have visual priority (larger size, more prominent color, better placement)

### Requirement: Improved Spacing and Layout

The system SHALL increase spacing between elements to reduce visual crowding and improve readability for elderly users.

#### Scenario: Component padding

- **WHEN** displaying cards or containers (e.g., menu item cards)
- **THEN** internal padding SHALL be increased to minimum 16px (from standard 12px)

#### Scenario: Element grouping

- **WHEN** related elements are grouped (e.g., quantity controls, item price and name)
- **THEN** spacing within groups SHALL be 8-12px, while spacing between groups SHALL be 16-24px

#### Scenario: Line height for readability

- **WHEN** displaying body text or descriptions
- **THEN** line height SHALL be at least 1.6 (160%) for improved readability

#### Scenario: Paragraph and section spacing

- **WHEN** multiple paragraphs or sections appear
- **THEN** vertical spacing SHALL be minimum 24px to clearly separate content blocks

### Requirement: Enhanced Typography for Elderly

The system SHALL optimize typography specifically for elderly users, building on existing text size features.

#### Scenario: Minimum font size enforcement

- **WHEN** any text is displayed in the system
- **THEN** the font size SHALL never be smaller than 16px (even for "small" text like footnotes)

#### Scenario: Chinese text optimization

- **WHEN** displaying Chinese characters
- **THEN** font size SHALL be at least 18px with appropriate line height (1.8 for Chinese text)

#### Scenario: Font weight for clarity

- **WHEN** displaying important text (prices, totals, warnings)
- **THEN** font weight SHALL be at least 600 (semi-bold) for emphasis

#### Scenario: Text transformation avoidance

- **WHEN** displaying labels or button text
- **THEN** text-transform: uppercase SHALL be avoided as it reduces readability for elderly users

### Requirement: Clear Interactive Feedback

The system SHALL provide unmistakable visual feedback for all user interactions to build confidence and reduce uncertainty.

#### Scenario: Button press feedback

- **WHEN** a user presses/taps a button
- **THEN** the button SHALL show immediate visual feedback (color change, shadow change, or scale change) within 100ms

#### Scenario: Loading state indication

- **WHEN** an action is processing (e.g., submitting order)
- **THEN** a clear loading indicator SHALL be shown with spinner icon (minimum 32px) and descriptive text

#### Scenario: Quantity change feedback

- **WHEN** a user adjusts item quantity
- **THEN** the quantity display SHALL update immediately with visual highlight (brief color flash or border pulse)

#### Scenario: Add to cart confirmation

- **WHEN** an item is added to cart
- **THEN** visual feedback SHALL be provided (e.g., cart icon animation, toast notification, or button state change)

### Requirement: Reduced Cognitive Load Design

The system SHALL minimize cognitive load by presenting information clearly and avoiding overwhelming users with too many choices at once.

#### Scenario: Progressive disclosure

- **WHEN** displaying menu items
- **THEN** items SHALL be organized by category with clear visual separation, showing 6-8 items per screen maximum

#### Scenario: Consistent layout patterns

- **WHEN** similar content appears (e.g., menu items, order history entries)
- **THEN** the layout pattern SHALL be consistent throughout the application

#### Scenario: Limited simultaneous actions

- **WHEN** presenting actions to users
- **THEN** no more than 3-4 primary actions SHALL be visible at once to avoid decision paralysis

#### Scenario: Clear current location

- **WHEN** user navigates to any page
- **THEN** the current location/page SHALL be clearly indicated (e.g., highlighted navigation, page title, breadcrumbs if needed)

### Requirement: Visual Accessibility Enhancements

The system SHALL implement additional visual accessibility features beyond WCAG compliance.

#### Scenario: Reduced motion option

- **WHEN** a user has system preference for reduced motion
- **THEN** animations SHALL be minimized or disabled (respect prefers-reduced-motion media query)

#### Scenario: Color-blind friendly design

- **WHEN** using color to convey information
- **THEN** color SHALL NOT be the only indicator; icons or text labels SHALL also convey the same information

#### Scenario: Dark text on light background default

- **WHEN** displaying body content
- **THEN** the default SHALL be dark text on light background (not light text on dark) for optimal readability

#### Scenario: Image alt text in Chinese

- **WHEN** menu item images are displayed
- **THEN** alt text SHALL be provided in Chinese (matching current language) for screen reader users

### Requirement: Consistent Visual Language

The system SHALL maintain a consistent visual language across all pages and components to build familiarity and reduce learning curve.

#### Scenario: Border radius consistency

- **WHEN** displaying cards, buttons, or containers
- **THEN** border radius SHALL be consistent (e.g., 8px for cards, 6px for buttons) throughout the application

#### Scenario: Shadow usage consistency

- **WHEN** using shadows for depth
- **THEN** shadow intensity SHALL follow consistent pattern (lighter for flat elements, stronger for elevated elements like cart bar)

#### Scenario: Animation timing consistency

- **WHEN** animations occur (hover, focus, transitions)
- **THEN** timing SHALL be consistent (200-300ms for most transitions) with ease-in-out easing

#### Scenario: Icon style consistency

- **WHEN** using icons throughout the application
- **THEN** all icons SHALL be from Lucide React library with consistent stroke width (2px) and style (outline, not filled)
