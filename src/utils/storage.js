// Работа с localStorage
export const storage = {
  get(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Специфичные ключи
export const KEYS = {
  PROFILE: 'profile',
  NOTES: 'notes_by_date',
  HABITS_DATA: 'habits_data_by_date',
  HABITS_DEFS: 'habits_definitions'
};