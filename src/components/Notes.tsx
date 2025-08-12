import React, { useEffect, useState } from "react";
// import "./notes.css";
import "../assets/notes.css"; // Ensure this path is correct based on your project structure
import NoteForm from "./NoteForm";
import {
  addNote,
  deleteNote,
  editNote,
  getNotes,
} from "../utils/localStorageUtils";
import type { Note } from "../model/Note";
import NotesList from "./NotesList";
import Alert from "./Alert";

type AlertType = "success" | "error" | "info";

export default function Notes() {
  const items: string[] = [
    "Create a note with a title and content - Done",
    "Delete a note - Done",
    "Edit an existing note - Done",
    "View a list of all notes - Done",
    "Save notes locally (to a JSON file or localStorage) - Done",
    "Search notes (optional) - Done",
  ];

  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = () => {
    const storedNotes = getNotes();
    setNotes(storedNotes);
    setFilteredNotes(storedNotes);
  };

  const handleAddNote = (noteData: Omit<Note, "id">) => {
    if (noteToEdit) {
      const updatedNote: Note = { ...noteToEdit, ...noteData }; // keep old id
      editNote(updatedNote);
      setNoteToEdit(undefined);
    } else {
      const newNote: Note = { id: crypto.randomUUID(), ...noteData };
      addNote(newNote);
    }
    refreshNotes(); // refresh notes from localStorage
    setShowForm(false);
    showAlert(
      `Note ${noteToEdit ? "updated" : "added"} successfully!`,
      "success"
    );
  };

  const handleDelete = (id: string) => {
    deleteNote(id); // remove from localStorage
    refreshNotes(); // refresh notes from localStorage
    showAlert("Note deleted successfully!", "error");
  };

  const handleEditClick = (note: Note) => {
    setNoteToEdit(note);
    setShowForm(true);
    //  showAlert(
    //   `Note ${noteToEdit ? "updated" : "added"} successfully!`,
    //   "success"
    // );
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredNotes(notes);
      return;
    }
    const lowerTerm = term.toLowerCase();
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerTerm) ||
          note.content.toLowerCase().includes(lowerTerm)
      )
    );
  };

  const showAlert = (message: string, type: string) => {
    setAlert({ message, type });
  };

  return (
    <div>
      <Alert
        message={alert.message}
        type={alert.type as AlertType} // cast if you are sure
        onClose={() => setAlert({ message: "", type: "" })}
      />
      <p>Notes Component</p> {/* Keep this outside the flex container */}
      <div className="flex-container">
        <div className="column">
          <div className="notes-header">
            <input
              type="search"
              placeholder="Search notes..."
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <button
              className="add-btn"
              onClick={() => {
                setNoteToEdit(undefined); // clear edit state
                setShowForm(true);
              }}
            >
              + Add Note
            </button>
          </div>

          {showForm && (
            <NoteForm
              onSave={handleAddNote}
              noteToEdit={noteToEdit}
              onCancel={() => {
                setShowForm(false);
                setNoteToEdit(undefined);
              }}
            />
          )}

          <NotesList
            notes={filteredNotes}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
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
