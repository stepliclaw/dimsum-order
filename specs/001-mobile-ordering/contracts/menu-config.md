# Menu Configuration Contract

**Purpose**: Define the schema for the editable `menu.json` configuration file that staff can modify without code changes.

**Location**: `/public/menu.json`

---

## Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Dim Sum Menu Configuration",
  "type": "object",
  "required": ["version", "categories", "pricing", "items"],
  "properties": {
    "version": {
      "type": "string",
      "description": "Configuration version for cache busting (semver format)",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "categories": {
      "type": "array",
      "items": { "$ref": "#/definitions/category" }
    },
    "pricing": { "$ref": "#/definitions/pricingTable" },
    "items": {
      "type": "array",
      "items": { "$ref": "#/definitions/menuItem" }
    }
  },
  "definitions": {
    "category": {
      "type": "object",
      "required": ["id", "name", "order"],
      "properties": {
        "id": {
          "type": "string",
          "enum": ["steamed", "fried", "dessert", "sets", "rice", "noodle"]
        },
        "name": { "$ref": "#/definitions/localizedString" },
        "icon": { "type": "string" },
        "order": { "type": "integer", "minimum": 0 }
      }
    },
    "pricingTable": {
      "type": "object",
      "required": ["小點", "中點", "大點", "特點"],
      "properties": {
        "小點": { "type": "number", "minimum": 0 },
        "中點": { "type": "number", "minimum": 0 },
        "大點": { "type": "number", "minimum": 0 },
        "特點": { "type": "number", "minimum": 0 },
        "超點": { "type": "number", "minimum": 0 }
      }
    },
    "menuItem": {
      "type": "object",
      "required": ["id", "name", "description", "category", "priceType", "photo"],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-z0-9-]{3,50}$",
          "description": "Unique identifier, kebab-case"
        },
        "name": { "$ref": "#/definitions/localizedString" },
        "description": { "$ref": "#/definitions/localizedString" },
        "category": {
          "type": "string",
          "enum": ["steamed", "fried", "dessert", "sets", "rice", "noodle"]
        },
        "priceType": {
          "type": "string",
          "enum": ["tier", "fixed"]
        },
        "tier": {
          "type": "string",
          "enum": ["小點", "中點", "大點", "特點", "超點"],
          "description": "Required if priceType is 'tier'"
        },
        "price": {
          "type": "number",
          "minimum": 0,
          "description": "Required if priceType is 'fixed'"
        },
        "photo": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|webp)$",
          "description": "Filename in /public/images/menu/"
        },
        "available": {
          "type": "boolean",
          "default": true
        }
      },
      "if": {
        "properties": { "priceType": { "const": "tier" } }
      },
      "then": {
        "required": ["tier"]
      },
      "if": {
        "properties": { "priceType": { "const": "fixed" } }
      },
      "then": {
        "required": ["price"]
      }
    },
    "localizedString": {
      "type": "object",
      "required": ["en", "zh"],
      "properties": {
        "en": { "type": "string", "minLength": 1, "maxLength": 500 },
        "zh": { "type": "string", "minLength": 1, "maxLength": 500 }
      }
    }
  }
}
```

---

## Example Configuration

```json
{
  "version": "1.0.0",
  "categories": [
    {
      "id": "steamed",
      "name": { "en": "Steamed Dim Sum", "zh": "蒸點" },
      "icon": "soup",
      "order": 1
    },
    {
      "id": "fried",
      "name": { "en": "Fried Dim Sum", "zh": "煎炸" },
      "icon": "flame",
      "order": 2
    },
    {
      "id": "dessert",
      "name": { "en": "Desserts", "zh": "甜品" },
      "icon": "cake",
      "order": 3
    }
  ],
  "pricing": {
    "小點": 18,
    "中點": 24,
    "大點": 32,
    "特點": 42
  },
  "items": [
    {
      "id": "har-gow",
      "name": {
        "en": "Shrimp Dumplings",
        "zh": "蝦餃"
      },
      "description": {
        "en": "Steamed shrimp dumplings with delicate wrapper",
        "zh": "傳統蝦餃，皮薄餡靚"
      },
      "category": "steamed",
      "priceType": "tier",
      "tier": "中點",
      "photo": "har-gow.webp",
      "available": true
    },
    {
      "id": "siu-mai",
      "name": {
        "en": "Pork Siu Mai",
        "zh": "燒賣"
      },
      "description": {
        "en": "Steamed pork and shrimp dumplings",
        "zh": "鮮肉燒賣"
      },
      "category": "steamed",
      "priceType": "tier",
      "tier": "中點",
      "photo": "siu-mai.webp",
      "available": true
    },
    {
      "id": "bbq-pork-bun",
      "name": {
        "en": "BBQ Pork Bun",
        "zh": "叉燒包"
      },
      "description": {
        "en": "Fluffy steamed bun with BBQ pork filling",
        "zh": "傳統叉燒包"
      },
      "category": "steamed",
      "priceType": "tier",
      "tier": "中點",
      "photo": "bbq-pork-bun.webp",
      "available": true
    },
    {
      "id": "lobster-dim-sum",
      "name": {
        "en": "Lobster Dim Sum",
        "zh": "龍蝦点心"
      },
      "description": {
        "en": "Premium dim sum with fresh lobster",
        "zh": "新鮮龍蝦製成"
      },
      "category": "steamed",
      "priceType": "fixed",
      "price": 88,
      "photo": "lobster-dim-sum.webp",
      "available": true
    }
  ]
}
```

---

## Validation Rules

### Required Fields
- `version`: Must be semver format (X.Y.Z)
- `categories`: At least 1 category
- `pricing`: All 4 tier prices (小點，中點，大點，特點)
- `items`: At least 1 menu item

### Field Constraints
- `id`: Unique across all items, kebab-case, 3-50 chars
- `name.en`, `name.zh`: 1-100 chars each
- `description.en`, `description.zh`: 10-500 chars each
- `photo`: Valid filename, must exist in `/public/images/menu/`
- `price`: Positive number, max 9999
- `tier`: Must match one of the defined pricing tiers

### Business Rules
- Each category must have at least one item
- Tier names in items must match keys in pricing table
- Photo filenames must match actual files
- At least one item must be available

---

## Editing Guidelines for Staff

### Adding a New Item

1. Choose unique `id` (lowercase, hyphens)
2. Add bilingual `name` and `description`
3. Select appropriate `category`
4. Choose `priceType`: "tier" or "fixed"
5. If tier: add `tier` field (小點/中點/大點/特點)
6. If fixed: add `price` field (HKD amount)
7. Add photo filename (must upload to `/public/images/menu/`)

### Updating Prices

Edit the `pricing` object:
```json
"pricing": {
  "小點": 20,    // Changed from 18
  "中點": 26,    // Changed from 24
  "大點": 34,    // Changed from 32
  "特點": 45     // Changed from 42
}
```

### Marking Item Unavailable

Set `available: false`:
```json
{
  "id": "seasonal-item",
  "name": { ... },
  "available": false
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-05 | Initial schema |
