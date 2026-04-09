# 🚀 Installation & Getting Started Guide

## Prerequisites

✓ Google Chrome (version 88+)
✓ Node.js and npm (for building/development)

---

## Option 1: Quick Install (Already Built)

The extension has been **pre-built and compiled**. You can load it immediately!

### Step 1: Open Extensions Page
```
1. Open Chrome
2. Type in address bar: chrome://extensions/
3. Press Enter
```

### Step 2: Enable Developer Mode
```
1. Look for "Developer mode" toggle in top-right
2. Click ON (it will turn blue)
```

### Step 3: Load the Extension
```
1. Click "Load unpacked" button (top-left)
2. Navigate to: c:\Users\jurgen\Documents\Code\sparrow
3. Select the "sparrow" folder
4. Click "Open" / "Select Folder"
```

### Step 4: Verify Installation
```
1. You should see the Sparrow extension listed
2. The icon should appear in your Chrome toolbar
3. Click the icon to open the popup
```

✅ **You're done! The extension is ready to use.**

---

## Option 2: Development Setup

If you want to modify the code or watch for changes:

### Step 1: Navigate to Project
```bash
cd c:\Users\jurgen\Documents\Code\sparrow
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Watch Mode (Optional)
```bash
npm run watch
```
This automatically recompiles TypeScript as you edit files.

### Step 4: Edit Files
Edit TypeScript in `src/popup.ts` or CSS in `style/popup.css`

### Step 5: Rebuild After Changes
```bash
npm run build
```

### Step 6: Reload in Chrome
1. Go to `chrome://extensions/`
2. Find Sparrow extension
3. Click the refresh icon

---

## Using the Extension

### First Time

1. **Click the Sparrow Icon** 🐦
   - Located in your Chrome toolbar (top-right)
   - Opens the reminder manager popup

2. **Create Your First Reminder**
   - Click "+ Add Reminder" button
   - Select an emoji icon
   - Enter reminder name
   - Set time interval
   - Choose repeat mode
   - Click "Save"

3. **See It Work**
   - After the set interval, a notification appears
   - Click notification to return to Sparrow

### Managing Reminders

Once created, you can:

- **View**: See all reminders in the list
- **Toggle**: Click ✓ to enable, ○ to disable
- **Edit**: Click ✎ to modify details
- **Delete**: Click 🗑️ to remove

### Customizing Settings

1. Click ⚙️ (settings button, top-right)
2. Toggle options:
   - Enable/disable desktop notifications
   - Enable/disable notification sounds
3. Click "Save"

---

## File Structure for Reference

```
sparrow/
├── popup.html              ← Main UI
├── offscreen.html          ← Helper for audio
├── style/
│   └── popup.css           ← All styling
├── src/
│   └── popup.ts            ← Source code (TypeScript)
├── scripts/
│   ├── popup.js            ← Compiled popup code
│   ├── background.js       ← Service worker
│   └── offscreen.js        ← Audio handler
├── manifest.json           ← Extension config
├── package.json            ← Dependencies
└── tsconfig.json           ← Build config
```

---

## Troubleshooting

### Extension doesn't appear in toolbar?
- Go to `chrome://extensions/`
- Verify Sparrow is enabled (toggle ON)
- Refresh the page
- Try reloading the extension

### Reminders not triggering?
- Check Chrome notification permissions
- Verify reminder is enabled (✓ not ○)
- Check desktop notification setting
- Verify system volume isn't muted

### No sound notifications?
- Go to extension settings (⚙️)
- Ensure "Enable Notification Sounds" is checked
- Check system volume
- Test with browser notifications enabled

### Changes not showing after editing?
```bash
npm run build                # Recompile TypeScript
```
Then reload in `chrome://extensions/`

### How to see error messages?
1. Go to `chrome://extensions/`
2. Find Sparrow
3. Click "Inspect views: service worker"
4. Check the Console tab

---

## Common Tasks

### Add a reminder that repeats daily
1. Click "+ Add Reminder"
2. Set interval to "1" and unit to "Days"
3. Select "Infinite" repeat
4. Save ✓

### Add a reminder that repeats 3 times only
1. Click "+ Add Reminder"
2. Set your interval
3. Select "Times:" radio button
4. Enter "3" in the count field
5. Save ✓
6. After 3 triggers, reminder auto-disables

### Disable a reminder without deleting
1. Find the reminder in list
2. Click the ✓ or ○ button
3. It will toggle on/off

---

## Building/Packaging

### One-time build
```bash
npm run build
```

### Watch and auto-build
```bash
npm run watch
```

### Package for distribution
```bash
npm run bundle
```

---

## Additional Resources

- **README.md** - Full feature documentation
- **QUICK_START.md** - Quick reference
- **CODE_REFERENCE.md** - Code examples
- **UI_DESIGN.md** - UI/UX details
- **BUILD_SUMMARY.md** - What was built

---

## Chrome Notification Permissions

The first time a notification triggers, Chrome might ask for permission.

**If prompted:**
1. Click "Allow" to enable notifications
2. If you click "Block", notifications won't work

**To re-enable later:**
1. Click the lock icon in address bar
2. Find "Notifications"
3. Change to "Allow"

---

## Need Help?

### Check the logs
```javascript
// In browser console:
chrome.storage.local.get(null, (items) => {
  console.log('Extension data:', items);
});
```

### Verify permissions
- Check `manifest.json` for required permissions
- All needed permissions are already included

### Reset extension data
1. Go to `chrome://extensions/`
2. Find Sparrow
3. Click "Remove"
4. Reload unpacked extension
5. All data will be fresh

---

## Tips & Tricks

💡 **Use consistent names** - Makes it easier to find reminders

💡 **Mix time intervals** - Use different units for different reminders

💡 **Check settings** - Toggle notifications on/off as needed

💡 **Disable vs Delete** - Disable to pause a reminder, delete to remove

💡 **Use emojis creatively** - Each emoji visually identifies your reminder

---

## What's Next?

1. ✅ Install the extension
2. ✅ Create your first reminder
3. ✅ Customize settings
4. ✅ Start using!

---

## Questions?

Check the documentation files:
- [README.md](README.md) - Comprehensive guide
- [CODE_REFERENCE.md](CODE_REFERENCE.md) - Programming reference
- [UI_DESIGN.md](UI_DESIGN.md) - Design system

Enjoy Sparrow! 🐦
