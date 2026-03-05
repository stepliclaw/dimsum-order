# Quick Start Guide: Dim Sum Order Demo

**Branch**: `001-mobile-ordering`  
**Last Updated**: 2026-03-05

---

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm 9+ (included with Node.js)
- Git

---

## Installation

```bash
# Clone repository (if not already done)
git clone <repo-url>
cd dimsum-order

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
dimsum-order/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/menu page
│   ├── orders/            # Order history page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # Shadcn/ui components
│   ├── menu/              # Menu components
│   └── order/             # Order components
├── lib/                   # Utilities
│   ├── store.ts           # Zustand state management
│   └── types.ts           # TypeScript types
├── public/
│   ├── images/menu/       # Dim sum photos
│   └── menu.json          # Menu configuration
└── package.json
```

---

## Development Commands

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run tests
npm run test

# Format code
npm run format
```

---

## Menu Configuration

### Edit Menu Items

Open `public/menu.json` and modify:

```json
{
  "items": [
    {
      "id": "har-gow",
      "name": {
        "en": "Shrimp Dumplings",
        "zh": "蝦餃"
      },
      "description": {
        "en": "Steamed shrimp dumplings",
        "zh": "傳統蝦餃"
      },
      "category": "steamed",
      "priceType": "tier",
      "tier": "中點",
      "photo": "har-gow.webp",
      "available": true
    }
  ]
}
```

### Update Tier Prices

```json
{
  "pricing": {
    "小點": 18,
    "中點": 24,
    "大點": 32,
    "特點": 42
  }
}
```

### Add Menu Photos

1. Save image to `public/images/menu/`
2. Use WebP format (recommended) or JPG/PNG
3. Recommended size: 400x400 pixels
4. Update `photo` field in menu.json

---

## State Management

The app uses **Zustand** for state management with **localStorage** persistence.

### Store Structure

```typescript
// Current cart items (sessionStorage)
currentItems: MenuItem[]

// Order history (localStorage)
orders: Order[]

// UI language (localStorage)
language: 'en' | 'zh'
```

### Access Store in Components

```typescript
import { useOrderStore } from '@/lib/store'

function MyComponent() {
  const { currentItems, addItem, submitOrder } = useOrderStore()
  
  // Use store methods
}
```

---

## Language Switching

The app supports **English** and **Traditional Chinese**.

### Add New Translations

1. Open `app/i18n/en.json` or `zh-HK.json`
2. Add key-value pairs:

```json
{
  "menu": {
    "title": "Dim Sum Menu",
    "addToCart": "Add to Order"
  }
}
```

3. Use in components:

```typescript
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
<h1>{t('menu.title')}</h1>
```

---

## Testing

### Run All Tests

```bash
npm run test
```

### Run Specific Test File

```bash
npm run test -- tests/components/menu-item.test.tsx
```

### Test Coverage

```bash
npm run test -- --coverage
```

---

## Accessibility (WCAG 2.1 AA)

### Check Contrast

```bash
npm run axe
```

### Keyboard Navigation

Test all interactions using only keyboard:
- `Tab` - Navigate forward
- `Shift+Tab` - Navigate backward
- `Enter` / `Space` - Activate buttons
- `Escape` - Close dialogs

### Screen Reader Testing

- macOS: VoiceOver (`Cmd+F5`)
- Windows: NVDA or JAWS

---

## Performance Optimization

### Analyze Bundle Size

```bash
npm run build
npm run analyze
```

### Lighthouse Audit

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, SEO

**Targets**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Performance Score: > 90

---

## Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Static Export

```bash
# Build static files
npm run build

# Output in /out directory
# Deploy to Netlify, GitHub Pages, etc.
```

---

## Troubleshooting

### Menu Images Not Loading

1. Check filename matches exactly (case-sensitive)
2. Verify image exists in `/public/images/menu/`
3. Clear browser cache

### Language Not Switching

1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Check browser console for errors

### Cart Not Persisting

1. Check localStorage quota (5-10MB limit)
2. Verify browser allows localStorage
3. Check incognito/private mode restrictions

---

## Next Steps

- See [data-model.md](./data-model.md) for entity definitions
- See [menu-config.md](./contracts/menu-config.md) for menu schema
- See [spec.md](./spec.md) for full requirements
