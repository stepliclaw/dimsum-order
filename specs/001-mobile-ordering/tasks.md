# Tasks: Mobile Ordering System

**Input**: Design documents from `/specs/001-mobile-ordering/`  
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md, quickstart.md

**Tests**: Tests are OPTIONAL for this feature - not explicitly requested in spec. Tasks below focus on implementation only.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single Next.js project structure at repository root:
- `app/` - Next.js App Router pages
- `components/` - React components
- `lib/` - Utilities and state management
- `public/` - Static assets
- `tests/` - Test files

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize Next.js 14 project with TypeScript and App Router
- [x] T002 Install and configure TailwindCSS in tailwind.config.js
- [x] T003 [P] Install and configure Shadcn/ui (run npx shadcn-ui@latest init)
- [x] T004 [P] Install Zustand for state management (npm install zustand)
- [x] T005 [P] Install i18next and react-i18next for localization
- [x] T006 [P] Configure ESLint with strict TypeScript rules
- [x] T007 [P] Configure Prettier with Husky pre-commit hook
- [x] T008 [P] Create base project structure: app/, components/, lib/, public/

**Checkpoint**: ✅ Project initialized with all dependencies - ready for foundational setup

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T009 [P] Create TypeScript types in lib/types.ts (MenuItem, Order, OrderItem, LocalizedString, Category, PricingTier)
- [x] T010 [P] Create menu.json schema in public/menu.json with sample dim sum items
- [x] T011 [P] Create menu loader utility in lib/menu-config.ts with validation
- [x] T012 [P] Create Zustand store in lib/store.ts with localStorage persistence
- [x] T013 [P] Create utility functions in lib/utils.ts (cn helper, price formatter, order ID generator)
- [x] T014 [P] Create i18n configuration in app/i18n/ with en.json and zh-HK.json
- [x] T015 [P] Setup global styles with elderly-friendly defaults in app/globals.css (large fonts, high contrast)
- [x] T016 [P] Create root layout in app/layout.tsx with i18n provider and theme

**Checkpoint**: ✅ Foundation ready - all user stories can now proceed in parallel

---

## Phase 3: User Story 1 - Browse and Select Dim Sum Items (Priority: P1) 🎯 MVP

**Goal**: Users can browse menu items with photos, filter by category, and add items to cart with quantity adjustment

**Independent Test**: User can view menu, select 3+ items, adjust quantities, and see cart total update correctly

### Implementation for User Story 1

- [x] T017 [P] [US1] Create MenuItem component in components/menu/menu-item.tsx displaying photo, name, price, description
- [x] T018 [P] [US1] Create CategoryFilter component in components/menu/category-filter.tsx with bilingual labels
- [x] T019 [P] [US1] Create MenuGrid component in components/menu/menu-grid.tsx with responsive grid layout
- [x] T020 [P] [US1] Create OrderCart component in components/order/order-cart.tsx showing cart items with quantity controls
- [x] T021 [US1] Implement add/remove item actions in lib/store.ts (addItem, removeItem, updateQuantity)
- [x] T022 [US1] Implement unit price calculation with tier pricing support in lib/utils.ts
- [x] T023 [US1] Create home page in app/page.tsx with menu grid and cart display
- [x] T024 [US1] Add real-time cart total calculation in components/order/order-cart.tsx
- [x] T025 [P] [US1] Add sample menu photos in public/images/menu/ (placeholder.jpg for 20 items)
- [x] T026 [US1] Implement category filtering logic in app/page.tsx
- [x] T027 [US1] Add elderly-friendly styling: large touch targets (44px+), high contrast, clear labels

**Checkpoint**: ✅ User Story 1 complete - users can browse menu and build cart independently

---

## Phase 4: User Story 2 - View Order History (Priority: P2)

**Goal**: Users can view their submitted orders with full details and reorder with one tap

**Independent Test**: User can view order list, tap to see order details, and initiate reorder from any past order

### Implementation for User Story 2

- [x] T028 [P] [US2] Create OrderHistory component in components/order/order-history.tsx with list view
- [x] T029 [P] [US2] Create OrderSummary component in components/order/order-summary.tsx showing items, quantities, total
- [x] T030 [US2] Implement order submission action in lib/store.ts (submitOrder with order ID generation)
- [x] T031 [US2] Implement localStorage persistence for orders in lib/store.ts
- [x] T032 [US2] Create order history page in app/orders/page.tsx
- [x] T033 [US2] Implement reorder action in lib/store.ts (reorder function to copy order to cart)
- [x] T034 [US2] Add reorder button with one-tap functionality in components/order/order-history.tsx
- [x] T035 [US2] Add bilingual labels for order history UI in app/i18n/en.json and app/i18n/zh-HK.json
- [x] T036 [US2] Add order timestamp formatting in lib/utils.ts (relative time, date display)

**Checkpoint**: ✅ User Stories 1 AND 2 complete - users can browse, order, and view history independently

---

## Phase 5: User Story 3 - Place and Confirm Order (Priority: P3)

**Goal**: Users can review cart, submit order, and receive confirmation with order number

**Independent Test**: User can complete checkout flow, submit order, see confirmation with order number, and view order in history

### Implementation for User Story 3

- [x] T037 [P] [US3] Create OrderConfirmation component in components/order/order-confirmation.tsx with order number display
- [x] T038 [US3] Implement order ID generation in lib/utils.ts (format: ORD-YYYYMMDD-NNN)
- [x] T039 [US3] Add checkout/confirmation dialog in app/page.tsx triggered from cart
- [x] T040 [US3] Implement submitOrder flow with cart clearing in lib/store.ts
- [x] T041 [US3] Add order confirmation auto-navigation in app/page.tsx after submission
- [x] T042 [US3] Create order success page in app/orders/confirmation/page.tsx showing order details
- [x] T043 [US3] Add navigation from confirmation to order history in app/orders/confirmation/page.tsx
- [x] T044 [US3] Implement cart clearing after successful order in lib/store.ts
- [x] T045 [US3] Add bilingual confirmation messages in app/i18n/en.json and app/i18n/zh-HK.json

**Checkpoint**: ✅ All user stories complete - full ordering workflow functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall quality

- [x] T046 [P] Create sample menu.json with 15-20 dim sum items across all categories
- [x] T047 [P] Add placeholder menu photos for all sample items in public/images/menu/
- [x] T048 [P] Update quickstart.md with project-specific instructions
- [ ] T049 [P] Add performance monitoring setup (Lighthouse CI configuration)
- [ ] T050 [P] Run accessibility audit with axe-core and fix violations
- [x] T051 Code cleanup and remove unused imports
- [ ] T052 Performance optimization: lazy load images, optimize bundle size
- [ ] T053 Add error boundaries and graceful error states
- [ ] T054 Test language toggle throughout entire app flow
- [ ] T055 Validate elderly-friendly UX: font sizes, contrast ratios, touch targets
- [ ] T056 [P] Create README.md with project overview and setup instructions

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - Can proceed in parallel after Phase 2
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent, can run parallel with US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 cart functionality

### Within Each User Story

- Types and utilities before components
- Models/stores before UI components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003-T008)
- All Foundational tasks marked [P] can run in parallel (T009-T016)
- Once Foundational completes:
  - Developer A: User Story 1 (T017-T027)
  - Developer B: User Story 2 (T028-T036)
  - Developer C: Can help US1 or US3
- Within User Story 1: T017, T018, T019, T020 can run in parallel
- Within User Story 2: T028, T029 can run in parallel
- Within User Story 3: T037 can start early

---

## Parallel Example: User Story 1

```bash
# Launch all menu components for User Story 1 together:
Task: "T017 [P] [US1] Create MenuItem component in components/menu/menu-item.tsx"
Task: "T018 [P] [US1] Create CategoryFilter component in components/menu/category-filter.tsx"
Task: "T019 [P] [US1] Create MenuGrid component in components/menu/menu-grid.tsx"
Task: "T020 [P] [US1] Create OrderCart component in components/order/order-cart.tsx"

# Launch sample photos in parallel:
Task: "T025 [P] [US1] Add sample menu photos in public/images/menu/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test browsing menu, adding to cart, adjusting quantities
5. Demo MVP: Users can browse and build cart (no submission yet)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Browse menu, add to cart → Demo (MVP!)
3. Add User Story 2 → View order history, reorder → Demo
4. Add User Story 3 → Submit orders, confirmation → Complete flow
5. Polish Phase → Production ready

### Parallel Team Strategy

With 2 developers:

1. Developer A: Phase 1 + Phase 2 (foundation)
2. Developer B: Prepare menu.json and sample photos
3. After foundation:
   - Developer A: User Story 1 (browse + cart)
   - Developer B: User Story 2 (order history)
4. Both collaborate on User Story 3 (order submission)
5. Both: Polish phase

---

## Task Summary

| Phase | Task Count | Description |
|-------|------------|-------------|
| Phase 1: Setup | 8 | Project initialization |
| Phase 2: Foundational | 8 | Core infrastructure |
| Phase 3: User Story 1 | 11 | Browse and select (MVP) |
| Phase 4: User Story 2 | 9 | View order history |
| Phase 5: User Story 3 | 9 | Place and confirm order |
| Phase 6: Polish | 11 | Cross-cutting concerns |
| **Total** | **56** | Complete implementation |

### Task Count per User Story

- **User Story 1 (P1)**: 11 tasks - Menu browsing, cart management
- **User Story 2 (P2)**: 9 tasks - Order history, reorder
- **User Story 3 (P3)**: 9 tasks - Order submission, confirmation

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [US1], [US2], [US3] labels map tasks to specific user stories for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group of 2-3 tasks
- Stop at phase checkpoints to validate story independently
- Elderly-friendly design: prioritize large fonts, high contrast, simple flows
- Bilingual throughout: all UI text must have EN and ZH translations
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
