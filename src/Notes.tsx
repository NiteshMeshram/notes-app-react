import React, { useEffect, useState } from "react";
import "./notes.css";
import NoteForm from "./components/NoteForm";
import { addNote, getNotes } from "./utils/localStorageUtils";
import type { Note } from "./model/Note";
import NotesList from "./components/NotesList";

export default function Notes() {
  const items: string[] = [
    "- Create a note with a title and content ",
    "- Delete a note ",
    "- Edit an existing note ",
    "- View a list of all notes ",
    "- Save notes locally (to a JSON file or localStorage) ",
    "- Search notes (optional)",
    // '-  Filter notes by date or category (optional)',
    // '-  Sort notes by date or title (optional)',
    // '-  Mark notes as important or favorite (optional)',
    // '-  Add tags or labels to notes (optional)',
    // '-  Sync notes with a backend server (optional)',
  ];

  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = React.useState<Note[]>([]);

  const addNotes = () => {
    console.log("Add Notes button clicked");
    // Logic to add a new note can be implemented here
    setShowForm(!showForm);
  };

  useEffect(() => {
    setNotes(getNotes());
  }, []);

  const handleAddNote = (newNote: Note) => {
    addNote(newNote); // Save the new note to localStorage
    setNotes((prevNotes) => [...prevNotes, newNote]); // updates UI instantly

    // addNoteToStorage(newNote); // save in localStorage
    // setNotes((prev) => [...prev, newNote]); // update UI instantly
    setShowForm(false); // close form if needed
  };

  return (
    <div>
      <p>Notes Component</p> {/* Keep this outside the flex container */}
      <div className="flex-container">
        {/* <div className="column">Column 1</div> */}
        <div className="column">
          <input id="add" type="button" onClick={addNotes} value="Add Notes" />
          {showForm && <NoteForm onSave={handleAddNote} />}

          <NotesList notes={notes} />
        </div>
        <div className="column">
          <p>Features</p>
          {/* List of features */}
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
