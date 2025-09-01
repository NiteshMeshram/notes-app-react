import type { Note } from "../model/Note";


// This function returns a Promise of notes
export async function getDBNotes(): Promise<Note[]> {
  const response = await fetch("http://localhost:5000/api/notes"); // ✅ correct endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  const data: Note[] = await response.json();
  return data;
}

// add a new note
export async function addDBNote(note: Omit<Note, "id" | "dateCreated" | "updatedAt">): Promise<Note> {
  const response = await fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("Failed to add note");
  }
  return await response.json();
}

export async function editDBNote(note: Note): Promise<Note> {
  const pathId = note._id;  // send whichever you have
  if (!pathId) throw new Error("Note must include _id or id");

  const response = await fetch(`http://localhost:5000/api/notes/${pathId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: note.title,
      content: note.content,
    }),
  });

  if (!response.ok) throw new Error("Failed to update note");
  return await response.json();
}

export async function deleteDBNote(note: Note): Promise<void> {
  if (!note._id) throw new Error("Note must have an _id to delete");

  const response = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
}

export default {
  getDBNotes,
  addDBNote,
deleteDBNote,
//   clearDBNotes,
};

