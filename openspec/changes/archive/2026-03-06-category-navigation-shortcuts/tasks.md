## 1. Remove Filtering Logic

- [x] 1.1 Remove filter-based item selection in menu-layout.tsx
- [x] 1.2 Change to always render all items grouped by category
- [x] 1.3 Remove "empty state" when category selected (no longer needed)
- [x] 1.4 Verify all menu items display correctly after removing filter

## 2. Implement Scroll Navigation

- [x] 2.1 Add ref objects for category section containers
- [x] 2.2 Add data-category attributes to section elements
- [x] 2.3 Update handleCategorySelect to use scrollIntoView()
- [x] 2.4 Implement smooth scroll behavior (behavior: 'smooth')
- [x] 2.5 Implement "All" button scroll to top functionality
- [x] 2.6 Implement toggle behavior (click same category = scroll to top)
- [ ] 2.7 Test scroll navigation on desktop browser
- [ ] 2.8 Test scroll navigation on mobile browser

## 3. Add Active Category Detection

- [x] 3.1 Set up IntersectionObserver in component
- [x] 3.2 Configure threshold to 0.3 (30% visibility)
- [x] 3.3 Configure rootMargin to account for header (top) and cart (bottom)
- [x] 3.4 Create activeCategory state variable
- [x] 3.5 Connect observer entries to activeCategory state
- [x] 3.6 Implement observer cleanup on component unmount
- [ ] 3.7 Test active category detection while scrolling
- [ ] 3.8 Test detection accuracy at section boundaries

## 4. Update Mobile Sidebar

- [x] 4.1 Widen mobile sidebar from 20% to 25% width
- [x] 4.2 Update sidebar container styles (w-[25%] or w-1/4)
- [x] 4.3 Update content area to account for new sidebar width (ml-[25%])
- [x] 4.4 Verify tap targets remain minimum 44x44px
- [x] 4.5 Update active category highlight styling
- [x] 4.6 Distinguish between "selected" (clicked) and "active" (in view) states
- [ ] 4.7 Test sidebar on smallest viewport (320px width)
- [ ] 4.8 Test sidebar on largest mobile viewport (767px width)

## 5. Update Desktop Sidebar

- [x] 5.1 Change desktop sidebar from filter to navigation shortcuts
- [x] 5.2 Remove filter-based category selection logic
- [x] 5.3 Connect desktop sidebar to same scroll navigation as mobile
- [x] 5.4 Connect desktop sidebar to same active category detection
- [x] 5.5 Verify visual consistency between mobile and desktop sidebars
- [ ] 5.6 Test desktop sidebar scroll navigation
- [ ] 5.7 Test desktop active category detection

## 6. Visual Styling Updates

- [ ] 6.1 Update "All" (全) button styling to distinguish from category buttons
- [ ] 6.2 Add hover states for sidebar buttons (desktop)
- [ ] 6.3 Add active category highlight color/style
- [ ] 6.4 Add selected category highlight color/style
- [ ] 6.5 Ensure highlights are visible in both light and dark modes
- [ ] 6.6 Test visual feedback during scroll animation

## 7. Testing & Quality Assurance

- [ ] 7.1 Test smooth scroll on iOS Safari (iPhone)
- [ ] 7.2 Test smooth scroll on Chrome Mobile (Android)
- [ ] 7.3 Test smooth scroll on desktop Chrome/Firefox/Safari
- [ ] 7.4 Verify IntersectionObserver performance (no lag during scroll)
- [ ] 7.5 Test with categories of varying heights (1 item vs 8 items)
- [ ] 7.6 Test rapid clicking of multiple category buttons
- [ ] 7.7 Test scroll behavior with keyboard (Page Up/Down, Home/End)
- [ ] 7.8 Verify no console errors or warnings
- [ ] 7.9 Test with all menu items available
- [ ] 7.10 Test with some menu items unavailable

## 8. Edge Cases & Error Handling

- [ ] 8.1 Handle case where category section ref is null
- [ ] 8.2 Handle case where category has zero items (show header or skip?)
- [ ] 8.3 Verify behavior if IntersectionObserver is not supported (fallback)
- [ ] 8.4 Test with very long category names
- [ ] 8.5 Test with very short content (fewer items than viewport height)

## 9. Documentation

- [ ] 9.1 Update component JSDoc comments to reflect navigation pattern
- [ ] 9.2 Document sidebar width decision in code comments
- [ ] 9.3 Document IntersectionObserver configuration rationale
- [ ] 9.4 Add usage examples to component documentation
