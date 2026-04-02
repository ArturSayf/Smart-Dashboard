export function formatDate(date) {
    return new Date(date).toLocaleDateString('ru-RU');
}
export function getTodayISO() {
    return new Date().toISOString().split('T')[0];
}