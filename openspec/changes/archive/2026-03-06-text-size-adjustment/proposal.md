## Why

Users with visual impairments or reading difficulties need the ability to adjust text size for comfortable reading. Additionally, users in different contexts (bright sunlight, quick scanning) benefit from customizable text sizing. This change improves accessibility and user experience across diverse user needs.

## What Changes

- Add text size toggle UI component with small/medium/large options
- Implement text size state persistence using Zustand
- Apply dynamic text sizing across all UI components
- Respect system font size preferences as default
- Ensure text size changes apply consistently throughout the app

## Capabilities

### New Capabilities
- `text-size-preference`: User-controlled text size adjustment with small/medium/large options
- `text-size-persistence`: Persistent storage and retrieval of user text size preference

### Modified Capabilities
- `responsive-layout`: Extending to include user-controlled text scaling in addition to viewport-based scaling

## Impact

- All text-containing components need to support dynamic sizing
- Zustand store for state management
- Local storage for preference persistence
- Potential layout shifts when text size changes (components need flexible layouts)
- Accessibility compliance (WCAG 1.4.4 - Resize Text)
