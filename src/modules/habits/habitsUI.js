import { getMainContainer } from '../../core/uiContainer.js';
import { getHabitDefinitions, saveHabitDefinitions, getHabitsDataByDate, addHabitValue } from './habits.js';
import { getTodayString, formatDate } from '../../utils/dateHelpers.js';

let habitDefs = getHabitDefinitions();
let currentDate = getTodayString();

export function render() {
  const container = getMainContainer();
  const todayData = getHabitsDataByDate(currentDate);

  container.innerHTML = `
    <div class="card">
      <h2>✅ Привычки – ${formatDate(currentDate)}</h2>
      <div id="habits-inputs"></div>
      <button class="primary" id="save-habits-btn">Сохранить</button>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h3>⚙️ Управление привычками</h3>
        <button id="add-habit-btn" class="icon-btn">➕ Добавить</button>
      </div>
      <div id="habits-list"></div>
    </div>
  `;

  renderHabitInputs(todayData);
  renderHabitDefinitionsList();

  document.getElementById('save-habits-btn').addEventListener('click', () => {
    const inputs = document.querySelectorAll('.habit-value-input');
    inputs.forEach(input => {
      const habitId = input.dataset.habitId;
      const value = parseFloat(input.value);
      if (!isNaN(value) && value > 0) {
        addHabitValue(currentDate, habitId, value);
      }
    });
    // Очищаем поля
    inputs.forEach(i => i.value = '');
    renderHabitInputs(getHabitsDataByDate(currentDate));
  });

  document.getElementById('add-habit-btn').addEventListener('click', addNewHabit);
}

function renderHabitInputs(todayData) {
  const div = document.getElementById('habits-inputs');
  if (!habitDefs.length) {
    div.innerHTML = '<p>Добавьте привычки в разделе управления</p>';
    return;
  }
  div.innerHTML = habitDefs.map(h => `
    <div class="form-group">
      <label>${h.name} (${h.unit}) – сегодня: ${todayData[h.id] || 0} ${h.unit}</label>
      <input type="number" step="0.1" class="habit-value-input" data-habit-id="${h.id}" placeholder="Введите значение">
    </div>
  `).join('');
}

function renderHabitDefinitionsList() {
  const listDiv = document.getElementById('habits-list');
  listDiv.innerHTML = habitDefs.map(h => `
    <div style="display: flex; align-items: center; margin-bottom: 8px; gap: 8px;">
      <input type="text" value="${h.name}" data-id="${h.id}" class="habit-name-edit" style="flex:2;">
      <input type="text" value="${h.unit}" data-id="${h.id}" class="habit-unit-edit" style="flex:1;">
      <button data-id="${h.id}" class="delete-habit-btn" style="background:none; border:none; color:red;">✖</button>
    </div>
  `).join('');

  // Сохранение изменений при потере фокуса
  document.querySelectorAll('.habit-name-edit, .habit-unit-edit').forEach(input => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const habit = habitDefs.find(h => h.id === id);
      if (e.target.classList.contains('habit-name-edit')) {
        habit.name = e.target.value;
      } else {
        habit.unit = e.target.value;
      }
      saveHabitDefinitions(habitDefs);
      // Обновить отображение полей ввода
      renderHabitInputs(getHabitsDataByDate(currentDate));
    });
  });

  document.querySelectorAll('.delete-habit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      habitDefs = habitDefs.filter(h => h.id !== id);
      saveHabitDefinitions(habitDefs);
      render();
    });
  });
}

function addNewHabit() {
  const name = prompt('Название привычки:');
  if (!name) return;
  const unit = prompt('Единица измерения (например, минут):', 'раз');
  const newHabit = {
    id: Date.now().toString(),
    name,
    unit: unit || 'раз'
  };
  habitDefs.push(newHabit);
  saveHabitDefinitions(habitDefs);
  render();
}