# Research & Technical Decisions: Mobile Ordering System

**Date**: 2026-03-05  
**Branch**: `001-mobile-ordering`

## Technology Stack Decisions

### Decision: Next.js 14 (App Router)

**Rationale**:
- Mobile-first responsive design out of the box
- Built-in image optimization critical for menu photos
- Simple deployment options (Vercel, static export)
- Excellent TypeScript support
- Active community and Shadcn/ui compatibility

**Alternatives Considered**:
- Create React App: Less optimized, more configuration needed
- Vite + React: Good but requires manual routing setup
- React Native: Overkill for demo, requires app store distribution

---

### Decision: TailwindCSS + Shadcn/ui

**Rationale**:
- Rapid UI development with consistent design system
- Shadcn/ui provides accessible, pre-built components
- Easy customization for elderly-friendly styling (large text, high contrast)
- Tailwind's utility classes enable quick iterations
- Bundle size optimization through PurgeCSS

**Alternatives Considered**:
- Material-UI: Heavier bundle, less customization
- Chakra UI: Good accessibility but larger bundle
- Plain CSS: Slower development, harder consistency

---

### Decision: Zustand + localStorage

**Rationale**:
- Minimal boilerplate compared to Redux
- Perfect for simple session-based state (orders, language preference)
- Built-in localStorage persistence
- No backend required for demo
- Easy to test and debug

**Alternatives Considered**:
- Redux Toolkit: Overkill for this scope
- React Context: More verbose, no persistence
- Jotai: Similar but less mature ecosystem

---

### Decision: TypeScript Strict Mode

**Rationale**:
- Constitution requirement: "Strict type checking MUST be enabled"
- Catches errors at compile time
- Better IDE autocomplete and documentation
- Prevents `any` type abuse

**Alternatives Considered**:
- JavaScript with JSDoc: Less tooling support
- TypeScript with loose config: Defeats purpose of type safety

---

### Decision: i18next for Localization

**Rationale**:
- Industry standard for React i18n
- Simple JSON-based translation files
- Easy language switching at runtime
- Supports pluralization and formatting
- Well-maintained and documented

**Alternatives Considered**:
- next-i18next: More complex, geared toward SSR
- React-intl: Heavier, more verbose
- Custom solution: Reinventing the wheel

---

## Best Practices Research

### Mobile-First Design for Elderly Users

**Key Findings**:
- Minimum touch target: 44x44 pixels (Apple HIG)
- Font size: Minimum 16px body, 18-20px for primary actions
- Contrast ratio: WCAG AA requires 4.5:1 for normal text
- Simple navigation: Max 3 levels deep
- Clear visual feedback for all interactions

**Implementation**:
- Large buttons with icons + text
- High contrast color scheme
- Minimal text, more visuals
- Confirmation dialogs for orders
- Simple language (avoid jargon)

---

### Image Optimization for Menu Photos

**Key Findings**:
- Use WebP format with JPEG fallback
- Responsive images with `srcset`
- Lazy loading for menu grid
- Consistent aspect ratios
- Compress to < 100KB per image

**Implementation**:
- Next.js `<Image>` component handles optimization
- Store photos in `/public/images/menu/`
- Reference by filename in menu.json
- Generate thumbnails for grid view

---

### localStorage Persistence Strategy

**Key Findings**:
- Storage limit: ~5-10MB per origin
- Synchronous API (can block if large)
- No server sync for demo
- Clear on logout/session end (not applicable here)

**Implementation**:
- Store: orders array, language preference
- Serialize with `JSON.stringify()`
- Load on app initialization
- Handle storage full errors gracefully

---

### Tiered Pricing Model

**Key Findings**:
- Dim sum restaurants use point-based pricing (小點/中點/大點/特點)
- Each point = fixed HKD amount (e.g., 小點 = $18, 中點 = $24)
- Some premium items have fixed prices
- Display both tier name and HKD amount for clarity

**Implementation**:
- Menu item has `priceType` ('tier' | 'fixed')
- If tier: reference pricing table
- If fixed: use `price` value directly
- Display: "中點 ($24)" or "$88" (fixed)

---

## Integration Patterns

### Menu Configuration (JSON)

**Pattern**: Editable JSON file loaded at runtime

```json
{
  "categories": ["steamed", "fried", "dessert", "sets"],
  "pricing": {
    "小點": 18,
    "中點": 24,
    "大點": 32,
    "特點": 42
  },
  "items": [
    {
      "id": "har-gow",
      "name": { "en": "Shrimp Dumplings", "zh": "蝦餃" },
      "description": { "en": "...", "zh": "..." },
      "category": "steamed",
      "priceType": "tier",
      "tier": "中點",
      "photo": "har-gow.jpg"
    }
  ]
}
```

**Rationale**:
- Staff can edit without code changes
- Version control friendly
- Easy to validate schema
- No database required

---

### State Management with Zustand

**Pattern**: Centralized store with localStorage persistence

```typescript
interface OrderStore {
  orders: Order[]
  language: 'en' | 'zh'
  addItem: (item: MenuItem) => void
  submitOrder: () => void
  setLanguage: (lang: 'en' | 'zh') => void
}
```

**Rationale**:
- Single source of truth
- Easy to test in isolation
- Persist middleware for localStorage
- DevTools support for debugging

---

## Testing Strategy

### Unit Tests
- Component rendering (menu items, cart, order history)
- Store actions (add item, submit order, language toggle)
- Utility functions (price formatting, i18n)

### Integration Tests
- Full user flow: browse → add to cart → checkout → view history
- Language switching throughout app
- Reorder from history

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast validation
- Touch target sizes

---

## Performance Optimization

### Bundle Size
- Tree-shaking with ES modules
- Code splitting by route
- Dynamic imports for heavy components
- Shadcn/ui imports only used components

### Runtime Performance
- React.memo for menu grid items
- Virtual scrolling for long order history
- Debounced search/filter
- Image lazy loading

### Metrics Targets
| Metric | Target | Measurement |
|--------|--------|-------------|
| FCP | < 1.5s | Lighthouse |
| TTI | < 3.5s | Lighthouse |
| Bundle | < 500KB | Webpack Bundle Analyzer |
| LCP | < 2.5s | Lighthouse |

---

## Security Considerations

**Demo Context**: No authentication, no payment, no sensitive data

**Still Required**:
- Input sanitization (prevent XSS in menu JSON)
- CSP headers (Next.js config)
- Dependency vulnerability scanning (`npm audit`)
- No secrets in client-side code

---

## Deployment Options

### Option 1: Vercel (Recommended)
- Zero config deployment
- Automatic preview deployments
- Edge network for global performance
- Free tier sufficient for demo

### Option 2: Static Export
- `next export` for static hosting
- Works on Netlify, GitHub Pages
- No server-side features needed
- Full offline capability

### Option 3: Docker
- Containerized deployment
- Consistent environments
- More complex setup
- Overkill for demo

---

## Open Questions (Resolved)

All technical decisions documented above. No outstanding NEEDS CLARIFICATION items from spec.
