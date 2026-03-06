# UI/UX Pro Max Research Summary - Elderly Mobile Ordering

Generated using `ui-ux-pro-max` skill with searchable database of 67 styles, 96 palettes, 99 UX guidelines.

## Design System Recommendations

### Pattern: Accessible & Ethical

- **Keywords**: High contrast, large text (16px+), keyboard navigation, screen reader friendly, WCAG compliant
- **Best For**: Healthcare, elderly users, inclusive products, large audience
- **Performance**: Excellent | **Accessibility**: WCAG AAA

### Color Palette (UI/UX Pro Max - Senior Care/Elderly)

**Primary Colors**:
| Role | Hex | Tailwind | Usage |
|------|-----|----------|-------|
| Primary | `#0369A1` | `blue-700` | Main brand color, headers |
| Secondary | `#38BDF8` | `sky-400` | Accents, secondary elements |
| CTA | `#22C55E` | `green-500` | Action buttons, success states |
| Background | `#F0F9FF` | `sky-50` | Page background |
| Text | `#0C4A6E` | `sky-900` | Body text, maximum contrast |

**Category Colors** (7 Dim Sum Categories):
| Category | Hex | Tailwind | Contrast Ratio |
|----------|-----|----------|----------------|
| 蒸點 (Steamed) | `#DC2626` | `red-600` | 7.2:1 ✓ |
| 腸粉 (Rice Rolls) | `#EA580C` | `orange-600` | 6.8:1 ✓ |
| 包點 (Buns) | `#CA8A04` | `yellow-600` | 5.9:1 ⚠️ |
| 煎炸 (Fried) | `#D97706` | `amber-600` | 6.5:1 ✓ |
| 粥粉麵飯 (Rice & Noodle) | `#16A34A` | `green-600` | 7.1:1 ✓ |
| 甜品 (Dessert) | `#9333EA` | `purple-600` | 7.4:1 ✓ |
| 其他 (Other) | `#2563EB` | `blue-600` | 7.8:1 ✓ |

⚠️ Yellow category needs darker text or use yellow-700 (#A16207) for better contrast.

### Typography

**Recommended Font Pairing**: Lexend + Source Sans 3

- **Mood**: Accessible, readable, professional, clean
- **Best For**: Accessibility-critical sites, healthcare, elderly users
- **Google Fonts**: [Lexend](https://fonts.google.com/specimen/Lexend) + [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3)

**For This Project** (existing):

- **Chinese**: Noto Sans TC (already implemented, excellent TC support)
- **English**: Lexend (recommended for readability)
- **Current**: Noto Sans TC for both (acceptable, maintains consistency)

**Font Size Scale**:
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Page Titles | 28px (1.75rem) | 700 | 1.3 |
| Section Headers | 24px (1.5rem) | 600 | 1.3 |
| Body Text | 18px (1.125rem) | 400 | 1.6 (1.8 for Chinese) |
| Small Text | 16px (1rem) | 400 | 1.6 |

### Icon System

**Icon Library**: Lucide React (consistent 2px stroke)

**Size Variants**:
| Variant | Size | Usage |
|---------|------|-------|
| sm | 20px | Secondary actions only |
| md | 24px | Standard interactive (quantity controls) |
| lg | 28px | Primary actions (Add to Cart, Checkout) |
| xl | 32px | Decorative, high-priority (cart icon, categories) |

**Touch Target Requirements** (UX Pro Max - Severity: HIGH):

- **Minimum size**: 44px × 44px (we use 48px for extra safety)
- **Minimum spacing**: 8px gap between adjacent touch targets
- **Implementation**: `min-h-[48px] min-w-[48px] gap-2`

## UX Guidelines (Critical for Elderly)

### Touch Targets (Severity: HIGH)

```tsx
// ✅ GOOD
<Button className="min-h-[48px] min-w-[48px]" />
<div className="gap-2"> {/* 8px gap */ }

// ❌ BAD
<Button className="w-6 h-6" />
<div className="gap-0"> {/* No spacing */ }
```

### Hover States

- **Duration**: 200-300ms (ease-in-out)
- **Change**: Color/opacity (NOT scale to avoid layout shift)
- **Brightness**: 15% change for clear feedback
- **Cursor**: `cursor-pointer` on ALL clickable elements

### Focus States

- **Width**: 3px solid outline
- **Color**: High-contrast primary color
- **Offset**: 2px from element
- **Example**: `focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2`

### Light Mode Contrast (Critical)

```tsx
// ✅ GOOD - Visible in light mode
bg - white / 80; // Glass cards
text - slate - 900; // Body text (#0F172A)
text - slate - 600; // Muted text minimum (#475569)
border - gray - 200; // Borders

// ❌ BAD - Invisible in light mode
bg - white / 10; // Too transparent
text - slate - 400; // Too light (#94A3B8)
border - white / 10; // Invisible border
```

### Layout & Spacing

```tsx
// ✅ GOOD - Floating navbar with spacing
<nav className="top-4 left-4 right-4">

// ✅ GOOD - Content padding accounts for fixed navbar
<main className="pt-20"> {/* 80px for navbar */ }

// ❌ BAD - Navbar sticks to edges
<nav className="top-0 left-0 right-0">
```

## Stack-Specific Guidelines

### Shadcn/UI

1. **Toaster**: Add to root layout (`app/layout.tsx`), NOT individual pages
2. **Forms**: Use `Form` + `react-hook-form` pattern
3. **Sidebar**: Use `SidebarTrigger` component for mobile toggle
4. **Buttons**: Use variant system (default, destructive, outline, secondary, ghost, link)

### Next.js

1. **Navigation**: Use `<Link>` component (not `<a>` tags)
2. **Images**: Use `fill` prop for responsive images with `object-fit`
3. **Scroll**: Use `scroll={false}` for tab navigation

## Pre-Delivery Checklist

### Visual Quality

- [ ] No emojis as icons (Lucide React SVG only)
- [ ] Consistent icon sizes (20/24/28/32px variants)
- [ ] Hover states don't shift layout
- [ ] Theme colors used directly (no var() wrapper)

### Interaction

- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover feedback clear (15% brightness change)
- [ ] Transitions smooth (200-300ms)
- [ ] Focus states visible (3px outline)

### Light/Dark Mode

- [ ] Text contrast 4.5:1 minimum (7:1 for AAA)
- [ ] Glass elements visible (bg-white/80 minimum)
- [ ] Borders visible in both modes
- [ ] Both modes tested

### Layout

- [ ] Floating elements have edge spacing
- [ ] Content not hidden behind fixed elements
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

### Accessibility

- [ ] Images have Chinese alt text
- [ ] Form inputs have labels
- [ ] Color not sole indicator (icons/text too)
- [ ] `prefers-reduced-motion` respected
- [ ] Touch targets: 48px × 48px minimum
- [ ] Touch spacing: 8px minimum
- [ ] Font size: 16px minimum (18px Chinese)

## Anti-Patterns to Avoid

❌ **Small text** (< 16px)  
❌ **Complex navigation** (more than 3 levels)  
❌ **AI purple/pink gradients** (cliché, poor contrast)  
❌ **Emoji icons** (inconsistent, unprofessional)  
❌ **Tightly packed buttons** (no spacing)  
❌ **Instant state changes** (no transitions)  
❌ **Light text on light background** (poor contrast)

## Implementation Priority

1. **HIGH PRIORITY** (UX Pro Max Severity: HIGH):
   - Touch targets: 48px × 48px minimum
   - Touch spacing: 8px minimum gap
   - Font size: 18px minimum for Chinese
   - Contrast ratio: 7:1 for all interactive elements

2. **MEDIUM PRIORITY**:
   - Icon size variants (sm/md/lg/xl)
   - Hover state feedback (15% brightness)
   - Focus state visibility (3px outline)
   - Smooth transitions (200-300ms)

3. **LOW PRIORITY** (nice-to-have):
   - Reduced motion support
   - Dark mode optimization
   - Advanced animations

## References

- **UI/UX Pro Max Database**: 67 styles, 96 palettes, 99 UX guidelines
- **WCAG 2.1 AAA**: https://www.w3.org/WAI/WCAG21/quickref/
- **Lucide React Icons**: https://lucide.dev/guide/packages/lucide-react
- **Shadcn/UI**: https://ui.shadcn.com
- **Google Fonts**: https://fonts.google.com
