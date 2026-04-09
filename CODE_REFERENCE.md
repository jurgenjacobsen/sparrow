## Code Examples & Reference

### Creating a Reminder Programmatically

```typescript
const reminder: Reminder = {
  id: Date.now().toString(),
  icon: '🎯',
  name: 'Daily Meeting',
  value: 1,
  unit: 'days',
  repeatType: 'infinite',
  repeatCount: 0,
  repeatedCount: 0,
  lastTriggered: 0,
  nextTrigger: Date.now(),
  enabled: true,
};

reminders.push(reminder);
await chrome.storage.local.set({ reminders });
```

### Accessing Settings

```typescript
// Load settings
const data = await chrome.storage.local.get(['settings']);
const settings = { ...DEFAULT_SETTINGS, ...data.settings };

// Save settings
chrome.storage.local.set({
  settings: {
    desktopNotifications: true,
    notificationSounds: true
  }
});
```

### CSS Customization

Change the accent color throughout the UI:

```css
:root {
  --accent-color: #F7BE48;      /* Main accent */
  --accent-hover: #f0b13a;      /* On hover */
}
```

Customize spacing:
```css
--border-radius: 8px;  /* Main elements */
/* Buttons use: calc(var(--border-radius) / 2) = 4px */
```

### Event Handling Examples

Toggle reminder enabled state:
```typescript
function toggleReminder(id: string) {
  const reminder = reminders.find((r) => r.id === id);
  if (reminder) {
    reminder.enabled = !reminder.enabled;
    saveData();
    renderReminders();
  }
}
```

Delete a reminder:
```typescript
function deleteReminder(id: string) {
  reminders = reminders.filter((r) => r.id !== id);
  saveData();
  renderReminders();
}
```

### Time Interval Conversion

Convert reminder intervals to milliseconds:

```typescript
function getMilliseconds(value: number, unit: string): number {
  const intervals = {
    'minutes': value * 60 * 1000,
    'hours': value * 60 * 60 * 1000,
    'days': value * 24 * 60 * 60 * 1000,
    'weeks': value * 7 * 24 * 60 * 60 * 1000,
  };
  return intervals[unit];
}
```

### Types Reference

```typescript
interface Reminder {
  id: string;                                      // Unique identifier
  icon: string;                                    // Emoji icon (1-2 chars)
  name: string;                                    // Reminder name
  value: number;                                   // Interval count
  unit: 'minutes' | 'hours' | 'days' | 'weeks';   // Interval unit
  repeatType: 'infinite' | 'times';               // Repeat mode
  repeatCount: number;                            // Total repeats (0 if infinite)
  repeatedCount: number;                          // Times triggered
  lastTriggered: number;                          // Timestamp
  nextTrigger: number;                            // Next alarm time
  enabled: boolean;                               // Active state
}

interface Settings {
  desktopNotifications: boolean;                  // Show notifications
  notificationSounds: boolean;                    // Play sounds
}
```

## Extending the Extension

### Add a New Setting

1. Add to `Settings` interface:
```typescript
interface Settings {
  desktopNotifications: boolean;
  notificationSounds: boolean;
  newSetting: boolean;  // NEW
}
```

2. Add to HTML form:
```html
<div class="setting-item">
  <label>
    <input type="checkbox" id="newSetting" />
    <span>Enable New Setting</span>
  </label>
</div>
```

3. Load in UI:
```typescript
(document.getElementById('newSetting') as HTMLInputElement).checked = 
  settings.newSetting;
```

4. Save from UI:
```typescript
settings.newSetting = 
  (document.getElementById('newSetting') as HTMLInputElement).checked;
```

### Add More Emoji Options

Edit the emoji picker in `popup.html`:

```html
<div class="emoji-grid">
  😀📅🔔⏰🎯📍🌟💡🎨🎭  <!-- First row -->
  🎪🎬🎤🎧🎮🎲🎰🃏🎯📢  <!-- Second row -->
  <!-- Add more here -->
</div>
```

### Customize Time Units

To add more time units (currently: minutes, hours, days, weeks):

1. Add to unit select in `popup.html`:
```html
<option value="months">Months</option>
```

2. Update type in `popup.ts`:
```typescript
unit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
```

3. Add conversion in `background.js`:
```typescript
case 'months':
  return value * 30 * 24 * 60 * 60 * 1000;
```

### Modify Notification Appearance

Edit notification in `background.js`:

```typescript
chrome.notifications.create(`sparrow-${alarm.name}`, {
  type: 'basic',
  iconUrl: 'assets/icon.png',
  title: `Custom Title: ${reminder.name}`,
  message: `Custom message: ${reminder.icon}`,
  priority: 2,
});
```

### Change Sound Frequency

Edit the beep in `scripts/offscreen.js`:

```typescript
osc.frequency.value = 1000;  // Change from 800 to 1000 Hz
gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);  // Longer duration
```

## Testing Checklist

- [ ] Add reminder works
- [ ] Edit reminder works
- [ ] Delete reminder works  
- [ ] Toggle enable/disable works
- [ ] Emoji picker appears and selection works
- [ ] Form validation works
- [ ] Settings modal opens/closes
- [ ] Notification sound plays
- [ ] Desktop notification appears
- [ ] Data persists after restart
- [ ] Multiple reminders display correctly
- [ ] Repeat counter updates correctly

## Build Commands

```bash
# One-time build
npm run build

# Watch for changes
npm run watch

# Package for distribution
npm run bundle
```

## Debug Tips

1. **View console logs**: 
   - Go to `chrome://extensions/`
   - Find Sparrow → Inspect views → console.log appears here

2. **Check storage**:
   ```typescript
   chrome.storage.local.get(null, (items) => {
     console.log('All storage:', items);
   });
   ```

3. **Test notifications**:
   ```typescript
   chrome.notifications.create('test', {
     type: 'basic',
     iconUrl: 'assets/icon.png',
     title: 'Test Notification',
     message: 'This is a test'
   });
   ```

4. **Monitor alarms**:
   ```typescript
   chrome.alarms.getAll((alarms) => {
     console.log('Active alarms:', alarms);
   });
   ```

## Performance Optimization

- Reminders stored in localStorage (instant access)
- Limiting emoji picker to 20 emojis (fast rendering)
- CSS transitions at 0.2s (smooth but responsive)
- No external dependencies (lightweight)
- Service worker sleeps between alarms (battery efficient)
