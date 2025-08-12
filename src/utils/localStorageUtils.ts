import type { Note } from "../model/Note";

const NOTES_KEY = "my_notes_app";

/**
 * Get all notes from localStorage
 */
export function getNotes(): Note[] {
  const data = localStorage.getItem(NOTES_KEY);
  return data ? JSON.parse(data) as Note[] : [];
}

/**
 * Save all notes to localStorage
 */
function saveNotes(notes: Note[]): void {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

/**
 * Add a new note
 */
export function addNote(note: Note): void {
  const notes = getNotes();
  notes.push(note);
  saveNotes(notes);
}

/**
 * Delete a note by ID
 */
export function deleteNote(id: string): void {
  const notes = getNotes().filter(n => n.id !== id);
  saveNotes(notes);
}

/**
 * Clear all notes
 */
export function clearNotes(): void {
  localStorage.removeItem(NOTES_KEY);
}

export default {
  getNotes,
  addNote,
  deleteNote,
  clearNotes
};