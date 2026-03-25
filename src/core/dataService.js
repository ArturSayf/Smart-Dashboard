const STORAGE_KEYS = {
    HABITS: 'habitsData',
    NOTES: 'notesData'
};

// Получить все привычки
export function getAllHabits() {
    const data = localStorage.getItem(STORAGE_KEYS.HABITS);
    return data ? JSON.parse(data) : {};
}

// Получить привычки на конкретную дату
export function getHabitsForDate(date) {
    const all = getAllHabits();
    return all[date] || { sleep: 0, sport: 0, reading: 0 };
}

// Сохранить привычки (добавить к существующим)
export function addHabitsForDate(date, newValues) {
    const all = getAllHabits();
    const current = all[date] || { sleep: 0, sport: 0, reading: 0 };
    all[date] = {
        sleep: current.sleep + (newValues.sleep || 0),
        sport: current.sport + (newValues.sport || 0),
        reading: current.reading + (newValues.reading || 0)
    };
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(all));
    return all[date];
}

// Получить все заметки
export function getAllNotes() {
    const data = localStorage.getItem(STORAGE_KEYS.NOTES);
    return data ? JSON.parse(data) : {};
}

// Получить заметки на дату
export function getNotesForDate(date) {
    const all = getAllNotes();
    return all[date] || [];
}

// Сохранить новую заметку
export function saveNote(note) {
    const date = note.date;
    const all = getAllNotes();
    if (!all[date]) all[date] = [];
    all[date].push(note);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(all));
    return note;
}

// Удалить заметку
export function deleteNote(date, noteId) {
    const all = getAllNotes();
    if (all[date]) {
        all[date] = all[date].filter(n => n.id !== noteId);
        localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(all));
    }
}

// Получить сегодняшнюю дату в формате YYYY-MM-DD
export function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}