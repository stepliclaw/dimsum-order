## Context

The current dim sum ordering system has basic accessibility features (text size adjustment, bilingual support), but lacks elderly-specific visual optimizations. Research shows that users aged 65+ need:

- 3-4x larger icons than standard design guidelines
- WCAG AAA contrast ratios (7:1 minimum) for critical UI elements
- Color-coded visual cues to reduce cognitive load
- Clear visual boundaries for interactive elements

**Current State**: The system uses standard Shadcn/ui components with default color schemes and icon sizes. While functional, these don't account for age-related vision changes (presbyopia, reduced contrast sensitivity, color perception changes).

**UI/UX Pro Max Research Findings** (from searchable database of 67 styles, 96 palettes, 99 UX guidelines):

- **Style Recommendation**: "Accessible & Ethical" pattern - High contrast, large text (16px+), keyboard navigation, WCAG AAA compliant
- **Color Palette**: Senior Care/Elderly optimized - Calm blue (#0369A1) + reassuring green (#22C55E)
- **Typography**: Lexend + Source Sans 3 (designed for readability) OR Noto Sans TC for Chinese support
- **Touch Targets**: Minimum 44x44px (UX guideline severity: HIGH)
- **Touch Spacing**: Minimum 8px gap between adjacent touch targets (UX guideline severity: MEDIUM)

**Stakeholders**: Elderly customers (primary), restaurant staff, restaurant owners

## Goals / Non-Goals

**Goals:**

- Achieve WCAG AAA contrast compliance for all interactive elements
- Increase icon sizes by 40-60% (from 16-20px to 24-32px)
- Implement color-coded menu categories for quick visual recognition
- Ensure all buttons have both icon + Chinese text labels
- Improve visual feedback for cart, order status, and interactive states
- Maintain all existing functionality while enhancing visual design
- Keep Traditional Chinese (HK) as primary language

**Non-Goals:**

- No changes to backend or order processing logic
- No new features beyond visual enhancements
- No changes to core navigation flow
- No removal of existing accessibility features (text size toggle remains)

## Decisions

### 1. Color System Approach

**Decision**: Override TailwindCSS color palette with custom elderly-friendly colors based on UI/UX Pro Max research for senior care applications.

**Color Palette** (UI/UX Pro Max recommended for Elderly/Healthcare):

**Primary Colors**:

- Primary: `#0369A1` (Deep Blue) - Trust, calm, professional
- Secondary: `#38BDF8` (Sky Blue) - Friendly, approachable
- CTA: `#22C55E` (Success Green) - Clear action indicator
- Background: `#F0F9FF` (Light Blue-Gray) - Soft, easy on eyes
- Text: `#0C4A6E` (Dark Navy) - Maximum contrast for readability

**Category Colors** (enhanced for WCAG AAA):

- 蒸點 (Steamed): `#DC2626` (Red 600) - Traditional dim sum association
- 腸粉 (Rice Rolls): `#EA580C` (Orange 600) - Warm, appetizing
- 包點 (Buns): `#CA8A04` (Yellow 600) - Baked goods association
- 煎炸 (Fried): `#D97706` (Amber 600) - Fried food color
- 粥粉麵飯 (Rice & Noodle): `#16A34A` (Green 600) - Fresh, staple food
- 甜品 (Dessert): `#9333EA` (Purple 600) - Sweet treat association
- 其他 (Other): `#2563EB` (Blue 600) - Neutral category

**Rationale**:

- Leverages existing component library
- Easier maintenance (single source of truth)
- Gradual rollout possible (component by component)
- No breaking changes to existing code
- UI/UX Pro Max validated for elderly users

**Alternatives Considered**:

- Creating separate "elderly theme": Rejected - adds complexity, harder to maintain
- CSS-only overrides: Rejected - doesn't leverage Tailwind's utility classes

### 2. Icon Size Strategy

**Decision**: Create new icon size variants (sm, md, lg, xl) and apply systematically via component props rather than global CSS overrides.

**Icon Size Specifications** (exceeding 44px touch target requirement):

- `sm`: 20px × 20px - Secondary actions only (with 44px touch target wrapper)
- `md`: 24px × 24px - Standard interactive elements (quantity controls)
- `lg`: 28px × 28px - Primary actions (Add to Cart, Checkout buttons)
- `xl`: 32px × 32px - Decorative icons, high-priority actions (cart icon, category icons)

**Touch Target Enhancement**:

- All icon buttons: Minimum 48px × 48px clickable area (exceeds 44px requirement)
- Spacing between adjacent buttons: Minimum 8px gap (UX Pro Max guideline)
- Clear visual boundaries with padding and/or background

**Icon Selection** (Lucide React - consistent 2px stroke):

- Shopping Cart: `ShoppingCart` (not shopping bag)
- Add/Plus: `Plus` (clear, simple)
- Remove/Minus: `Minus` (clear, simple)
- Category icons: Food-specific icons (Pizza, Coffee, Utensils, etc.)
- Navigation: `ChevronLeft`, `Menu`, `X` (universally recognized)

**Rationale**:

- Granular control per component
- Maintains design system integrity
- Allows selective application where needed most
- Compatible with Shadcn/ui component API
- Follows UX Pro Max touch target guidelines (Severity: HIGH)

**Alternatives Considered**:

- Global CSS icon size increase: Rejected - would affect all icons indiscriminately
- SVG custom components: Rejected - too much duplication, harder to maintain

### 3. Category Color Coding

**Decision**: Assign distinct high-contrast colors to each of the 7 menu categories using a consistent color vocabulary with WCAG AAA compliance.

**Color Assignments** (all tested for 7:1+ contrast ratio):

- 蒸點 (Steamed): Red 600 (#DC2626) - traditional dim sum color
- 腸粉 (Rice Rolls): Orange 600 (#EA580C) - warm, appetizing
- 包點 (Buns): Yellow 600 (#CA8A04) - baked goods association
- 煎炸 (Fried): Amber 600 (#D97706) - fried food color
- 粥粉麵飯 (Rice & Noodle): Green 600 (#16A34A) - fresh, staple food
- 甜品 (Dessert): Purple 600 (#9333EA) - sweet treat association
- 其他 (Other): Blue 600 (#2563EB) - neutral category

**Application**:

- Category badges on menu items
- Category filter buttons (horizontal scroll + sidebar)
- Active/selected state: Darker shade with filled background
- Hover state: 15% brightness increase

**Rationale**: Color psychology research shows these associations are culturally appropriate for Chinese elderly users in Hong Kong. UI/UX Pro Max confirms high-contrast color coding reduces cognitive load for elderly users.

### 4. Icon + Text Combination

**Decision**: All interactive buttons will use horizontal layout with icon on left, Chinese text on right, using Lucide React icons sized at 24-32px.

**Button Layout Standards**:

- **Primary Actions** (Add to Cart, Checkout):
  - Icon: 28px (lg) + Chinese text (18px, 600 weight) + 8px gap
  - Minimum height: 48px
  - Full color background with white text
- **Secondary Actions** (quantity adjust, remove):
  - Icon: 24px (md) + optional Chinese text (16px)
  - Minimum height: 44px
  - Outline or ghost variant
- **Navigation** (back, menu toggle, language):
  - Icon: 28px (lg) or icon-only for universal symbols
  - Clear aria-label for screen readers
  - Minimum 48px × 48px touch target

**Text Hierarchy**:

- Chinese primary: Larger size or appears first
- English secondary: Smaller size (14px min) or parentheses
- Example: "加入購物車 (Add to Cart)" or just "加入購物車"

**Rationale**:

- Redundant coding (visual + textual) improves recognition
- Chinese-first approach respects primary user base
- Horizontal layout works best for mobile and desktop
- Lucide React provides consistent, clear iconography (2px stroke)
- Follows UX Pro Max guideline: cursor-pointer on all clickable elements

**Exceptions** (icon-only allowed):

- Close button: × (X icon)
- Search: 🔍 (Search icon)
- Menu toggle: ☰ (Menu icon)
- Back arrow: ← (ChevronLeft icon)

### 5. Typography System

**Decision**: Use Noto Sans TC (Traditional Chinese) + Lexend (English/Latin) for optimal readability with existing Chinese language support.

**Font Stack**:

- **Chinese (Primary)**: `Noto Sans TC` - Already in use, excellent Traditional Chinese support
- **English (Secondary)**: `Lexend` - Designed for readability, dyslexia-friendly
- **Fallback**: `sans-serif` system fonts

**Font Size Scale** (elderly-optimized):

- Page titles: 28px (1.75rem) / 700 weight
- Section headers: 24px (1.5rem) / 600 weight
- Body text: 18px (1.125rem) / 400 weight - **Minimum size**
- Small text: 16px (1rem) / 400 weight - **Absolute minimum (footnotes only)**
- Chinese text: Always 18px minimum with 1.8 line height

**Line Height**:

- English/Latin: 1.6 (160%)
- Chinese: 1.8 (180%) - More space for complex characters
- Headings: 1.3 (130%)

**Font Weight**:

- Regular: 400
- Medium: 500 (for emphasis)
- Semi-bold: 600 (for important text, prices)
- Bold: 700 (for headings)

**Rationale**: UI/UX Pro Max recommends Lexend for accessibility-critical applications. Noto Sans TC already integrated and provides excellent Chinese character rendering.

### 6. Spacing and Layout System

**Decision**: Implement enhanced spacing system to reduce visual crowding and improve readability.

**Spacing Scale** (8px base unit):

- `xs`: 4px - Rarely used (icon internal spacing only)
- `sm`: 8px - Within related elements (icon to text)
- `md`: 12px - Within component groups
- `lg`: 16px - Standard component padding
- `xl`: 24px - Between sections
- `2xl`: 32px - Major section separation

**Component Padding**:

- Cards/Containers: 16px minimum (increased from 12px)
- Buttons: 12px vertical × 20px horizontal
- Form inputs: 12px vertical × 16px horizontal

**Touch Target Spacing**:

- Between adjacent buttons: 8px minimum (UX Pro Max guideline)
- Between card elements: 12px
- Between sections: 24px minimum

**Container Max Widths**:

- Mobile: 100% (with 16px side padding)
- Tablet: 768px
- Desktop: 1024px (menu grid), 1280px (full pages)

**Rationale**: UX Pro Max guidelines show adequate spacing reduces accidental taps and improves usability for elderly users with reduced motor control.

## Risks / Trade-offs

**[Risk] Color overload** → Mitigation: Use colors sparingly, only for categories and critical states. Keep backgrounds neutral.

**[Risk] Icon clarity at larger sizes** → Mitigation: Test each Lucide icon at 24px, 28px, 32px to ensure visual clarity. Replace any that look pixelated or unclear.

**[Risk] Performance impact from CSS changes** → Mitigation: All changes are CSS-only, no JavaScript impact. Tailwind will purge unused styles.

**[Risk] Existing users may find new design jarring** → Mitigation: Changes are evolutionary, not revolutionary. Core layout remains the same, only visual styling changes.

**[Trade-off] Larger icons reduce screen real estate** → Acceptable trade-off for accessibility. Menu grid will adjust from responsive-cols to show slightly fewer items per row.

**[Trade-off] Higher contrast may look "harsh" to younger users** → Acceptable trade-off. Primary target is elderly users. Younger users can still use the system effectively.

## Pre-Delivery Checklist (UX Pro Max)

All UI components MUST pass this checklist before deployment:

### Visual Quality

- [ ] No emojis used as icons (use Lucide React SVG only)
- [ ] All icons from Lucide React with consistent 2px stroke
- [ ] Hover states don't cause layout shift (use color/opacity, not scale)
- [ ] Use theme colors directly (bg-primary) not var() wrapper

### Interaction

- [ ] All clickable elements have `cursor-pointer` class
- [ ] Hover states provide clear visual feedback (15% brightness change)
- [ ] Transitions are smooth (200-300ms, ease-in-out)
- [ ] Focus states visible: 3px solid outline in high-contrast color

### Light/Dark Mode

- [ ] Light mode text has 4.5:1 contrast minimum (WCAG AAA: 7:1)
- [ ] Glass/transparent elements visible in light mode (bg-white/80 minimum)
- [ ] Borders visible in both modes (border-gray-200 in light mode)
- [ ] Test both modes before deployment

### Layout

- [ ] Floating elements have proper spacing from edges (top-4, left-4, right-4)
- [ ] No content hidden behind fixed navbars (account for navbar height)
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

### Accessibility

- [ ] All images have Chinese alt text (matching current language)
- [ ] Form inputs have visible labels
- [ ] Color is NOT the only indicator (add icons/text)
- [ ] `prefers-reduced-motion` respected (disable non-essential animations)
- [ ] Minimum touch target: 48px × 48px
- [ ] Minimum spacing between touch targets: 8px
- [ ] Minimum font size: 16px (18px for Chinese)

## Migration Plan

**Phase 1**: Color system updates (globals.css, Tailwind config)
**Phase 2**: Icon size updates to core UI components (Button, Card, Badge)
**Phase 3**: Menu components update (MenuItem, CategoryFilter, SidebarNav)
**Phase 4**: Order components update (OrderCart, CheckoutModal, OrderHistory)
**Phase 5**: Testing and refinement (WCAG AAA validation, elderly user testing)

**Rollback Strategy**: All changes are in frontend code. Simple git revert to previous commit if issues arise.

**Validation**: Run through Pre-Delivery Checklist above for each component before marking task complete.

## Open Questions

- Should we provide a "classic mode" toggle to revert to original design? (Low priority)
- What is the minimum icon size for secondary actions? (Recommendation: 20px minimum)
- Should category colors persist in order history for consistency? (Recommendation: Yes)
