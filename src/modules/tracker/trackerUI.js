import { getMainContainer } from '../../core/uiContainer.js';
import { getStats, getLast7Days } from './tracker.js';
import { getDayNotes, addDayNote, deleteDayNote } from '../../core/dataService.js';
import './tracker.css';

let currentSelectedDate = null;

export function renderTrackerUI() {
    const container = getMainContainer();
    const stats = getStats();
    const days = getLast7Days();
    const dayNotes = getDayNotes();

    container.innerHTML = `
        <div class="tracker-container">
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-value">${stats.streak}</div><div>дней подряд</div></div>
                <div class="stat-card"><div class="stat-value">${stats.waterTotal.toFixed(1)} л</div><div>всего воды</div></div>
                <div class="stat-card"><div class="stat-value">${stats.notesCount}</div><div>заметок</div></div>
                <div class="stat-card"><div class="stat-value">${stats.sportTotal} мин</div><div>спорта</div></div>
                <div class="stat-card"><div class="stat-value">${stats.readTotal} мин</div><div>чтения</div></div>
                <div class="stat-card"><div class="stat-value">${stats.totalDays}</div><div>всего действий</div></div>
            </div>
            <div class="week-calendar">
                <h4>Календарь активности</h4>
                <div class="week-grid" id="weekGrid"></div>
            </div>
            <div id="dayNotesPanel" style="display:none;" class="day-notes-panel">
                <h5>Заметки за <span id="selectedDateLabel"></span></h5>
                <div id="dayNotesList"></div>
                <textarea id="dayNoteInput" class="form-input" rows="2" placeholder="Добавить заметку..."></textarea>
                <button class="btn-primary" id="addDayNoteBtn">Добавить</button>
            </div>
            <button class="btn-secondary" id="resetDataBtn">🗑️ Очистить все данные</button>
        </div>
    `;

    function renderCalendar() {
        const grid = document.getElementById('weekGrid');
        const dayNames = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
        const habits = stats.habits;
        let html = '';
        days.forEach((date, idx) => {
            const hasWater = habits.water.history[date] > 0;
            const hasSport = habits.sport.history[date] > 0;
            const hasRead = habits.read.history[date] > 0;
            const active = hasWater || hasSport || hasRead;
            const isSelected = (currentSelectedDate === date);
            html += `<div class="week-day ${active ? 'active' : ''} ${isSelected ? 'selected' : ''}" data-date="${date}">${dayNames[idx]}</div>`;
        });
        grid.innerHTML = html;
        document.querySelectorAll('.week-day').forEach(day => {
            day.addEventListener('click', () => selectDate(day.dataset.date));
        });
    }

    function selectDate(date) {
        currentSelectedDate = date;
        renderCalendar();
        const panel = document.getElementById('dayNotesPanel');
        const notesForDate = getDayNotes()[date] || [];
        const formatted = new Date(date).toLocaleDateString('ru-RU');
        document.getElementById('selectedDateLabel').innerText = formatted;
        const listDiv = document.getElementById('dayNotesList');
        if (notesForDate.length) {
            listDiv.innerHTML = notesForDate.map((note, idx) => `
                <div class="day-note-item">
                    ${escapeHtml(note)}
                    <button class="delete-day-note" data-date="${date}" data-idx="${idx}">✕</button>
                </div>
            `).join('');
        } else {
            listDiv.innerHTML = '<p class="empty">Нет заметок</p>';
        }
        panel.style.display = 'block';

        document.querySelectorAll('.delete-day-note').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const d = btn.dataset.date;
                const i = parseInt(btn.dataset.idx);
                deleteDayNote(d, i);
                selectDate(d); // refresh
            });
        });
    }

    document.getElementById('addDayNoteBtn').addEventListener('click', () => {
        if (currentSelectedDate) {
            const text = document.getElementById('dayNoteInput').value.trim();
            if (text) {
                addDayNote(currentSelectedDate, text);
                document.getElementById('dayNoteInput').value = '';
                selectDate(currentSelectedDate);
            }
        }
    });

    document.getElementById('resetDataBtn').addEventListener('click', () => {
        if (confirm('Удалить все данные? Это действие необратимо.')) {
            const { resetAllData } = require('../../core/dataService.js');
            resetAllData();
        }
    });

    renderCalendar();
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}