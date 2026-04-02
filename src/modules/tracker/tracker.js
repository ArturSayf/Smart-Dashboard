import { getStore } from '../../core/dataService.js';
import { getAllNotes } from '../notes/notes.js';

export function getStats() {
    const store = getStore();
    const habits = store.habits;
    const waterTotal = Object.values(habits.water.history || {}).reduce((a,b)=>a+b,0);
    const sportTotal = Object.values(habits.sport.history || {}).reduce((a,b)=>a+b,0);
    const readTotal = Object.values(habits.read.history || {}).reduce((a,b)=>a+b,0);
    const notesCount = getAllNotes().length;
    const totalDays = Object.keys(habits.water.history || {}).length +
                      Object.keys(habits.sport.history || {}).length +
                      Object.keys(habits.read.history || {}).length;
    return {
        streak: habits.streak || 0,
        waterTotal,
        sportTotal,
        readTotal,
        notesCount,
        totalDays,
        habits
    };
}

export function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().split('T')[0]);
    }
    return days;
}