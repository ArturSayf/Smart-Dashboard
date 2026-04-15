import { getMainContainer } from '../../core/uiContainer.js';
import { getStatsForDate } from './stats.js';
import { getTodayString, formatDate } from '../../utils/dateHelpers.js';

export function render() {
  const container = getMainContainer();
  container.innerHTML = `
    <div class="card">
      <h2>📊 Статистика</h2>
      <div class="form-group">
        <label>Выберите дату</label>
        <input type="date" id="stats-date-picker" value="${getTodayString()}">
      </div>
      <div id="stats-content"></div>
    </div>
  `;

  const picker = document.getElementById('stats-date-picker');
  picker.addEventListener('change', () => updateStatsContent(picker.value));
  updateStatsContent(picker.value);
}

function updateStatsContent(date) {
  const stats = getStatsForDate(date);
  const contentDiv = document.getElementById('stats-content');

  let html = `<h3>${formatDate(date)}</h3>`;

  // Привычки
  html += `<h4 style="margin-top: 16px;">✅ Привычки</h4>`;
  if (stats.habits.length === 0) {
    html += '<p>Нет данных</p>';
  } else {
    html += '<ul style="list-style: none; padding-left: 0;">';
    stats.habits.forEach(h => {
      html += `<li>${h.name}: ${h.value} ${h.unit}</li>`;
    });
    html += '</ul>';
  }

  // Заметки
  html += `<h4 style="margin-top: 16px;">📝 Заметки</h4>`;
  if (stats.notes.length === 0) {
    html += '<p>Нет заметок</p>';
  } else {
    stats.notes.forEach(note => {
      html += `
        <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 8px; border: 1px solid var(--border);">
          <strong>${note.title || 'Без названия'}</strong>
          <pre style="white-space: pre-wrap; font-family: inherit; margin-top: 8px;">${note.content}</pre>
        </div>
      `;
    });
  }

  contentDiv.innerHTML = html;
}