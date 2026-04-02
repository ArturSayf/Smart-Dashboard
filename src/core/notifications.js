export function sendNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body });
    }
}
export function requestNotificationPermission() {
    if ('Notification' in window) Notification.requestPermission();
}