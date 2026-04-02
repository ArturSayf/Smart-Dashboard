import { getHabits, updateHabits, addHabitEntry, getStore } from '../../core/dataService.js';
import { getTodayISO } from '../../utils/helpers.js';

export function getHabitsData() {
    return getHabits();
}

export function addValue(type, value) {
    const today = getTodayISO();
    addHabitEntry(type, today, value);
    updateStreak();
}

function updateStreak() {
    const habits = getHabits();
    const today = getTodayISO();
    // простая логика: если сегодня есть хоть одна активность -> стрик растёт
    const hasAny = (habits.water.history[today] > 0) || (habits.sport.history[today] > 0) || (habits.read.history[today] > 0);
    let newStreak = habits.streak || 0;
    if (hasAny) {
        newStreak++;
    } else {
        newStreak = 0;
    }
    updateHabits({ streak: newStreak, lastUpdate: today });
}

export function getTodayTotals() {
    const habits = getHabits();
    const today = getTodayISO();
    return {
        water: habits.water.history[today] || 0,
        sport: habits.sport.history[today] || 0,
        read: habits.read.history[today] || 0
    };
}