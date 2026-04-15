import { storage, KEYS } from '../../utils/storage.js';
import { getTodayString } from '../../utils/dateHelpers.js';

export function getNotesByDate(date) {
  const all = storage.get(KEYS.NOTES, {});
  return all[date] || [];
}

export function saveNoteForDate(date, note) {
  const all = storage.get(KEYS.NOTES, {});
  if (!all[date]) all[date] = [];
  const newNote = {
    id: Date.now() + '-' + Math.random().toString(36),
    title: note.title,
    content: note.content,
    createdAt: new Date().toISOString()
  };
  all[date].push(newNote);
  storage.set(KEYS.NOTES, all);
  return newNote;
}

export function deleteNoteForDate(date, noteId) {
  const all = storage.get(KEYS.NOTES, {});
  if (all[date]) {
    all[date] = all[date].filter(n => n.id !== noteId);
    storage.set(KEYS.NOTES, all);
  }
}