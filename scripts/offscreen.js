"use strict";
// Offscreen audio playback handler
const notificationAudio = new Audio(chrome.runtime.getURL('assets/tweet.mp3'));
notificationAudio.preload = 'auto';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const typedRequest = request;
    if (typedRequest.type === 'PLAY_SOUND') {
        void executeNotificationSound();
        sendResponse({ success: true });
    }
});
async function executeNotificationSound() {
    try {
        notificationAudio.currentTime = 0;
        await notificationAudio.play();
    }
    catch (error) {
        console.error('Error playing notification sound:', error);
    }
}
