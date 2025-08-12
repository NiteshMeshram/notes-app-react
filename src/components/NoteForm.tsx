import React from "react";
import type { Note } from "../model/Note";
import { addNote } from "../utils/localStorageUtils";

interface NoteFormProps {
  onSave: (note: Note) => void;
}

export default function NoteForm({ onSave }: NoteFormProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [notes, setNotes] = React.useState<Note[]>([]);

  const clearForm = () => {
    setTitle("");
    setContent("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newNote = {
      title,
      content,
      dateCreated: new Date().toISOString(),
      id: Math.random().toString(36).substring(2, 15), // Generate a random ID
    };

    // addNote(newNote); // Save the new note to localStorage
    // setNotes((prevNotes) => [...prevNotes, newNote]); // updates UI instantly
    // setNotes((prevNotes) => {
    //   const updatedNotes = [...prevNotes, newNote];
    //   console.log("Note saved Updated:", updatedNotes);
    //   return updatedNotes;
    // });
    onSave(newNote);
    clearForm();
  };

  return (
    <div>
      <h2>Create Note</h2>
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
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}
