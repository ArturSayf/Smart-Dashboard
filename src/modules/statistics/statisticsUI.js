import { getMainContainer } from '../../core/uiContainer.js';
import { getWeekDates, getDayData } from './statistics.js';

let currentWeekStart = new Date();
let selectedDate = null;

export function renderStatisticsUI() {
    const container = getMainContainer();
    if (!container) return;

    container.innerHTML = `
        <div class="statistics-screen">
            <div class="week-navigation">
                <button id="prev-week" class="nav-week-btn">←</button>
                <span id="week-range"></span>
                <button id="next-week" class="nav-week-btn">→</button>
            </div>
            <div class="days-buttons" id="days-buttons"></div>
            <div class="selected-day-info" id="selected-day-info">
                <h3>Выберите день</h3>
            </div>
        </div>
    `;

    function renderWeek() {
        const weekDates = getWeekDates(currentWeekStart);
        const start = new Date(weekDates[0]);
        const end = new Date(weekDates[6]);
        const rangeStr = `${start.getDate()}.${start.getMonth()+1} - ${end.getDate()}.${end.getMonth()+1}`;
        document.getElementById('week-range').innerText = rangeStr;

        const daysContainer = document.getElementById('days-buttons');
        daysContainer.innerHTML = weekDates.map(date => {
            const dayNum = new Date(date).getDate();
            const isSelected = (selectedDate === date);
            return `<button class="day-btn ${isSelected ? 'active' : ''}" data-date="${date}">${dayNum}</button>`;
        }).join('');

        // Навесить обработчики на дни
        document.querySelectorAll('.day-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const date = btn.dataset.date;
                selectedDate = date;
                renderDayInfo(date);
                // обновить активный класс
                document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Если выбранный день не из этой недели, сбросить
        if (selectedDate && !weekDates.includes(selectedDate)) {
            selectedDate = null;
            document.getElementById('selected-day-info').innerHTML = '<h3>Выберите день</h3>';
        } else if (selectedDate) {
            renderDayInfo(selectedDate);
        }
    }

    function renderDayInfo(date) {
        const data = getDayData(date);
        const habits = data.habits;
        const notes = data.notes;

        const notesHtml = notes.length ? notes.map(n => `
            <div class="stat-note">
                <strong>${escapeHtml(n.title)}</strong>
                <div>${n.content}</div>
            </div>
        `).join('') : '<p>Нет заметок</p>';

        const infoDiv = document.getElementById('selected-day-info');
        infoDiv.innerHTML = `
            <h3>${date}</h3>
            <div class="habits-summary">
                <p>Сон: ${habits.sleep} ч.</p>
                <p>Спорт: ${habits.sport} ч.</p>
                <p>Чтение: ${habits.reading} ч.</p>
            </div>
            <h4>Заметки за день</h4>
            <div class="notes-of-day">${notesHtml}</div>
        `;
    }

    document.getElementById('prev-week').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderWeek();
    });

    document.getElementById('next-week').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderWeek();
    });

    renderWeek();
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