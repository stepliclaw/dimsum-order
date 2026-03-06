## Context

The dimsum-order application uses Next.js 14 with TailwindCSS and Shadcn/ui components. While the current tech stack supports responsive design, the implementation lacks a systematic mobile-first approach. Mobile users represent a significant portion of traffic, requiring optimized touch interactions, viewport-aware layouts, and performance considerations for varying network conditions.

**Current State:**
- Next.js 14 app router structure
- TailwindCSS for styling (responsive utilities available but inconsistently applied)
- Shadcn/ui component library (default desktop-first patterns)
- Zustand for state management
- No dedicated mobile navigation patterns

**Constraints:**
- Must maintain backward compatibility with desktop users
- Performance budget: < 3s load time on 3G networks
- Support iOS Safari 15+, Chrome Mobile 90+, Samsung Internet 15+

## Goals / Non-Goals

**Goals:**
- Implement mobile-first responsive layout system using TailwindCSS breakpoints
- Create reusable responsive component patterns for consistent mobile UX
- Optimize touch targets (minimum 44x44px per Apple HIG)
- Add mobile navigation patterns (hamburger menu, bottom tabs)
- Ensure all interactive elements are accessible via touch and keyboard
- Achieve Lighthouse mobile performance score > 90

**Non-Goals:**
- Native mobile app development (PWA considerations for future)
- Major refactoring of existing business logic
- Backend API changes (responsive is frontend-only)
- Dark mode implementation (separate concern)

## Decisions

### 1. Mobile-First Breakpoint Strategy
**Decision:** Use TailwindCSS default breakpoints with mobile-first approach
- `sm` (640px): Large phones
- `md` (768px): Tablets
- `lg` (1024px): Small laptops
- `xl` (1280px): Desktops

**Rationale:** Industry standard, team familiarity, avoids custom configuration debt. Mobile-first CSS is more efficient (no media query for base mobile styles).

**Alternatives Considered:**
- Custom breakpoints aligned with specific devices → Too fragile, high maintenance
- Container queries → Browser support still maturing, can combine later

### 2. Navigation Pattern
**Decision:** Hybrid navigation approach
- Mobile (< 768px): Bottom tab bar for primary navigation + hamburger menu for secondary
- Desktop (≥ 768px): Traditional top navigation bar

**Rationale:** Bottom navigation is thumb-friendly for mobile users (Fitts's Law). Separating primary/secondary reduces cognitive load.

**Alternatives Considered:**
- Hamburger menu only on mobile → Hides navigation, reduces discoverability
- Top nav on all screens → Hard to reach on large phones

### 3. Touch Target Sizing
**Decision:** Enforce minimum 44x44px touch targets via Tailwind utility classes
- Create custom utility `.min-touch-target` in global CSS
- Apply to all buttons, links, form inputs, interactive cards

**Rationale:** Meets WCAG 2.1 AAA and Apple HIG standards. Prevents accidental taps.

**Alternatives Considered:**
- 48x48px (Material Design) → Slightly larger than needed, wastes screen real estate
- Dynamic sizing based on context → Complex, inconsistent UX

### 4. Image Optimization Strategy
**Decision:** Use Next.js Image component with responsive srcset
- Define explicit size mappings per breakpoint
- Implement lazy loading for below-fold images
- WebP format with JPEG fallback

**Rationale:** Built-in Next.js optimization, automatic srcset generation, reduces bundle size.

**Alternatives Considered:**
- Manual `<picture>` elements → Verbose, error-prone
- CDN-based responsive images → Additional dependency, cost

### 5. Component Architecture
**Decision:** Create responsive wrapper components
- `ResponsiveContainer`: Manages layout based on viewport
- `MobileOnly` / `DesktopOnly`: Conditional rendering helpers
- Extend Shadcn/ui components with responsive variants

**Rationale:** Encapsulates responsive logic, promotes DRY principle, easier testing.

**Alternatives Considered:**
- Inline responsive classes everywhere → Duplication, harder to maintain
- CSS-in-JS dynamic styles → Adds dependency, overkill for this use case

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Increased CSS bundle size | Medium | PurgeCSS in production, audit unused utilities |
| Navigation complexity on tablet breakpoint | Low | Test extensively at 768px boundary, user feedback |
| Touch interactions conflict with browser gestures | Medium | Prevent default on custom gestures, test on real devices |
| Performance regression on low-end devices | High | Performance budgets, Lighthouse CI, device lab testing |
| Shadcn/ui component overrides break on library updates | Medium | Pin versions, document customizations, visual regression tests |

## Migration Plan

**Phase 1: Foundation (Week 1)**
- Set up TailwindCSS breakpoint utilities
- Create responsive wrapper components
- Configure Next.js Image optimization

**Phase 2: Navigation (Week 2)**
- Implement mobile bottom tab bar
- Add hamburger menu for secondary navigation
- Test routing and state management

**Phase 3: Component Updates (Week 3-4)**
- Audit all existing components for mobile compatibility
- Apply responsive patterns to high-traffic pages first
- Touch target sizing audit

**Phase 4: Testing & Polish (Week 5)**
- Cross-browser testing on real devices
- Performance optimization
- Accessibility audit (aXe, screen readers)

**Rollback Strategy:**
- Feature flag responsive navigation toggle
- CSS can be reverted via config switch
- No database migrations required

## Open Questions

1. Should we implement pull-to-refresh for mobile lists? (UX enhancement vs. complexity)
2. Do we need offline support with service workers? (PWA consideration)
3. What's the minimum supported screen width? (320px vs. 360px)
4. Should animations be reduced on mobile for performance? (prefers-reduced-motion)
