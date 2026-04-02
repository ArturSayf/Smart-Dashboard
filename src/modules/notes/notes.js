import { getNotes, addNote, updateNote, deleteNote } from '../../core/dataService.js';

export function getAllNotes() { return getNotes(); }
export function createNote(title, content) {
    addNote({
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString('ru-RU')
    });
}
export function editNote(id, title, content) {
    updateNote(id, { title, content });
}
export function removeNote(id) {
    deleteNote(id);
}