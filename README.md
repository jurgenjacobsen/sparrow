# 🐦 Sparrow - Reminder Manager
A sleek Google Chrome extension for managing reminders.

[![CI and Quality](https://github.com/jurgenjacobsen/sparrow/actions/workflows/ci-quality.yml/badge.svg)](https://github.com/jurgenjacobsen/sparrow/actions/workflows/ci-quality.yml)

## Features

✨ **Reminder Management**
- Create, edit, and delete reminders
- Set custom time intervals (minutes, hours, days, weeks)
- Add emoji icons to reminders for quick visual identification
- Set reminders to repeat infinitely or a specific number of times
- Enable/disable reminders without deleting them

🔔 **Notifications**
- Desktop notifications for reminder triggers
- Optional notification sounds
- Click notifications to open the extension

⚙️ **Settings**
- Toggle desktop notifications on/off
- Toggle notification sounds on/off
- Settings persist across sessions

🎨 **User Interface**
- Clean, minimal design with neutral colors
- Small rounded corners (8px) for a modern look
- Golden accent color (#F7BE48) for interactive elements
- Smooth animations and transitions
- Responsive layout

## Installation

1. Clone or download this repository
2. Navigate to `chrome://extensions/` in Chrome
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked"
5. Select the `sparrow` folder
6. The extension icon will appear in your toolbar

## Building

### Prerequisites
- Node.js and npm installed
- TypeScript knowledge (optional)

### Build Steps

```bash
# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build

# Watch for changes during development
npm run watch

# Package for distribution
npm run bundle
```

## Project Structure

```
sparrow/
├── assets/
│   └── icon.png              # Extension icon
├── scripts/
│   ├── background.js         # Service worker (compiled from TS)
│   ├── offscreen.js          # Audio playback handler (compiled from TS)
│   └── popup.js              # Popup logic (compiled from TS)
├── src/
│   ├── popup.ts              # Main UI logic and event handlers
│   └── (other TypeScript files)
├── style/
│   └── popup.css             # Neutral UI styling with golden accent
├── popup.html                # Main extension popup
├── offscreen.html            # Offscreen document for audio playback
├── manifest.json             # Extension configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── README.md                 # This file
```

## File Descriptions

### popup.html
The main UI of the extension displayed when you click the toolbar icon. Features:
- Header with Sparrow title and settings button
- Reminders list (empty state when no reminders)
- Add reminder button
- Settings modal for notification preferences
- Reminder modal for adding/editing reminders

### style/popup.css
Comprehensive styling with:
- CSS custom properties for consistent theming
- Golden accent color (#F7BE48)
- Small rounded corners (8px main, 4px buttons)
- Smooth transitions and hover effects
- Scrollbar styling
- Modal styling
- Form input styling with focus states

### src/popup.ts
Main UI logic including:
- State management for reminders and settings
- Event listeners for all user interactions
- Modal management (open/close)
- Reminder CRUD operations (Create, Read, Update, Delete)
- Form validation
- Emoji picker functionality
- Local storage integration

### scripts/background.js
Service Worker handling:
- Chrome alarms scheduling based on reminder intervals
- Desktop notifications when alarms trigger
- Statistics tracking (repeat count)
- Settings persistence
- Notification sound trigger

### scripts/offscreen.js
Offscreen document script for:
- Playing notification sounds via Web Audio API
- Creating beep sound (800 Hz, 0.3s duration)
- Audio context management

## Usage

### Creating a Reminder

1. Click the Sparrow icon in your toolbar
2. Click "+ Add Reminder" button
3. Fill in the form:
   - **Icon**: Click the input and select an emoji from the picker
   - **Name**: Enter a descriptive name for the reminder
   - **Time Interval**: Set value and unit (minutes/hours/days/weeks)
   - **Repeat**: Choose infinite or set a specific number of times
4. Click "Save" to create the reminder

### Managing Reminders

- **Toggle**: Click the ✓ or ○ button to enable/disable a reminder
- **Edit**: Click the ✎ button to modify reminder settings
- **Delete**: Click the 🗑️ button to remove a reminder
- **View**: See icon, name, interval, and repeat status on each reminder

### Settings

1. Click the ⚙️ button in the header
2. Toggle preferences:
   - Enable/disable desktop notifications
   - Enable/disable notification sounds
3. Click "Save" to apply changes

## Colors & Design

The extension uses a neutral, professional color scheme:

- **Primary Background**: #ffffff (white)
- **Secondary Background**: #f8f9fa (light gray)
- **Text Primary**: #222222 (dark gray)
- **Text Secondary**: #65676b (medium gray)
- **Accent Color**: #F7BE48 (golden yellow)
- **Accent Hover**: #f0b13a (darker golden)
- **Border Color**: #ccc (light gray)

All UI elements feature small rounded corners (8px for main containers, 4px for buttons and inputs).

## Browser Compatibility

- Chrome 88+ (due to alarms API and offscreen API requirements)
- Chromium-based browsers (Edge, Brave, etc.)

## Permissions

The extension requires these permissions:

- `alarms` - To schedule reminder triggers
- `notifications` - To show desktop notifications
- `storage` - To persist reminders and settings
- `offscreen` - To play notification sounds

## Development

### TypeScript Compilation

The project uses TypeScript for type safety. Source files are in `src/` and compile to `scripts/`.

```bash
npm run build    # One-time compilation
npm run watch    # Watch mode for development
```

### Adding New Features

1. Create/modify `.ts` files in `src/`
2. Run `npm run build` to compile
3. Reload the extension in `chrome://extensions/`

### Debugging

1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Inspect views" on the Sparrow extension
4. Use the DevTools console to debug

## Troubleshooting

**Reminders not triggering?**
- Check that desktop notifications are enabled in extension settings
- Verify the reminder is not disabled
- Check browser notification permissions for Chrome

**No sound on notifications?**
- Verify "Enable Notification Sounds" is toggled on in settings
- Check system volume is not muted
- Some systems may require additional audio permissions

**Extension not showing?**
- Ensure the extension is enabled in `chrome://extensions/`
- Try reloading the extension (toggle off/on)
- Clear extension data and reload

## License
Affero General Public License v3.0 (AGPL-3.0)

## Author

jurgenjacobsen

## Repository

https://github.com/jurgenjacobsen/sparrow
