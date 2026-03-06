## Context

The dimsum-order application currently uses fixed font sizes defined in TailwindCSS configuration. Users with visual impairments, older adults, or those in challenging reading environments cannot adjust text to their comfort level. WCAG 2.1 Level AA requires text to be resizable up to 200% without loss of content or functionality (criterion 1.4.4).

**Current State:**
- Font sizes defined in TailwindCSS config (text-sm, text-base, text-lg, etc.)
- No user-controlled text scaling mechanism
- System font preferences not explicitly handled
- Zustand available for state management

**Constraints:**
- Must not break existing layouts when text size increases
- Performance impact should be minimal (no layout thrashing)
- Preference must persist across sessions
- Should work with existing responsive layout system

## Goals / Non-Goals

**Goals:**
- Provide 3 text size options: Small, Medium (default), Large
- Persist user preference in local storage
- Apply text size changes globally across all components
- Respect system font size preferences on first visit
- Maintain layout integrity at all text sizes
- Meet WCAG 1.4.4 compliance

**Non-Goals:**
- Per-component text size overrides (global setting only)
- More than 3 size tiers (keep it simple)
- Accessibility settings panel (standalone toggle for now)
- Print stylesheet adjustments

## Decisions

### 1. Text Size Scale Values
**Decision:** Use CSS custom properties with relative units
- Small: 0.875rem (14px base)
- Medium: 1rem (16px base) - default
- Large: 1.25rem (20px base)

**Rationale:** Using `rem` units ensures all text scales proportionally. CSS custom properties allow dynamic updates without component re-renders. 1.25rem large size provides ~25% increase, sufficient for most users without breaking layouts.

**Alternatives Considered:**
- Browser zoom → Already available, doesn't meet specific user need for text-only scaling
- Absolute pixel values → Doesn't respect user browser font settings
- Larger scale (up to 2rem) → Would require extensive layout refactoring

### 2. State Management
**Decision:** Use Zustand store with local storage persistence
- Create `useTextSizeStore` hook
- Persist to `localStorage` key: `dimsum-text-size`
- Initialize from system preference or default to 'medium'

**Rationale:** Zustand is already in use, lightweight, and integrates well with React. Local storage ensures preference persists across sessions.

**Alternatives Considered:**
- React Context → More boilerplate, Zustand already adopted
- Cookie storage → Unnecessary, no server-side need
- User profile storage → Overkill for UI preference, adds backend dependency

### 3. Implementation Approach
**Decision:** CSS custom property + TailwindCSS arbitrary values
- Define `--text-base-size` CSS variable on `:root`
- Update variable value when text size changes
- Use `calc()` and relative units throughout components

**Rationale:** CSS variables update instantly without React re-renders. Works with existing TailwindCSS setup. Minimal code changes required.

**Alternatives Considered:**
- Wrap all text in size-aware components → Too invasive, high refactoring cost
- CSS classes on body element → Requires !important overrides, less flexible
- Inline styles on every text element → Performance hit, verbose

### 4. UI Control Placement
**Decision:** Settings icon in header with text size toggle dropdown
- Add settings/gear icon to top navigation
- Dropdown menu with text size options (S / M / L)
- Show current selection with checkmark

**Rationale:** Settings is expected location for display preferences. Dropdown is compact and clear. Header placement makes it accessible from any page.

**Alternatives Considered:**
- Floating action button → Too prominent for preference setting
- Footer link → Hard to discover
- Keyboard shortcut only → Not discoverable, need visual control

### 5. System Preference Detection
**Decision:** Read system font size on first load only
- Use `getComputedStyle(document.documentElement).fontSize`
- If system differs from 16px default, initialize to closest matching option
- Subsequent loads use stored preference

**Rationale:** Respects user's system-level accessibility settings on first visit. Stored preference takes precedence on return visits (user explicitly chose).

**Alternatives Considered:**
- Always follow system preference → Ignores explicit user choice
- Never check system preference → Less accessible for new users

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Text overflow in fixed-width containers | Medium | Audit all containers, use min-height instead of fixed height |
| Layout shift when changing text size | Low | Test common viewport sizes, add transition animations |
| Performance degradation from CSS variable updates | Low | CSS variables are performant, measure with DevTools |
| Some components missed in rollout | Medium | Create audit checklist, visual regression testing |
| Large text breaks mobile layouts | High | Test at large size on smallest viewport (320px) |

## Migration Plan

**Phase 1: Infrastructure (Days 1-2)**
- Set up Zustand store with persistence
- Create CSS custom property structure
- Build TextSizeToggle component

**Phase 2: Global Application (Days 3-5)**
- Apply text size scaling to base typography
- Update all text-containing components
- Audit and fix overflow issues

**Phase 3: Testing (Days 6-7)**
- Test all pages at all 3 text sizes
- Verify persistence across sessions
- Accessibility audit

**Rollback Strategy:**
- Feature flag the text size toggle visibility
- CSS variables can default to medium without user control
- No database changes required

## Open Questions

1. Should we add an "Reset to default" option in the toggle?
2. Do we need to support RTL languages with text size changes?
3. Should text size preference sync across devices (requires backend)?
4. Add text size to user onboarding flow or keep discoverable-only?
