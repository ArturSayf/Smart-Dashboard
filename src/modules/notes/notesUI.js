import { getMainContainer } from '../../core/uiContainer.js';
import { getNotesByDate, saveNoteForDate, deleteNoteForDate } from './notes.js';
import { getTodayString, formatDate } from '../../utils/dateHelpers.js';

let currentDate = getTodayString();

export function render() {
  const container = getMainContainer();
  const notes = getNotesByDate(currentDate);

  container.innerHTML = `
    <div class="card">
      <h2>📝 Заметки – ${formatDate(currentDate)}</h2>
      <div class="form-group">
        <label>Название</label>
        <input type="text" id="note-title" placeholder="Заголовок">
      </div>
      <div class="form-group">
        <label>Текст</label>
        <textarea id="note-content" rows="5" placeholder="Содержание заметки"></textarea>
      </div>
      <div style="margin-bottom: 12px;">
        <button id="list-ul-btn" class="icon-btn">• Маркированный</button>
        <button id="list-ol-btn" class="icon-btn">1. Нумерованный</button>
      </div>
      <button class="primary" id="save-note-btn">Сохранить заметку</button>
    </div>

    <div class="card">
      <h3>📋 Сегодняшние заметки</h3>
      <div id="notes-list"></div>
    </div>
  `;

  renderNotesList(notes);

  const titleInput = document.getElementById('note-title');
  const contentTextarea = document.getElementById('note-content');

  // Функция для преобразования строк в список
  function applyList(type) {
    const text = contentTextarea.value;
    const lines = text.split('\n');
    const newLines = lines.map((line, idx) => {
      if (line.trim() === '') return '';
      return type === 'ul' ? `• ${line}` : `${idx+1}. ${line}`;
    });
    contentTextarea.value = newLines.join('\n');
  }

  document.getElementById('list-ul-btn').addEventListener('click', () => applyList('ul'));
  document.getElementById('list-ol-btn').addEventListener('click', () => applyList('ol'));

  document.getElementById('save-note-btn').addEventListener('click', () => {
    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();
    if (!title && !content) {
      alert('Введите хотя бы название или текст');
      return;
    }
    saveNoteForDate(currentDate, { title, content });
    titleInput.value = '';
    contentTextarea.value = '';
    renderNotesList(getNotesByDate(currentDate));
  });
}

function renderNotesList(notes) {
  const listDiv = document.getElementById('notes-list');
  if (!notes.length) {
    listDiv.innerHTML = '<p style="color: var(--text-secondary);">Нет заметок на сегодня</p>';
    return;
  }
  listDiv.innerHTML = notes.map(note => `
    <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--border);">
      <div style="display: flex; justify-content: space-between;">
        <strong>${note.title || 'Без названия'}</strong>
        <button class="delete-note" data-id="${note.id}" style="background: none; border: none; color: red;">✖</button>
      </div>
      <pre style="white-space: pre-wrap; font-family: inherit; margin-top: 8px;">${note.content}</pre>
    </div>
  `).join('');

  document.querySelectorAll('.delete-note').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      deleteNoteForDate(currentDate, id);
      renderNotesList(getNotesByDate(currentDate));
    });
  });
}