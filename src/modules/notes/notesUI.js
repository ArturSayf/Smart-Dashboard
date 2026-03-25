import { getMainContainer } from '../../core/uiContainer.js';
import { addNote, getTodayNotes, removeNote, formatBulletList, formatNumberedList } from './notes.js';
import { getTodayString } from '../../core/dataService.js';

let currentContent = '';

export function renderNotesUI() {
    const container = getMainContainer();
    if (!container) return;

    container.innerHTML = `
        <div class="notes-screen">
            <div class="card">
                <input type="text" id="note-title" placeholder="Заголовок заметки" class="note-title-input">
                <textarea id="note-content" rows="5" placeholder="Введите текст заметки..."></textarea>
                <div class="format-buttons">
                    <button id="bullet-btn" class="btn-secondary">• Маркированный список</button>
                    <button id="numbered-btn" class="btn-secondary">1. Нумерованный список</button>
                </div>
                <button id="save-note" class="btn-primary">Сохранить заметку</button>
            </div>
            <div id="notes-list" class="notes-list"></div>
        </div>
    `;

    const textarea = document.getElementById('note-content');
    const bulletBtn = document.getElementById('bullet-btn');
    const numberedBtn = document.getElementById('numbered-btn');
    const saveBtn = document.getElementById('save-note');

    // Обработчик маркированного списка
    bulletBtn.addEventListener('click', () => {
        const rawText = textarea.value;
        const formatted = formatBulletList(rawText);
        textarea.value = formatted.replace(/<\/?ul>|<\/?li>/g, '').replace(/\n/g, '');
        currentContent = formatted;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });

    // Обработчик нумерованного списка
    numberedBtn.addEventListener('click', () => {
        const rawText = textarea.value;
        const formatted = formatNumberedList(rawText);
        textarea.value = formatted.replace(/<\/?ol>|<\/?li>/g, '').replace(/\n/g, '');
        currentContent = formatted;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });

    // Сохранение заметки
    saveBtn.addEventListener('click', () => {
        const title = document.getElementById('note-title').value;
        const content = currentContent || formatBulletList(textarea.value) || formatNumberedList(textarea.value) || textarea.value;
        if (!title && !content) return;

        addNote(title, content);
        document.getElementById('note-title').value = '';
        textarea.value = '';
        currentContent = '';
        renderNotesList();
    });

    renderNotesList();
}

function renderNotesList() {
    const listContainer = document.getElementById('notes-list');
    if (!listContainer) return;

    const todayNotes = getTodayNotes();
    if (todayNotes.length === 0) {
        listContainer.innerHTML = '<div class="card empty">Нет заметок за сегодня</div>';
        return;
    }

    listContainer.innerHTML = todayNotes.map(note => `
        <div class="card note-item" data-id="${note.id}" data-date="${note.date}">
            <div class="note-header">
                <h3>${escapeHtml(note.title)}</h3>
                <button class="delete-note" data-id="${note.id}" data-date="${note.date}">✖</button>
            </div>
            <div class="note-content">${note.content}</div>
            <div class="note-date">${new Date(note.createdAt).toLocaleString()}</div>
        </div>
    `).join('');

    // Навесить удаление
    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            const date = btn.dataset.date;
            removeNote(date, id);
            renderNotesList();
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}