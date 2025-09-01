
import React, { useEffect, useState } from "react";
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
import { DBNotesService, LocalNotesService } from "../utils/notesService";

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

  
   const [useDB, setUseDB] = useState(false);
   // choose data source at runtime
const service = useDB ? DBNotesService : LocalNotesService;

  useEffect(() => {
    refreshNotes();
  }, [useDB]);



const refreshNotes = async () => {
  try {
    const data = await service.getNotes(); // uses DB or Local based on useDB
    setNotes(data);
    setFilteredNotes(data);
  } catch (err) {
    console.error("Error loading notes:", err);
    showAlert("Failed to load notes", "error");
  }
};
  
// Accept only fields coming from the form
const handleAddNote = async (noteData: { title: string; content: string }) => {
  try {
    if (noteToEdit) {
      // UPDATE
      const updated = await service.editNote({ ...noteToEdit, ...noteData }); // must include _id
      setNotes(prev => prev.map(n => (n._id === updated._id ? updated : n)));
      setFilteredNotes(prev => prev.map(n => (n._id === updated._id ? updated : n)));
      showAlert("Note updated successfully!", "success");
      setNoteToEdit(undefined);
      setShowForm(false);
      return;
    }

    // CREATE
    const created = await service.addNote(noteData); // service will generate _id (Local) or DB will return it
    setNotes(prev => [...prev, created]);
    setFilteredNotes(prev => [...prev, created]);
    showAlert("Note added successfully!", "success");
    setShowForm(false);
  } catch (err) {
    console.error("Save failed:", err);
    showAlert(`Failed to ${noteToEdit ? "update" : "add"} note`, "error");
  }
};

  // const handleDelete = (note: Note) => {

  //   // delete from backend
  //   // deleteDBNote(note); // remove from backend

  //   deleteNote(note._id); // remove from localStorage

  //   refreshNotes(); // refresh notes from localStorage
  //   showAlert("Note deleted successfully!", "error");
  // };

  // Notes.tsx
const handleDelete = async (note: Note) => {
  try {
    await service.deleteNote(note); // DBNotesService or LocalNotesService

    // Optimistic UI update (no need to refetch)
    setNotes(prev => prev.filter(n => n._id !== note._id));
    setFilteredNotes(prev => prev.filter(n => n._id !== note._id));

    showAlert("Note deleted successfully!", "success");
  } catch (err) {
    console.error("Delete failed:", err);
    showAlert("Failed to delete note", "error");
  }
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
        <h1>Notes ({useDB ? "DB" : "LocalStorage"})</h1>
      <label>
        <input
          type="checkbox"
          checked={useDB}
          onChange={e => setUseDB(e.target.checked)}
        /> Use DB
      </label>
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
