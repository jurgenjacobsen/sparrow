// Type definitions
interface Reminder {
  id: string;
  icon: string;
  name: string;
  value: number;
  unit: 'minutes' | 'hours' | 'days' | 'weeks';
  repeatType: 'infinite' | 'times';
  repeatCount: number;
  repeatedCount: number;
  lastTriggered: number;
  nextTrigger: number;
  enabled: boolean;
}

interface Settings {
  desktopNotifications: boolean;
  notificationSounds: boolean;
}

// Helper function to convert time interval to milliseconds
function getMilliseconds(value: number, unit: Reminder['unit']): number {
  switch (unit) {
    case 'minutes':
      return value * 60 * 1000;
    case 'hours':
      return value * 60 * 60 * 1000;
    case 'days':
      return value * 24 * 60 * 60 * 1000;
    case 'weeks':
      return value * 7 * 24 * 60 * 60 * 1000;
  }
}

// Initialize
chrome.runtime.onInstalled.addListener(() => {
  console.log('Sparrow Reminder Manager installed!');
  initializeReminders();
});

chrome.runtime.onStartup.addListener(() => {
  initializeReminders();
});

async function initializeReminders(): Promise<void> {
  await chrome.alarms.clearAll();
  await scheduleReminders();
}

// Storage listener
chrome.storage.onChanged.addListener((changes) => {
  if (changes.reminders || changes.settings) {
    chrome.alarms.clearAll();
    scheduleReminders();
  }
});

// Schedule reminders
async function scheduleReminders(): Promise<void> {
  const data = await chrome.storage.local.get(['reminders']);
  const reminders = (data.reminders as Reminder[]) || [];

  reminders.forEach((reminder) => {
    if (!reminder.enabled) return;

    const now = Date.now();
    const interval = getMilliseconds(reminder.value, reminder.unit);
    const nextTrigger = reminder.nextTrigger > now ? reminder.nextTrigger : now + interval;

    chrome.alarms.create(reminder.id, {
      when: nextTrigger,
    });
  });
}

// Alarm triggered
chrome.alarms.onAlarm.addListener(async (alarm) => {
  const data = await chrome.storage.local.get(['reminders', 'settings']);
  const reminders = (data.reminders as Reminder[]) || [];
  const settings = (data.settings as Settings) || {
    desktopNotifications: true,
    notificationSounds: true,
  };

  const reminder = reminders.find((r) => r.id === alarm.name);
  if (!reminder || !reminder.enabled) return;

  // Send notification
  if (settings.desktopNotifications) {
    await showNotification(reminder, alarm.name);
  }

  // Play sound
  if (settings.notificationSounds) {
    await playNotificationSound();
  }

  // Update reminder
  reminder.lastTriggered = Date.now();
  reminder.repeatedCount++;

  const interval = getMilliseconds(reminder.value, reminder.unit);
  reminder.nextTrigger = Date.now() + interval;

  // Check if reminder should be disabled
  if (reminder.repeatType === 'times' && reminder.repeatedCount >= reminder.repeatCount) {
    reminder.enabled = false;
  }

  // Save updated reminders
  await chrome.storage.local.set({ reminders });

  // Reschedule
  await scheduleReminders();
});

async function showNotification(reminder: Reminder, alarmName: string): Promise<void> {
  const notificationId = `sparrow-${alarmName}`;

  return new Promise((resolve) => {
    chrome.notifications.create(
      notificationId,
      {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('assets/icon.png'),
        title: `${reminder.icon} - ${reminder.name}`,
        message: `It's time for your reminder!`,
        priority: 2,
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to create notification:', chrome.runtime.lastError.message);
        }
        resolve();
      }
    );
  });
}

// Play notification sound
async function playNotificationSound(): Promise<void> {
  try {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: ['AUDIO_PLAYBACK'],
      justification: 'Play reminder notification sounds',
    });
  } catch (error) {
    const message = String(error && (error as Error).message ? (error as Error).message : error);
    if (!message.includes('Only a single offscreen document')) {
      console.error('Failed to create offscreen document:', error);
      return;
    }
  }

  chrome.runtime.sendMessage({ type: 'PLAY_SOUND' }, () => {
    if (chrome.runtime.lastError) {
      console.log('Offscreen document not ready yet');
    }
  });
}

// Handle notification clicks
chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId.startsWith('sparrow-')) {
    chrome.action.openPopup();
  }
});

// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_REMINDERS') {
    chrome.storage.local.get(['reminders'], (data) => {
      sendResponse(data.reminders || []);
    });
    return true;
  }
});

console.log('Sparrow background service worker loaded');
