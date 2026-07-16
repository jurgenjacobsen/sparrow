"use strict";
// ponytail: simplified time conversion to a single-line map lookup
const BG_UNIT_MS = { minutes: 60000, hours: 3600000, days: 86400000, weeks: 604800000 };
const getMilliseconds = (value, unit) => value * BG_UNIT_MS[unit];
// Initialize
chrome.runtime.onInstalled.addListener(() => {
    console.log('Sparrow Reminder Manager installed!');
    initializeReminders();
});
chrome.runtime.onStartup.addListener(() => {
    initializeReminders();
});
async function initializeReminders() {
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
async function scheduleReminders() {
    const data = await chrome.storage.local.get(['reminders']);
    const reminders = data.reminders || [];
    reminders.forEach((reminder) => {
        if (!reminder.enabled)
            return;
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
    const reminders = data.reminders || [];
    const settings = data.settings || {
        desktopNotifications: true,
        notificationSounds: true,
    };
    const reminder = reminders.find((r) => r.id === alarm.name);
    if (!reminder || !reminder.enabled)
        return;
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
// ponytail: await notifications.create directly, as MV3 APIs natively return promises
async function showNotification(reminder, alarmName) {
    await chrome.notifications.create(`sparrow-${alarmName}`, {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('assets/icon.png'),
        title: `${reminder.icon} - ${reminder.name}`,
        message: `It's time for your reminder!`,
        priority: 2,
    });
}
// Play notification sound
async function playNotificationSound() {
    try {
        await chrome.offscreen.createDocument({
            url: 'offscreen.html',
            reasons: ['AUDIO_PLAYBACK'],
            justification: 'Play reminder notification sounds',
        });
    }
    catch (error) {
        const message = String(error && error.message ? error.message : error);
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
// ponytail: removed dead GET_REMINDERS message listener
console.log('Sparrow background service worker loaded');
