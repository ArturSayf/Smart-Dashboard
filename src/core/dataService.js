let store = {
    profile: {
        name: 'Иван Петров',
        bio: 'Студент, учусь разработке',
        birthday: '',
        avatar: null
    },
    notes: [],
    habits: {
        water: { history: {} },
        sport: { history: {} },
        read: { history: {} },
        streak: 0,
        lastUpdate: ''
    },
    dayNotes: {}
};

export function initData() {
    const saved = localStorage.getItem('myday_app');
    if (saved) {
        store = JSON.parse(saved);
    } else {
        saveData();
    }
}

function saveData() {
    localStorage.setItem('myday_app', JSON.stringify(store));
}

export function getStore() { return store; }

export function updateProfile(updates) {
    Object.assign(store.profile, updates);
    saveData();
}

export function getNotes() { return store.notes; }
export function addNote(note) {
    store.notes.unshift(note);
    saveData();
}
export function updateNote(id, updates) {
    const idx = store.notes.findIndex(n => n.id === id);
    if (idx !== -1) {
        Object.assign(store.notes[idx], updates);
        saveData();
    }
}
export function deleteNote(id) {
    store.notes = store.notes.filter(n => n.id !== id);
    saveData();
}

export function getHabits() { return store.habits; }
export function updateHabits(habitData) {
    Object.assign(store.habits, habitData);
    saveData();
}
export function addHabitEntry(type, date, value) {
    if (!store.habits[type].history[date]) store.habits[type].history[date] = 0;
    store.habits[type].history[date] += value;
    saveData();
}

export function getDayNotes() { return store.dayNotes; }
export function addDayNote(date, text) {
    if (!store.dayNotes[date]) store.dayNotes[date] = [];
    store.dayNotes[date].push(text);
    saveData();
}
export function deleteDayNote(date, index) {
    if (store.dayNotes[date]) {
        store.dayNotes[date].splice(index, 1);
        if (store.dayNotes[date].length === 0) delete store.dayNotes[date];
        saveData();
    }
}

export function resetAllData() {
    store = {
        profile: { name: 'Иван Петров', bio: 'Студент, учусь разработке', birthday: '', avatar: null },
        notes: [],
        habits: { water: { history: {} }, sport: { history: {} }, read: { history: {} }, streak: 0, lastUpdate: '' },
        dayNotes: {}
    };
    saveData();
    location.reload();
}