## Context

The current dimsum-order application uses a filter-based category navigation pattern. When a user selects a category from the left sidebar, only items from that category are displayed. This requires users to repeatedly switch categories to browse the full menu.

**Current State:**
- Left sidebar acts as a filter (mobile: 20% width, desktop: full sidebar)
- Selecting a category hides all other categories' items
- "All" button shows complete unfiltered list
- Selected category is highlighted in sidebar
- Menu items in `public/menu.json` are sorted by category order

**Constraints:**
- Maintain existing visual design and layout structure
- Keep mobile sidebar visible at all times (not a hamburger menu)
- Preserve touch target sizes (44px minimum)
- No URL hash routing required
- Smooth scroll performance on mobile devices

## Goals / Non-Goals

**Goals:**
- Change left sidebar from filter to navigation shortcuts (anchor links)
- Always display all menu items grouped by category
- Implement smooth scroll navigation to category sections
- Add auto-highlighting of currently visible category section
- Widen mobile sidebar to 25-30% for better tap targets
- Unify desktop and mobile sidebar behavior
- Implement toggle behavior (click same category = scroll to top)

**Non-Goals:**
- URL hash synchronization
- Visual separators between categories (beyond existing headers)
- Changing the overall layout structure (header, sidebar, content, cart)
- Adding new animations beyond smooth scroll
- Backend or API changes

## Decisions

### 1. Sidebar Width on Mobile
**Decision:** Increase from 20% to 25% (approximately 1/4 of screen)

**Rationale:** Navigation shortcuts are clicked more frequently than filters. Users need larger tap targets for quick navigation. 25% provides better usability while still leaving 75% for content area.

**Alternatives Considered:**
- 30% width → Takes too much space from content area on small screens
- Fixed pixel width (e.g., 80px) → Doesn't scale across different phone sizes
- Keep 20% → Too narrow for frequent navigation interaction

### 2. Scroll Navigation Implementation
**Decision:** Use `scrollIntoView()` with smooth behavior and refs

**Rationale:** Native browser API, no external dependencies needed. `scrollIntoView({ behavior: 'smooth', block: 'start' })` provides consistent cross-browser smooth scrolling.

**Alternatives Considered:**
- Manual scroll with `window.scrollTo()` and calculated offsets → More complex, error-prone
- External library (e.g., smooth-scroll) → Adds dependency for simple functionality
- CSS `scroll-behavior: smooth` → Less control, doesn't work with all scroll containers

### 3. Active Category Detection
**Decision:** Use IntersectionObserver with threshold 0.3 and root margins

**Rationale:** IntersectionObserver is performant (doesn't trigger on every scroll event) and provides accurate visibility detection. Threshold of 0.3 means category is "active" when 30% visible.

**Configuration:**
```typescript
{
  threshold: 0.3,
  rootMargin: '-80px 0px -80px 0px' // Account for header and bottom cart
}
```

**Alternatives Considered:**
- Scroll event listener with manual calculation → Performance concerns, complex
- Track last clicked category only → Doesn't update as user scrolls manually
- CSS `:scrolling` pseudo-class → Limited browser support

### 4. Toggle Behavior (Click Same Category Twice)
**Decision:** Clicking active category scrolls back to top (All)

**Rationale:** Provides quick way to return to beginning without finding and tapping "All" button. Follows common mobile app patterns (e.g., iOS status bar tap to scroll to top).

**Alternatives Considered:**
- Do nothing on second click → Less useful, no clear user feedback
- Re-scroll to same position → Confusing, no visible change
- Toggle filter on/off → Reintroduces filter complexity

### 5. "All" Button Behavior
**Decision:** Scroll to absolute top of content area

**Rationale:** Simplest mental model - "All" means "start from beginning". Consistent with toggle behavior.

**Alternatives Considered:**
- Create special "All Items" section at top → Duplicates content, confusing
- Show "All" as unselected state → Less clear than scrolling to top

### 6. Category Grouping Structure
**Decision:** Render categories in order with section headers

```tsx
{sortedCategories.map(category => (
  <section key={category.id} ref={refs[category.id]} data-category={category.id}>
    <h2>{category.name}</h2>
    {items.filter(item => item.category === category.id).map(item => ...)}
  </section>
))}
```

**Rationale:** Clean semantic HTML, works naturally with IntersectionObserver. Maintains existing visual hierarchy.

**Alternatives Considered:**
- Flat list with category headers → Harder to track sections
- Grid-based grouping → Breaks existing layout
- Virtual scrolling for performance → Overkill for ~27 items

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Scroll performance on low-end devices | Medium | Use IntersectionObserver (not scroll events), test on older phones |
| Category section heights vary significantly | Low | Accepted design - some categories naturally have more items |
| Users confused by non-filtering sidebar | Medium | Clear visual feedback (scroll animation), consider onboarding hint |
| IntersectionObserver browser support | Low | Polyfill available, but all target browsers support it (iOS Safari 12.2+, Chrome 69+) |
| Smooth scroll animation feels sluggish | Low | Native browser animation is usually optimized, test on target devices |
| Active category detection inaccurate | Medium | Tune threshold and rootMargin values based on testing |

## Migration Plan

**Phase 1: Remove Filtering Logic**
- Remove filter-based item selection in `menu-layout.tsx`
- Change to always render all items grouped by category
- Test that all items display correctly

**Phase 2: Implement Scroll Navigation**
- Add refs to category section containers
- Update sidebar click handlers to trigger `scrollIntoView()`
- Implement toggle behavior (click same = scroll to top)

**Phase 3: Add Active Category Detection**
- Set up IntersectionObserver in component
- Connect observer to sidebar highlight state
- Tune threshold and rootMargin values

**Phase 4: Update Sidebar Styling**
- Widen mobile sidebar from 20% to 25%
- Update desktop sidebar to match navigation pattern
- Test tap targets on mobile devices

**Phase 5: Testing**
- Test smooth scroll on various devices
- Verify active category detection accuracy
- Check performance with IntersectionObserver

**Rollback Strategy:**
- Revert to filter-based logic via feature flag
- Can quickly restore previous behavior from git
- No database or data changes required

## Open Questions

1. Should we add a visual indicator during scroll animation (e.g., briefly highlight target category)?
2. Should the "All" (全) button have special styling to distinguish it from category buttons?
3. What happens if a category has zero items? Show the section header anyway, or skip it?
4. Should we add haptic feedback on mobile when category buttons are tapped?
