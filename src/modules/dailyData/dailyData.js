import { getHabitsForDate, addHabitsForDate, getTodayString } from '../../core/dataService.js';

// Получить сегодняшние привычки
export function getTodayHabits() {
    return getHabitsForDate(getTodayString());
}

// Добавить значения привычек (суммируются)
export function addHabits(sleep, sport, reading) {
    const today = getTodayString();
    return addHabitsForDate(today, { sleep, sport, reading });
}