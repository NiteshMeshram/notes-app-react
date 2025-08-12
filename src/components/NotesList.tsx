import React from "react";
import type { Note } from "../model/Note";

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  onEdit: (note: Note) => void;
}

export default function NotesList({ notes, onDelete, onEdit }: NotesListProps) {
  if (!notes || notes.length === 0) {
    return (
      <article key="no-notes" className="no-notes-message">
        <p>No notes available.</p>
      </article>
    );
  }

  const sortedNotes = [...notes].sort((a, b) => {
    return (
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
  });

  return (
    <>
      <div>
        <h2>Notes List ({notes.length})</h2>

        <div>
          {notes.map((note) => (
            <article key={note.id} className="note">
              {/* First Row */}
              <header className="note__header">
                <h3 className="note__title">{note.title}</h3>
                <div className="note__meta">
                  {/* <span className="note__date">
                    Date:{" "}
                    {new Date(note.dateCreated).toLocaleDateString("en-GB")}
                  </span> */}
                  <div className="note__actions">
                    <button
                      className="note__action"
                      onClick={() => onEdit(note)}
                    >
                      Edit
                    </button>
                    <span>|</span>
                    <button
                      className="note__action note__action--delete"
                      onClick={() => onDelete(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </header>

              {/* Second Row */}
              <p className="note__body">{note.content}</p>
              <span className="note__date">
                {new Date(note.dateCreated).toLocaleDateString("en-GB")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
