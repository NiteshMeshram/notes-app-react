/*import { Schema, model, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  dateCreated: string;
  id: string;
}

const NoteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateCreated: { type: String, required: true },
    id: { type: String, required: true },
   
  },
  { timestamps: true },
  {
    collection: "notes_collection" // <-- bind to your real collection
  }
);

export const Note = model<INote>("Note", NoteSchema);
*/


import { Schema, model } from "mongoose";

// Matches your existing docs and collection name
const noteSchema = new Schema(
  {
    title: { type: String, required: true },

    // You have "Contentt" in DB; keep both to be safe:
    content: { type: String },            // optional new key if you start using it later
    Contentt: { type: String },           // existing key in your data

    // pinned: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now }, // you already store this
    id: { type: String }                              // your UUID string
  },
  {
    collection: "notes_collection", // <-- bind to your real collection
        timestamps: true // <-- adds createdAt & updatedAt automatically

  }
);

export const Note = model("Note", noteSchema);

