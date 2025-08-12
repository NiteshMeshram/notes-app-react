import React, { useEffect, useState } from "react";
import type { Note } from "../model/Note";
import { addNote } from "../utils/localStorageUtils";

interface NoteFormProps {
  noteToEdit?: Note;
  onSave: (note: Note) => void;
  onCancel: () => void; // Optional cancel callback
}

export default function NoteForm({
  noteToEdit,
  onSave,
  onCancel,
}: NoteFormProps) {
  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");

  const clearForm = () => {
    setTitle("");
    setContent("");
  };

  // Sync state when noteToEdit changes
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Note = {
      id: noteToEdit?.id ?? crypto.randomUUID(), // more robust than Math.random
      title: title.trim(),
      content: content.trim(),
      dateCreated: noteToEdit?.dateCreated ?? new Date().toISOString(),
    };
    onSave(newNote);
    clearForm();
  };

  return (
    <div>
      <h2>{noteToEdit ? "Edit Note" : "Create Note"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={title} // bind value to state
            onChange={(e) => setTitle(e.target.value)} // update state on change
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            required
            value={content} // bind value to state
            onChange={(e) => setContent(e.target.value)} // update state on change
          ></textarea>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button type="submit">
            {noteToEdit ? "Update Note" : "Save Note"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ background: "#ccc" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
