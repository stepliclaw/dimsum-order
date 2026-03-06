## Why

The current left sidebar acts as a category filter, hiding items from other categories when one is selected. This creates a fragmented browsing experience where users must repeatedly toggle categories to see the full menu. Changing the sidebar to navigation shortcuts (jump links) allows users to browse all items continuously while quickly jumping between category sections.

## What Changes

- **BREAKING**: Left sidebar changes from filter to navigation shortcuts (anchor links)
- All menu items always visible, organized by category order
- Clicking a category button scrolls smoothly to that section
- Clicking "全" (All) scrolls to the top of the menu
- Clicking the same category twice toggles back to "All" (scroll to top)
- Sidebar highlights the currently visible category section based on scroll position
- Mobile sidebar widened from 20% to 25-30% for better tap targets
- Desktop sidebar also changed to match mobile navigation pattern

## Capabilities

### New Capabilities
- `category-scroll-navigation`: Smooth scroll navigation to category sections via sidebar shortcuts
- `active-category-detection`: Auto-detect and highlight the currently visible category section based on scroll position

### Modified Capabilities
- `mobile-navigation`: Changing from category filter behavior to navigation shortcut behavior

## Impact

- `components/menu/menu-layout.tsx` - Remove filtering logic, change to grouped rendering
- `components/mobile/mobile-sidebar-nav.tsx` - Change from filter buttons to navigation shortcuts, widen sidebar
- `components/menu/sidebar-nav.tsx` - Desktop sidebar behavior change to match mobile
- Scroll behavior and intersection observer for active section detection
- User experience: continuous browsing instead of filtered views
