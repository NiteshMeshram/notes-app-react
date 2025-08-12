import React from "react";
import type { Note } from "../model/Note";

export default function NotesList({ notes }: { notes: Note[] }) {
  if (!notes || notes.length === 0) {
    return (
      <article key="no-notes" className="no-notes-message">
        <p>No notes available.</p>
      </article>
    );
  }
  console.log("Rendering NotesList with notes:", notes);
  return (
    <>
      <div>
        <h2>Notes List</h2>
        <div>
          {notes.map((note) => (
            <article key={note.id} className="note">
              {/* First Row */}
              <header className="note__header">
                <h3 className="note__title">{note.title}</h3>
                <div className="note__meta">
                  <span className="note__date">
                    Date:{" "}
                    {new Date(note.dateCreated).toLocaleDateString("en-GB")}
                  </span>
                  <div className="note__actions">
                    <button
                      className="note__action"
                      onClick={() => console.log(`Edit note ID: ${note.id}`)}
                    >
                      Edit
                    </button>
                    <span>|</span>
                    <button
                      className="note__action note__action--delete"
                      onClick={() => console.log(`Delete note ID: ${note.id}`)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </header>

              {/* Second Row */}
              <p className="note__body">{note.content}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
