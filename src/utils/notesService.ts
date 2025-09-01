import type { Note } from "../model/Note";
import {
  getNotes as lsGetNotes,
  addNote as lsAddNote,
  editNote as lsEditNote,
  deleteNote as lsDeleteNote,
} from "./localStorageUtils";
import {
  getDBNotes,
  addDBNote,
  editDBNote,
  deleteDBNote,
} from "./notesApi";

/** Input for creating a note (same shape for Local & DB) */
export type NewNoteInput = Omit<Note, "_id" | "dateCreated" | "updatedAt">;

/** Local storage service (adapts `id` ↔ `_id`) */
export const LocalNotesService = {
  async getNotes(): Promise<Note[]> {
    // local utils return notes with `id`; expose `_id` too for UI consistency
    const raw = lsGetNotes();
    return raw.map((n) => ({
      ...n,
      _id: (n as any)._id ?? n._id, // mirror id into _id
    }));
  },

  async addNote(input: NewNoteInput): Promise<Note> {
    // Create both `id` and `_id` (UUID) for local notes
    const uuid = crypto.randomUUID();
    const created: Note = {
      _id: uuid,
      title: input.title,
      content: input.content,
      dateCreated: new Date().toISOString(),
    };
    lsAddNote(created); // saves using `id`
    return created;
  },

  async editNote(note: Note): Promise<Note> {
    // Ensure local utils can match by `id`
    const normalized: Note = {
      ...note,
      _id: note._id ?? note._id,
    };

    // Attempt edit; local util overwrites by id
    lsEditNote(normalized);

    // Read back to return the saved copy
    const saved = lsGetNotes().find((n) => n._id === normalized._id);
    if (!saved) {
      // If not found (legacy data), upsert as add
      lsAddNote(normalized);
      return { ...normalized };
    }
    return { ...saved, _id: (saved as any)._id ?? saved._id };
  },

  async deleteNote(note: Note): Promise<void> {
    const id = note._id ?? note._id;
    if (!id) throw new Error("Note must have id/_id to delete (Local)");
    lsDeleteNote(id);
  },
};

/** MongoDB/API service (thin wrapper around fetch calls) */
export const DBNotesService = {
  getNotes: getDBNotes,
  addNote:  async (input: NewNoteInput) => {
    return addDBNote({ title: input.title, content: input.content } as any);
  },
  editNote: editDBNote,
  deleteNote: deleteDBNote,
};