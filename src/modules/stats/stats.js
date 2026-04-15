import { storage, KEYS } from '../../utils/storage.js';
import { getNotesByDate } from '../notes/notes.js';
import { getHabitsDataByDate, getHabitDefinitions } from '../habits/habits.js';

export function getStatsForDate(date) {
  const notes = getNotesByDate(date);
  const habitsData = getHabitsDataByDate(date);
  const habitDefs = getHabitDefinitions();
  const habits = habitDefs.map(h => ({
    name: h.name,
    unit: h.unit,
    value: habitsData[h.id] || 0
  }));
  return { notes, habits };
}