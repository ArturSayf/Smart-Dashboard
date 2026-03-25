import { getAllHabits, getAllNotes } from '../../core/dataService.js';

// Получить даты недели (понедельник-воскресенье) для заданной даты
export function getWeekDates(referenceDate = new Date()) {
    const current = new Date(referenceDate);
    const day = current.getDay(); // 0 воскресенье
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(current);
    monday.setDate(current.getDate() + diffToMonday);
    const week = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        week.push(d.toISOString().split('T')[0]);
    }
    return week;
}

// Получить данные для отображения по выбранной дате
export function getDayData(date) {
    const habits = getAllHabits();
    const notes = getAllNotes();
    return {
        habits: habits[date] || { sleep: 0, sport: 0, reading: 0 },
        notes: notes[date] || []
    };
}