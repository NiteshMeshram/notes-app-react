import React, { useEffect, useState } from "react";
import "../assets/notes.css";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import Alert from "./Alert";

import type { Note } from "../model/Note";
import { LocalNotesService, DBNotesService } from "../utils/notesService";
import { addNote, editNote, getNotes } from "../utils/localStorageUtils";

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
  const [useDB, setUseDB] = useState(false); // 🔀 LocalStorage ↔ DB
  // const service = useDB ? DBNotesService : LocalNotesService;

  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [noteToEdit, setNoteToEdit] = useState<Note | undefined>(undefined);
  const [alert, setAlert] = useState<{ message: string; type: AlertType | "" }>({
    message: "",
    type: "",
  });

  // Load notes whenever the data source changes
  useEffect(() => {
    refreshNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDB]);

  async function refreshNotes() {
    try {
      // const data = await service.getNotes();
      const data = getNotes();
      setNotes(data);
      setFilteredNotes(data);
    } catch (err) {
      console.error("Error loading notes:", err);
      showAlert("Failed to load notes", "error");
    }
  }

    const handleAddNote = (noteData: Omit<Note, "id">) => {
    if (noteToEdit) {
      const updatedNote: Note = { ...noteToEdit, ...noteData }; // keep old id
      editNote(updatedNote);
      setNoteToEdit(undefined);
    } else {
      // const newNote: Note = { _id: crypto.randomUUID(), ...noteData };
      const { _id, ...noteDataWithoutId } = noteData as any;
      const newNote: Note = { _id: crypto.randomUUID(), ...noteDataWithoutId }; // id will be added in addNote
      addNote(newNote);
    }
    refreshNotes(); // refresh notes from localStorage
    setShowForm(false);
    showAlert(
      `Note ${noteToEdit ? "updated" : "added"} successfully!`,
      "success"
    );
  };

  



  async function handleDelete(note: Note) {
    try {
      await service.deleteNote(note);
      setNotes(prev => prev.filter(n => n._id !== note._id));
      setFilteredNotes(prev => prev.filter(n => n._id !== note._id));
      showAlert("Note deleted successfully!", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      showAlert("Failed to delete note", "error");
    }
  }

  function handleEditClick(note: Note) {
    setNoteToEdit(note);
    setShowForm(true);
  }

  function handleSearch(term: string) {
    if (!term.trim()) {
      setFilteredNotes(notes);
      return;
    }
    const q = term.toLowerCase();
    setFilteredNotes(
      notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
    );
  }

  function showAlert(message: string, type: AlertType) {
    setAlert({ message, type });
  }

  return (
    <div>
      <Alert
        message={alert.message}
        type={alert.type as AlertType}
        onClose={() => setAlert({ message: "", type: "" })}
      />

      <p>Notes Component</p>
      <h1>Notes ({useDB ? "DB" : "LocalStorage"})</h1>
      <label>
        <input
          type="checkbox"
          checked={useDB}
          onChange={e => setUseDB(e.target.checked)}
        />
        Use DB
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
                setNoteToEdit(undefined);
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
          <ul>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
