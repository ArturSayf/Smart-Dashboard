import { getMainContainer } from '../../core/uiContainer.js';
import { getTodayHabits, addHabits } from './dailyData.js';

export function renderDailyDataUI() {
    const container = getMainContainer();
    if (!container) return;

    container.innerHTML = `
        <div class="habits-screen">
            <div class="card habit-card">
                <label>СОН (часы)</label>
                <div class="habit-control">
                    <input type="number" id="sleep-input" step="0.5" value="0">
                    <button id="sleep-plus" class="plus-btn">+</button>
                </div>
                <div class="habit-total">Всего сегодня: <span id="sleep-total">0</span> ч.</div>
            </div>
            <div class="card habit-card">
                <label>Спорт (часы)</label>
                <div class="habit-control">
                    <input type="number" id="sport-input" step="0.5" value="0">
                    <button id="sport-plus" class="plus-btn">+</button>
                </div>
                <div class="habit-total">Всего сегодня: <span id="sport-total">0</span> ч.</div>
            </div>
            <div class="card habit-card">
                <label>Чтение (часы)</label>
                <div class="habit-control">
                    <input type="number" id="reading-input" step="0.5" value="0">
                    <button id="reading-plus" class="plus-btn">+</button>
                </div>
                <div class="habit-total">Всего сегодня: <span id="reading-total">0</span> ч.</div>
            </div>
            <button id="save-habits" class="btn-primary">Сохранить</button>
        </div>
    `;

    // Загрузить текущие значения
    const todayHabits = getTodayHabits();
    document.getElementById('sleep-total').innerText = todayHabits.sleep;
    document.getElementById('sport-total').innerText = todayHabits.sport;
    document.getElementById('reading-total').innerText = todayHabits.reading;

    // Плюс-кнопки
    document.getElementById('sleep-plus').addEventListener('click', () => {
        const input = document.getElementById('sleep-input');
        input.value = parseFloat(input.value) + 1;
    });
    document.getElementById('sport-plus').addEventListener('click', () => {
        const input = document.getElementById('sport-input');
        input.value = parseFloat(input.value) + 1;
    });
    document.getElementById('reading-plus').addEventListener('click', () => {
        const input = document.getElementById('reading-input');
        input.value = parseFloat(input.value) + 1;
    });

    // Сохранить
    document.getElementById('save-habits').addEventListener('click', () => {
        const sleep = parseFloat(document.getElementById('sleep-input').value) || 0;
        const sport = parseFloat(document.getElementById('sport-input').value) || 0;
        const reading = parseFloat(document.getElementById('reading-input').value) || 0;

        addHabits(sleep, sport, reading);

        // Обновить отображение итогов
        const newTotals = getTodayHabits();
        document.getElementById('sleep-total').innerText = newTotals.sleep;
        document.getElementById('sport-total').innerText = newTotals.sport;
        document.getElementById('reading-total').innerText = newTotals.reading;

        // Сбросить поля ввода
        document.getElementById('sleep-input').value = 0;
        document.getElementById('sport-input').value = 0;
        document.getElementById('reading-input').value = 0;
    });
}