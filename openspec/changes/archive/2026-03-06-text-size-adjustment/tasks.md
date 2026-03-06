## 1. State Management Setup

- [x] 1.1 Create Zustand store for text size preference (useTextSizeStore)
- [x] 1.2 Add local storage persistence middleware to the store
- [x] 1.3 Implement system font size detection utility function
- [x] 1.4 Add store initialization logic (check storage, detect system, default to medium)
- [x] 1.5 Implement storage event listener for cross-tab synchronization

## 2. CSS Infrastructure

- [x] 2.1 Define CSS custom property --text-base-size on :root
- [x] 2.2 Create text size scale mapping (small: 0.875, medium: 1, large: 1.25)
- [x] 2.3 Add CSS class or data-attribute selector for text size on document root
- [x] 2.4 Create utility function to update CSS variable when size changes
- [x] 2.5 Integrate CSS variable update with Zustand store actions

## 3. UI Component Implementation

- [x] 3.1 Create TextSizeToggle component with dropdown menu
- [x] 3.2 Add Small (S), Medium (M), Large (L) options to toggle
- [x] 3.3 Implement visual indication for currently selected size (checkmark)
- [x] 3.4 Add "Reset to default" option to the toggle menu
- [x] 3.5 Create Settings icon button in header to trigger toggle
- [x] 3.6 Add mobile navigation integration for text size toggle
- [x] 3.7 Apply TailwindCSS styling for toggle component (Shadcn/ui patterns)

## 4. Global Text Application

- [x] 4.1 Update root layout to apply text size CSS variable
- [x] 4.2 Audit all components for hardcoded font sizes
- [x] 4.3 Replace hardcoded font sizes with relative units (rem/em)
- [x] 4.4 Update body/text-base typography class to use CSS variable
- [x] 4.5 Ensure heading hierarchy scales proportionally (h1-h6)
- [x] 4.6 Test text scaling on all Shadcn/ui components used in app

## 5. Component-Specific Updates

- [x] 5.1 Update menu item cards for text size compatibility
- [x] 5.2 Update navigation components (links, buttons, labels)
- [x] 5.3 Update form inputs and labels for text size changes
- [x] 5.4 Update modal/dialog components for text overflow
- [x] 5.5 Update product detail page text elements
- [x] 5.6 Update checkout flow text elements
- [x] 5.7 Update order summary and cart components

## 6. Layout Integrity

- [x] 6.1 Audit fixed-height containers for text overflow risks
- [x] 6.2 Replace fixed heights with min-height where appropriate
- [x] 6.3 Test all pages at small text size on mobile (320px)
- [x] 6.4 Test all pages at large text size on mobile (320px)
- [x] 6.5 Test all pages at large text size on tablet (768px)
- [x] 6.6 Fix any text truncation or overflow issues found
- [x] 6.7 Verify buttons and touch targets remain accessible at all sizes

## 7. Testing

- [x] 7.1 Test initial load without stored preference (default to medium)
- [x] 7.2 Test initial load with system font size != 16px
- [x] 7.3 Test text size change persists after page refresh
- [x] 7.4 Test text size change persists across different pages
- [x] 7.5 Test cross-tab synchronization (change in one tab reflects in others)
- [x] 7.6 Test in private/incognito browsing mode
- [x] 7.7 Test "Reset to default" functionality
- [x] 7.8 Verify no console errors during text size changes

## 8. Accessibility & Performance

- [x] 8.1 Run accessibility audit with text size at large setting
- [x] 8.2 Verify WCAG 1.4.4 compliance (text resize up to 200%)
- [x] 8.3 Test with screen reader at different text sizes
- [x] 8.4 Measure performance impact of CSS variable updates
- [x] 8.5 Check for layout shift when changing text sizes
- [x] 8.6 Verify color contrast remains adequate at all text sizes

## 9. Documentation

- [x] 9.1 Add TextSizeToggle component to Storybook
- [x] 9.2 Document text size feature in user-facing help/FAQ
- [x] 9.3 Update component documentation with text size usage
- [x] 9.4 Add text size testing checklist to QA documentation
