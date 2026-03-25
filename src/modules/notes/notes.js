import { saveNote, getNotesForDate, deleteNote, getTodayString } from '../../core/dataService.js';

// Преобразовать текст в маркированный список
export function formatBulletList(text) {
    const lines = text.split('\n');
    if (lines.length === 1 && lines[0] === '') return '';
    return '<ul>' + lines.map(line => `<li>${escapeHtml(line)}</li>`).join('') + '</ul>';
}

// Преобразовать текст в нумерованный список
export function formatNumberedList(text) {
    const lines = text.split('\n');
    if (lines.length === 1 && lines[0] === '') return '';
    return '<ol>' + lines.map(line => `<li>${escapeHtml(line)}</li>`).join('') + '</ol>';
}

// Экранирование HTML
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function(c) {
        return c;
    });
}

// Сохранить заметку
export function addNote(title, contentHtml) {
    const now = new Date();
    const note = {
        id: Date.now(),
        title: title.trim() || 'Без заголовка',
        content: contentHtml,
        createdAt: now.toISOString(),
        date: getTodayString()
    };
    saveNote(note);
    return note;
}

// Получить заметки на сегодня
export function getTodayNotes() {
    return getNotesForDate(getTodayString());
}

// Удалить заметку
export function removeNote(date, id) {
    deleteNote(date, id);
}