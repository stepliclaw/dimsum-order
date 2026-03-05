# Implementation Plan: Mobile Ordering System

**Branch**: `001-mobile-ordering` | **Date**: 2026-03-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-mobile-ordering/spec.md`

## Summary

Build a mobile-first web application for elderly users to learn dim sum ordering. Users can browse menu items with photos and prices (tiered 小點/中點/大點/特點 or fixed HKD), add items to orders, view order history, and reorder with one tap. Bilingual support (English/Traditional Chinese) with language toggle. No authentication or payment required - demo/training focused.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18  
**Primary Dependencies**: Next.js 14, TailwindCSS, Shadcn/ui, Zustand  
**Storage**: localStorage (client-side only, no backend database)  
**Testing**: Jest, React Testing Library  
**Target Platform**: Mobile web browsers (iOS Safari, Android Chrome)  
**Project Type**: Mobile-first web application  
**Performance Goals**: First Contentful Paint < 1.5s, Time to Interactive < 3.5s, Bundle < 500KB gzipped  
**Constraints**: Offline-capable (localStorage), elderly-friendly UI (large text, simple flows), bilingual (i18n)  
**Scale/Scope**: Single-page app, ~50 menu items, session-based order history

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality | ✅ Pass | TypeScript strict mode, ESLint, Prettier enforced |
| II. Testing Standards | ✅ Pass | Unit tests for components/stores, integration tests for user flows |
| III. UX Consistency | ✅ Pass | Shadcn/ui components, WCAG 2.1 AA accessibility, bilingual support |
| IV. Performance | ✅ Pass | Next.js optimization, bundle size monitoring, FCP < 1.5s target |

### Code Quality Standards

- ✅ Static Analysis: ESLint with strict config
- ✅ Type Checking: TypeScript strict mode
- ✅ Formatting: Prettier with Husky pre-commit hook
- ✅ Security Scanning: npm audit, dependency updates

### Performance Requirements

- ✅ First Contentful Paint: < 1.5 seconds (Next.js optimization)
- ✅ Time to Interactive: < 3.5 seconds
- ✅ Bundle Size: < 500KB gzipped (tree-shaking, code splitting)
- ✅ Core Web Vitals: All "Good" thresholds

**GATE RESULT**: ✅ PASS - No violations, no complexity tracking needed

## Phase 0: Research Summary

**Completed**: All technical decisions documented in `research.md`

### Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 14 App Router | Mobile-first, image optimization, simple deployment |
| Styling | TailwindCSS + Shadcn/ui | Rapid development, accessible components, elderly-friendly |
| State | Zustand + localStorage | Minimal boilerplate, perfect for session-based demo |
| i18n | i18next | Industry standard, JSON-based, easy language switching |
| Types | TypeScript strict mode | Constitution requirement, better tooling |

### Alternatives Considered

- Create React App → Less optimized
- Redux Toolkit → Overkill for scope
- React Native → Requires app store distribution
- Material-UI → Heavier bundle

**All NEEDS CLARIFICATION items resolved**.

## Phase 1: Design Summary

**Completed**: Data model, contracts, and quickstart guide generated

### Artifacts Created

- `data-model.md`: Complete entity definitions with validation rules
- `contracts/menu-config.md`: Editable menu JSON schema
- `quickstart.md`: Developer onboarding guide

### Constitution Re-Check (Post-Design)

| Principle | Status | Validation |
|-----------|--------|------------|
| I. Code Quality | ✅ Pass | TypeScript strict, ESLint, Prettier configured |
| II. Testing | ✅ Pass | Jest + RTL for components/stores/integration |
| III. UX Consistency | ✅ Pass | Shadcn/ui, WCAG 2.1 AA, bilingual |
| IV. Performance | ✅ Pass | Next.js optimization, bundle < 500KB |

**All gates pass - ready for Phase 2 **(Task Generation)

## Project Structure

### Documentation (this feature)

```text
specs/001-mobile-ordering/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # Home/menu page
│   ├── orders/
│   │   └── page.tsx          # Order history page
│   ├── globals.css
│   └── i18n/
│       ├── en.json
│       └── zh-HK.json
├── components/
│   ├── ui/                   # Shadcn/ui components
│   ├── menu/
│   │   ├── menu-grid.tsx
│   │   ├── menu-item.tsx
│   │   └── category-filter.tsx
│   ├── order/
│   │   ├── order-cart.tsx
│   │   ├── order-summary.tsx
│   │   └── order-history.tsx
│   └── language-toggle.tsx
├── lib/
│   ├── store.ts              # Zustand state management
│   ├── types.ts              # TypeScript types
│   ├── menu-config.ts        # Menu JSON loader
│   └── utils.ts              # CN helper, formatters
├── public/
│   ├── images/
│   │   └── menu/             # Dim sum photos
│   └── menu.json             # Editable menu config
├── tests/
│   ├── components/
│   ├── stores/
│   └── integration/
├── next.config.js
├── tailwind.config.js
├── components.json           # Shadcn/ui config
└── package.json
```

**Structure Decision**: Single Next.js project with App Router. Chosen for:
- Mobile-first responsive design
- Built-in image optimization for menu photos
- Client-side state management (Zustand + localStorage)
- Simple deployment (Vercel or static export)
- No backend required for demo

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution principles satisfied with standard Next.js patterns.
