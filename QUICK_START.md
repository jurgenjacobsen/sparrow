## Quick Start Guide

### 🚀 Installation

1. **Prepare the extension:**
   ```bash
   npm install
   npm run build
   ```

2. **Load in Chrome:**
   - Go to `chrome://extensions/`
   - Turn ON "Developer mode" (top-right toggle)
   - Click "Load unpacked"
   - Select the `sparrow` folder
   - The extension is now ready!

### 📝 Create Your First Reminder

1. Click the 🐦 Sparrow icon in your toolbar
2. Click "+ Add Reminder"
3. **Set Icon**: Click the emoji field and pick one (e.g., 🎯)
4. **Set Name**: e.g., "Daily Stand-up"
5. **Set Interval**: e.g., 1 day
6. **Set Repeat**: Infinite or specific number
7. Click "Save"

### ⚙️ Configure Settings

1. Click the ⚙️ settings button
2. Toggle your preferences:
   - ✓ Enable Desktop Notifications
   - ✓ Enable Notification Sounds
3. Click "Save"

### 👀 Managing Reminders

- **✓/○**: Toggle reminder on/off
- **✎**: Edit reminder details
- **🗑️**: Delete reminder

### 🎨 Design Highlights

- **Accent Color**: Golden Yellow (#F7BE48)
- **Rounded Corners**: 8px for main elements, 4px for buttons
- **Neutral Design**: White/gray background with accessible text
- **Smooth Animations**: All interactions have subtle transitions

## Development

### TypeScript Files

**Main file**: `src/popup.ts`
- Contains all UI logic and event handlers
- Types defined at the top for reminders and settings
- Manages state with localStorage

### Compile Changes

```bash
npm run build    # Compile TypeScript to JavaScript
npm run watch    # Auto-compile on file changes
```

### Testing

1. Make changes to TypeScript
2. Run `npm run build`
3. Go to `chrome://extensions/`
4. Click the refresh icon on Sparrow
5. Test in the popup

## File Map

| File | Purpose |
|------|---------|
| `popup.html` | Main UI structure |
| `style/popup.css` | Styling & layout |
| `src/popup.ts` | UI logic & state management |
| `scripts/background.js` | Service worker (alarms) |
| `scripts/offscreen.js` | Audio playback |
| `manifest.json` | Extension config |

## Common Tasks

### Add a new setting
1. Add property to `Settings` interface
2. Add form control to `popup.html`
3. Add event listener in `setupEventListeners()`
4. Update `saveSettings()` function

### Change the accent color
- Edit `--accent-color: #F7BE48;` in `style/popup.css`

### Customize emoji picker
- Edit the emoji string in `popup.html` emoji picker:
  ```html
  <div class="emoji-grid">
    😀📅🔔⏰🎯📍🌟💡🎨🎭🎪🎬🎤🎧🎮🎲🎰🃏🎯📢
  </div>
  ```

## Tips

- Reminders are stored locally in `chrome.storage.local`
- Desktop notifications require Chrome notification permissions
- Sound uses Web Audio API for 800 Hz beep
- All data persists across sessions and browser restarts
