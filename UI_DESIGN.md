# 🐦 Sparrow - UI/UX Overview

## Main Popup Interface

```
┌─────────────────────────────────┐
│ 🐦 Sparrow              ⚙️      │  ← Header (neutral white)
├─────────────────────────────────┤
│                                 │
│  📅 Team Meeting                │  ← Reminder Item
│  Every 1 day                    │     (light gray background)
│                    ∞ infinite   │     (accent color badge)
│                    ✓ ✎ 🗑️      │     (action buttons)
│                                 │
│  🎯 Daily Standup               │
│  Every 8 hours                  │
│                    × 3 left     │
│                    ✓ ✎ 🗑️      │
│                                 │
│  🔔 Reminder 3                  │
│  Every 30 minutes               │
│                    ∞ infinite   │
│                    ○ ✎ 🗑️      │  ← Disabled (○)
│                                 │
│ ┌─────────────────────────────┐ │
│ │  + Add Reminder             │ │  ← Action Button
│ └─────────────────────────────┘ │     (golden accent)
└─────────────────────────────────┘

Color: #F7BE48 (accent gold)
Rounded: 8px main, 4px buttons
Size: 500x600px
```

## Settings Modal

```
┌─────────────────────────┐
│ Settings           ×    │  ← Header
├─────────────────────────┤
│                         │
│  ☑ Enable Desktop       │  ← Toggle Settings
│    Notifications        │     (light gray boxes)
│                         │
│  ☑ Enable Notification  │
│    Sounds               │
│                         │
├─────────────────────────┤
│         [Save]          │  ← Golden button
└─────────────────────────┘
```

## Add Reminder Modal

```
┌────────────────────────────────┐
│ Add Reminder            ×      │
├────────────────────────────────┤
│                                │
│ ICON *                         │
│ [😀📅🔔🎯🌟...] ↓             │  ← Emoji Picker
│                                │
│ NAME *                         │
│ [Daily Standup           ]     │  ← Text Input
│                                │
│ TIME INTERVAL *                │
│ [  1  ] [Days        ▼ ]       │  ← Number + Select
│                                │
│ REPEAT                         │
│ ◯ Infinite                     │  ← Radio Options
│ ◉ Times: [  5  ]               │
│                                │
├────────────────────────────────┤
│      [Cancel]  [Save]          │  ← Action Buttons
└────────────────────────────────┘
```

## Emoji Picker Expanded

```
┌────────────────────────┐
│ 😀 📅 🔔 ⏰ 🎯           │
│ 📍 🌟 💡 🎨 🎭           │
│ 🎪 🎬 🎤 🎧 🎮           │
│ 🎲 🎰 🃏 🎯 📢           │
└────────────────────────┘
```

## Color Palette

```
Primary Background
█████████████████  #ffffff

Secondary Background
█████████████████  #f8f9fa

Accent Color (Golden)
█████████████████  #F7BE48

Accent Hover
█████████████████  #f0b13a

Text Primary
█████████████████  #222222

Text Secondary
█████████████████  #65676b

Border Color
█████████████████  #cccccc
```

## Reminder Item Anatomy

```
┌────────────────────────────────────────────────────┐
│  🎯  Team Meeting          ∞ infinite  ✓ ✎ 🗑️  │
│      Every 1 day                                   │
└────────────────────────────────────────────────────┘

Components:
- 🎯 Icon (emoji, left side)
- Team Meeting (name)
- Every 1 day (time interval)
- ∞ infinite (repeat status - accent color)
- ✓ Toggle (enabled/disabled)
- ✎ Edit button
- 🗑️ Delete button
```

## Design System

### Typography
- **Title**: 20px, font-weight 600
- **Section Label**: 14px, font-weight 600
- **Body Text**: 14px, font-weight 400
- **Small Text**: 12px, font-weight 400

### Spacing
- **Container Padding**: 16px-20px
- **Item Gap**: 12px
- **Button Padding**: 8px-12px
- **Input Padding**: 8px-12px

### Borders & Radius
- **Main Radius**: 8px
- **Button Radius**: 4px
- **Border Width**: 1px
- **Border Color**: #ccc

### Shadows
- **Light Shadow**: 0 1px 2px rgba(0,0,0,0.12)
- **Medium Shadow**: 0 2px 8px rgba(0,0,0,0.15)
- **Modal Shadow**: 0 4px 16px rgba(0,0,0,0.3)

### Transitions
- **Standard Duration**: 200ms (0.2s)
- **Easing**: Smooth (default)
- **Applied to**: Colors, backgrounds, transforms

---

## Visual States

### Normal Button
```
Background: #F7BE48 (gold)
Text: #222222 (dark)
Border: None
Cursor: pointer
```

### Hovered Button
```
Background: #f0b13a (darker gold)
Text: #222222
Shadow: Yes (raised effect)
Cursor: pointer
```

### Active Button
```
Transform: scale(0.98) (slight press effect)
Background: #f0b13a
```

### Focused Input
```
Border: #F7BE48 (accent)
Shadow: 0 0 0 2px rgba(247,190,72,0.1)
```

### Disabled Input
```
Background: #f8f9fa
Cursor: not-allowed
```

---

## Responsive Behavior

### Popup Width
```
Fixed: 500px
Handles: Most desktop/laptop screens
Overflow: Scrollable content area
```

### Modal Sizing
```
Width: 90% (max 400px)
Height: Auto (max 90vh)
Position: Centered on screen
Backdrop: Dark overlay (rgba 0,0,0,0.5)
```

### Text Wrapping
```
Reminder names: Truncate if too long
Form labels: Always visible
Messages: Wrap to available width
```

---

## Accessibility Features

- ✓ High contrast ratios (WCAG AA compliant)
- ✓ Keyboard navigation support
- ✓ Focus states visible
- ✓ Semantic HTML labels
- ✓ Radio button groups
- ✓ Checkbox toggles
- ✓ Clear button labels
- ✓ Tooltip titles on buttons

---

## Animation Details

### Fade Transitions
- Modal appear/disappear
- Hover color changes
- Opacity changes

### Smooth Scale
- Button press effect (0.98x)
- Icon transitions

### Hover Effects
- Background color change
- Shadow addition
- Text accent highlighting

---

## Emoji Categories Used

- **Calendar**: 📅
- **Notification**: 🔔
- **Time**: ⏰
- **Target**: 🎯
- **Location**: 📍
- **Star**: 🌟
- **Lightbulb**: 💡
- **Entertainment**: 🎨🎭🎪🎬🎤🎧🎮🎲🎰
- **Cards**: 🃏
- **Announce**: 📢

---

## File Size Estimates

| File | Size |
|------|------|
| popup.html | ~8 KB |
| popup.css | ~20 KB |
| popup.js | ~15 KB |
| background.js | ~6 KB |
| offscreen.js | ~2 KB |
| icon.png | ~varies |
| **Total** | **~51+ KB** |

---

## Browser Support

✓ Chrome 88+
✓ Edge 88+
✓ Brave
✓ Any Chromium-based browser with Manifest V3 support

---

## Performance Metrics

- Extension size: < 100 KB
- Load time: < 200ms
- Memory footprint: Minimal (sleeps between alarms)
- CPU usage: Negligible
- Battery impact: Very low

Enjoy Sparrow! 🐦
