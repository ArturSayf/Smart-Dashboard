import { getMainContainer } from '../../core/uiContainer.js';
import { getAllNotes, createNote, editNote, removeNote } from './notes.js';
import './notes.css';

let currentEditId = null;

export function renderNotesUI() {
    const container = getMainContainer();
    const notes = getAllNotes();

    container.innerHTML = `
        <div class="notes-container">
            <div class="notes-form">
                <input type="text" id="noteTitle" class="form-input" placeholder="Заголовок">
                <textarea id="noteContent" class="form-input" rows="3" placeholder="Текст заметки..."></textarea>
                <div class="button-group">
                    <button class="btn-small" id="bulletBtn">• Маркированный</button>
                    <button class="btn-small" id="numberBtn">1. Нумерованный</button>
                </div>
                <button class="btn-primary" id="addNoteBtn">➕ Добавить заметку</button>
            </div>
            <div id="notesList" class="notes-list"></div>
        </div>
        <div id="editModal" class="modal hidden">
            <div class="modal-content">
                <h3>Редактировать</h3>
                <input type="text" id="editTitle" class="form-input" placeholder="Заголовок">
                <textarea id="editContent" class="form-input" rows="4"></textarea>
                <div class="modal-actions">
                    <button class="btn-secondary" id="cancelEditBtn">Отмена</button>
                    <button class="btn-primary" id="saveEditBtn">Сохранить</button>
                </div>
            </div>
        </div>
    `;

    function renderNotesList() {
        const list = document.getElementById('notesList');
        const all = getAllNotes();
        list.innerHTML = all.map(note => `
            <div class="note-card">
                <div class="note-header">
                    <strong>${escapeHtml(note.title)}</strong>
                    <div>
                        <button class="edit-note" data-id="${note.id}">✏️</button>
                        <button class="delete-note" data-id="${note.id}">🗑️</button>
                    </div>
                </div>
                <div class="note-content">${escapeHtml(note.content).replace(/\n/g, '<br>')}</div>
                <div class="note-date">${note.date}</div>
            </div>
        `).join('');
        document.querySelectorAll('.edit-note').forEach(btn => {
            btn.addEventListener('click', (e) => openEditModal(parseInt(btn.dataset.id)));
        });
        document.querySelectorAll('.delete-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('Удалить заметку?')) {
                    removeNote(parseInt(btn.dataset.id));
                    renderNotesList();
                }
            });
        });
    }

    function openEditModal(id) {
        const note = getAllNotes().find(n => n.id === id);
        if (note) {
            currentEditId = id;
            document.getElementById('editTitle').value = note.title;
            document.getElementById('editContent').value = note.content;
            document.getElementById('editModal').classList.remove('hidden');
        }
    }

    function closeModal() {
        document.getElementById('editModal').classList.add('hidden');
        currentEditId = null;
    }

    document.getElementById('addNoteBtn').addEventListener('click', () => {
        const title = document.getElementById('noteTitle').value.trim();
        const content = document.getElementById('noteContent').value.trim();
        if (title && content) {
            createNote(title, content);
            document.getElementById('noteTitle').value = '';
            document.getElementById('noteContent').value = '';
            renderNotesList();
        }
    });

    document.getElementById('bulletBtn').addEventListener('click', () => {
        const ta = document.getElementById('noteContent');
        ta.value += '\n• ';
        ta.focus();
    });
    document.getElementById('numberBtn').addEventListener('click', () => {
        const ta = document.getElementById('noteContent');
        ta.value += '\n1. ';
        ta.focus();
    });

    document.getElementById('saveEditBtn').addEventListener('click', () => {
        if (currentEditId) {
            const newTitle = document.getElementById('editTitle').value.trim();
            const newContent = document.getElementById('editContent').value.trim();
            if (newTitle && newContent) {
                editNote(currentEditId, newTitle, newContent);
                renderNotesList();
                closeModal();
            }
        }
    });
    document.getElementById('cancelEditBtn').addEventListener('click', closeModal);
    document.getElementById('editModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('editModal')) closeModal();
    });

    renderNotesList();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}