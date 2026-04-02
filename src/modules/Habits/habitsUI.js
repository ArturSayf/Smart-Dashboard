import { getMainContainer } from '../../core/uiContainer.js';
import { getHabitsData, addValue, getTodayTotals } from './habits.js';
import { getTodayISO } from '../../utils/helpers.js';
import './habits.css';

export function renderHabitsUI() {
    const container = getMainContainer();
    const totals = getTodayTotals();
    const todayStr = new Date().toLocaleDateString('ru-RU');

    container.innerHTML = `
        <div class="habits-container">
            <div class="habits-header">
                <h3>Привычки на сегодня</h3>
                <span class="date">${todayStr}</span>
            </div>
            <div class="habit-card">
                <div class="habit-title">💧 Вода</div>
                <div class="habit-value" id="waterTotal">${totals.water.toFixed(1)} л</div>
                <div class="habit-control">
                    <input type="number" id="waterInput" step="0.1" placeholder="0.5">
                    <button id="addWaterBtn">+</button>
                </div>
            </div>
            <div class="habit-card">
                <div class="habit-title">🏃 Спорт</div>
                <div class="habit-value" id="sportTotal">${totals.sport} мин</div>
                <div class="habit-control">
                    <input type="number" id="sportInput" step="5" placeholder="15">
                    <button id="addSportBtn">+</button>
                </div>
            </div>
            <div class="habit-card">
                <div class="habit-title">📚 Чтение</div>
                <div class="habit-value" id="readTotal">${totals.read} мин</div>
                <div class="habit-control">
                    <input type="number" id="readInput" step="5" placeholder="30">
                    <button id="addReadBtn">+</button>
                </div>
            </div>
            <div class="hint" id="habitsHint">✅ Добавлено</div>
        </div>
    `;

    function updateUI() {
        const newTotals = getTodayTotals();
        document.getElementById('waterTotal').innerText = newTotals.water.toFixed(1) + ' л';
        document.getElementById('sportTotal').innerText = newTotals.sport + ' мин';
        document.getElementById('readTotal').innerText = newTotals.read + ' мин';
        const hint = document.getElementById('habitsHint');
        hint.classList.add('show');
        setTimeout(() => hint.classList.remove('show'), 1000);
    }

    document.getElementById('addWaterBtn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('waterInput').value);
        if (val > 0) { addValue('water', val); updateUI(); document.getElementById('waterInput').value = ''; }
    });
    document.getElementById('addSportBtn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('sportInput').value);
        if (val > 0) { addValue('sport', val); updateUI(); document.getElementById('sportInput').value = ''; }
    });
    document.getElementById('addReadBtn').addEventListener('click', () => {
        const val = parseFloat(document.getElementById('readInput').value);
        if (val > 0) { addValue('read', val); updateUI(); document.getElementById('readInput').value = ''; }
    });
}