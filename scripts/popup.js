"use strict";
// Constants
const DEFAULT_SETTINGS = {
    desktopNotifications: true,
    notificationSounds: true,
};
const EMOJIS = [
    '😀',
    '📅',
    '🔔',
    '⏰',
    '🎯',
    '📍',
    '🌟',
    '💡',
    '🎨',
    '🎭',
    '🎪',
    '🎬',
    '🎤',
    '🎧',
    '🎮',
    '🎲',
    '🎰',
    '🃏',
    '📢',
];
// State
let reminders = [];
let settings = DEFAULT_SETTINGS;
let pendingDeleteId = null;
let isAddReminderExpanded = false;
let editingReminderId = null;
// DOM Elements
const remindersContainer = document.getElementById('reminders-container');
const emptyState = document.getElementById('empty-state');
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const deleteModal = document.getElementById('deleteModal');
// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    renderReminders();
});
// Load data from storage
async function loadData() {
    const data = await chrome.storage.local.get(['reminders', 'settings']);
    reminders = data.reminders || [];
    settings = { ...DEFAULT_SETTINGS, ...data.settings };
    loadSettingsUI();
}
// Save data to storage
async function saveData() {
    await chrome.storage.local.set({
        reminders,
        settings,
    });
}
function getIntervalMilliseconds(value, unit) {
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
// Event Listeners Setup
function setupEventListeners() {
    // Settings
    settingsBtn.addEventListener('click', openSettingsModal);
    document.querySelectorAll('.close-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal)
                modal.classList.add('hidden');
        });
    });
    // Settings Modal
    document.getElementById('saveSettingsBtn')?.addEventListener('click', saveSettings);
    // Delete Modal
    document.getElementById('cancelDeleteBtn')?.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
        pendingDeleteId = null;
    });
    document.getElementById('confirmDeleteBtn')?.addEventListener('click', () => {
        if (pendingDeleteId) {
            deleteReminder(pendingDeleteId);
            deleteModal.classList.add('hidden');
            pendingDeleteId = null;
        }
    });
    // Click outside modals to close
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal)
            settingsModal.classList.add('hidden');
    });
    deleteModal.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            deleteModal.classList.add('hidden');
            pendingDeleteId = null;
        }
    });
}
// Settings Modal
function openSettingsModal() {
    loadSettingsUI();
    settingsModal.classList.remove('hidden');
}
function loadSettingsUI() {
    document.getElementById('desktopNotifications').checked =
        settings.desktopNotifications;
    document.getElementById('notificationSounds').checked =
        settings.notificationSounds;
}
async function saveSettings() {
    settings.desktopNotifications = document.getElementById('desktopNotifications').checked;
    settings.notificationSounds = document.getElementById('notificationSounds').checked;
    await saveData();
    settingsModal.classList.add('hidden');
}
// Delete Reminder with modal confirmation
function showDeleteConfirmation(id) {
    pendingDeleteId = id;
    deleteModal.classList.remove('hidden');
}
async function deleteReminder(id) {
    reminders = reminders.filter((r) => r.id !== id);
    await saveData();
    renderReminders();
}
// Toggle Reminder
async function toggleReminder(id) {
    const reminder = reminders.find((r) => r.id === id);
    if (reminder) {
        reminder.enabled = !reminder.enabled;
        await saveData();
        renderReminders();
    }
}
function openEditReminder(id) {
    editingReminderId = id;
    isAddReminderExpanded = true;
    renderReminders();
}
// Render Reminders
function renderReminders() {
    remindersContainer.innerHTML = '';
    if (reminders.length === 0) {
        emptyState.style.display = 'flex';
    }
    else {
        emptyState.style.display = 'none';
        reminders.forEach((reminder) => {
            const item = document.createElement('div');
            item.className = 'reminder-item';
            const repeatLabel = reminder.repeatType === 'infinite'
                ? '∞ infinite'
                : `× ${reminder.repeatCount - reminder.repeatedCount} left`;
            item.innerHTML = `
        <div class="reminder-icon">${reminder.icon}</div>
        <div class="reminder-content">
          <div class="reminder-name">${reminder.name}</div>
          <div class="reminder-time">Every ${reminder.value} ${reminder.unit}</div>
        </div>
        <div class="reminder-repeat">${repeatLabel}</div>
        <div class="reminder-item-actions">
          <button class="reminder-item-btn toggle-btn" title="${reminder.enabled ? 'Disable' : 'Enable'} reminder">
            ${reminder.enabled ? '⏸️' : '▶️'}
          </button>
          <button class="reminder-item-btn edit-btn" title="Edit reminder">✏️</button>
          <button class="reminder-item-btn delete-btn" title="Delete reminder">🗑️</button>
        </div>
      `;
            item.querySelector('.toggle-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleReminder(reminder.id);
            });
            item.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                showDeleteConfirmation(reminder.id);
            });
            item.querySelector('.edit-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                openEditReminder(reminder.id);
            });
            remindersContainer.appendChild(item);
        });
    }
    // Add the "Add Reminder" row
    renderAddReminderRow();
}
// Render inline add reminder row
function renderAddReminderRow() {
    if (!isAddReminderExpanded) {
        const addReminderTrigger = document.createElement('button');
        addReminderTrigger.type = 'button';
        addReminderTrigger.className = 'add-reminder-trigger';
        addReminderTrigger.textContent = '+ Add new reminder';
        addReminderTrigger.addEventListener('click', () => {
            isAddReminderExpanded = true;
            renderReminders();
        });
        remindersContainer.appendChild(addReminderTrigger);
        return;
    }
    const addRow = document.createElement('div');
    addRow.className = 'add-reminder-row';
    const editingReminder = editingReminderId
        ? reminders.find((reminder) => reminder.id === editingReminderId) || null
        : null;
    let selectedIcon = editingReminder?.icon || '😀';
    const emojiButton = document.createElement('button');
    emojiButton.type = 'button';
    emojiButton.id = 'add-reminder-row-icon';
    emojiButton.className = 'add-reminder-row-icon';
    emojiButton.textContent = selectedIcon;
    emojiButton.title = 'Choose icon';
    const emojiPickerId = `addEmojiPicker_${Date.now()}`;
    const emojiPicker = document.createElement('div');
    emojiPicker.id = emojiPickerId;
    emojiPicker.className = 'emoji-picker hidden';
    const emojiGrid = document.createElement('div');
    emojiGrid.className = 'emoji-grid';
    EMOJIS.forEach((emoji) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'emoji-option';
        btn.textContent = emoji;
        emojiGrid.appendChild(btn);
    });
    emojiPicker.appendChild(emojiGrid);
    const inputsContainer = document.createElement('div');
    inputsContainer.className = 'add-reminder-row-inputs';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'add-reminder-row-input';
    nameInput.placeholder = 'Name';
    nameInput.maxLength = 50;
    nameInput.value = editingReminder?.name || '';
    const valueInput = document.createElement('input');
    valueInput.type = 'number';
    valueInput.className = 'add-reminder-row-input';
    valueInput.placeholder = 'Value';
    valueInput.min = '1';
    valueInput.max = '999';
    valueInput.style.flex = '0.6';
    valueInput.style.minWidth = '60px';
    valueInput.value = editingReminder ? String(editingReminder.value) : '';
    const unitSelect = document.createElement('select');
    unitSelect.className = 'add-reminder-row-select';
    const units = [
        'minutes',
        'hours',
        'days',
        'weeks',
    ];
    units.forEach((unit) => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        unitSelect.appendChild(option);
    });
    unitSelect.value = editingReminder?.unit || 'minutes';
    const repeatContainer = document.createElement('div');
    repeatContainer.className = 'add-reminder-row-repeat';
    const repeatInfiniteRadio = document.createElement('input');
    repeatInfiniteRadio.type = 'radio';
    repeatInfiniteRadio.name = `repeatType_${Date.now()}`;
    repeatInfiniteRadio.value = 'infinite';
    repeatInfiniteRadio.checked = editingReminder ? editingReminder.repeatType === 'infinite' : true;
    const repeatInfiniteLabel = document.createElement('label');
    repeatInfiniteLabel.textContent = 'Infinite';
    repeatInfiniteLabel.insertAdjacentElement('afterbegin', repeatInfiniteRadio);
    const repeatTimesRadio = document.createElement('input');
    repeatTimesRadio.type = 'radio';
    repeatTimesRadio.name = repeatInfiniteRadio.name;
    repeatTimesRadio.value = 'times';
    repeatTimesRadio.checked = Boolean(editingReminder && editingReminder.repeatType === 'times');
    const repeatTimesLabel = document.createElement('label');
    repeatTimesLabel.textContent = 'Times:';
    repeatTimesLabel.insertAdjacentElement('afterbegin', repeatTimesRadio);
    const repeatCountInput = document.createElement('input');
    repeatCountInput.type = 'number';
    repeatCountInput.className = 'add-reminder-row-input';
    repeatCountInput.placeholder = '0';
    repeatCountInput.min = '1';
    repeatCountInput.max = '999';
    repeatCountInput.disabled = !repeatTimesRadio.checked;
    repeatCountInput.style.flex = '0.6';
    repeatCountInput.style.minWidth = '60px';
    repeatCountInput.value =
        editingReminder && editingReminder.repeatType === 'times'
            ? String(editingReminder.repeatCount)
            : '';
    repeatInfiniteRadio.addEventListener('change', () => {
        repeatCountInput.disabled = true;
    });
    repeatTimesRadio.addEventListener('change', () => {
        repeatCountInput.disabled = false;
        repeatCountInput.focus();
    });
    repeatContainer.appendChild(repeatInfiniteLabel);
    repeatContainer.appendChild(repeatTimesLabel);
    repeatContainer.appendChild(repeatCountInput);
    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'add-reminder-row-actions';
    const saveBtn = document.createElement('button');
    saveBtn.type = 'button';
    saveBtn.className = 'add-reminder-save-btn';
    saveBtn.textContent = editingReminder ? '✓ Save' : '✓ Add';
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'add-reminder-cancel-btn';
    cancelBtn.textContent = editingReminder ? 'Cancel' : '✕';
    actionsContainer.appendChild(saveBtn);
    actionsContainer.appendChild(cancelBtn);
    inputsContainer.appendChild(nameInput);
    inputsContainer.appendChild(valueInput);
    inputsContainer.appendChild(unitSelect);
    inputsContainer.appendChild(repeatContainer);
    inputsContainer.appendChild(actionsContainer);
    addRow.appendChild(emojiButton);
    addRow.appendChild(inputsContainer);
    addRow.appendChild(emojiPicker);
    // Event Listeners
    emojiButton.addEventListener('click', () => {
        emojiPicker.classList.toggle('hidden');
    });
    emojiGrid.querySelectorAll('.emoji-option').forEach((emoji) => {
        emoji.addEventListener('click', (e) => {
            const selectedEmoji = e.target.textContent || '';
            selectedIcon = selectedEmoji;
            emojiButton.textContent = selectedIcon;
            emojiPicker.classList.add('hidden');
        });
    });
    saveBtn.addEventListener('click', async () => {
        const icon = selectedIcon.trim();
        const name = nameInput.value.trim();
        const value = parseInt(valueInput.value, 10);
        const unit = unitSelect.value;
        const repeatType = repeatContainer.querySelector('input[type="radio"]:checked')?.value;
        const repeatCount = parseInt(repeatCountInput.value || '0', 10);
        if (!icon || !name || !value || value <= 0) {
            alert('Please fill in all required fields with valid values.');
            return;
        }
        if (editingReminder && editingReminderId) {
            const intervalMs = getIntervalMilliseconds(value, unit);
            const nextTrigger = Date.now() + intervalMs;
            const normalizedRepeatCount = repeatType === 'times' ? repeatCount : 0;
            const shouldResetRepeatedCount = repeatType === 'times' &&
                (editingReminder.repeatType !== 'times' ||
                    editingReminder.repeatCount !== normalizedRepeatCount);
            const normalizedRepeatedCount = repeatType === 'times'
                ? shouldResetRepeatedCount
                    ? 0
                    : Math.min(editingReminder.repeatedCount, normalizedRepeatCount)
                : editingReminder.repeatedCount;
            reminders = reminders.map((reminder) => {
                if (reminder.id !== editingReminderId)
                    return reminder;
                return {
                    ...reminder,
                    icon,
                    name,
                    value,
                    unit,
                    repeatType,
                    repeatCount: normalizedRepeatCount,
                    repeatedCount: normalizedRepeatedCount,
                    nextTrigger,
                };
            });
        }
        else {
            const now = Date.now();
            const reminder = {
                id: Date.now().toString(),
                icon,
                name,
                value,
                unit,
                repeatType,
                repeatCount: repeatType === 'times' ? repeatCount : 0,
                repeatedCount: 0,
                lastTriggered: 0,
                nextTrigger: now,
                enabled: true,
            };
            reminders.push(reminder);
        }
        await saveData();
        editingReminderId = null;
        isAddReminderExpanded = false;
        renderReminders();
    });
    cancelBtn.addEventListener('click', () => {
        editingReminderId = null;
        isAddReminderExpanded = false;
        renderReminders();
    });
    remindersContainer.appendChild(addRow);
}
