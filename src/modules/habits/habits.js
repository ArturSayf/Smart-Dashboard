import { storage, KEYS } from '../../utils/storage.js';
import { getTodayString } from '../../utils/dateHelpers.js';

// Определения привычек (можно редактировать)
const DEFAULT_HABITS = [
  { id: '1', name: 'Чтение', unit: 'страниц' },
  { id: '2', name: 'Сон', unit: 'часов' },
  { id: '3', name: 'Спорт', unit: 'минут' }
];

export function getHabitDefinitions() {
  return storage.get(KEYS.HABITS_DEFS, DEFAULT_HABITS);
}

export function saveHabitDefinitions(defs) {
  storage.set(KEYS.HABITS_DEFS, defs);
}

export function getHabitsDataByDate(date) {
  const all = storage.get(KEYS.HABITS_DATA, {});
  return all[date] || {};
}

export function addHabitValue(date, habitId, value) {
  const all = storage.get(KEYS.HABITS_DATA, {});
  if (!all[date]) all[date] = {};
  const current = all[date][habitId] || 0;
  all[date][habitId] = current + Number(value);
  storage.set(KEYS.HABITS_DATA, all);
}