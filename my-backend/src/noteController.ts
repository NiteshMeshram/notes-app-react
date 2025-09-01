import type { Request, Response } from "express";
import { Note } from "../src/notes.js";

export async function getNotes(_req: Request, res: Response) {

  try {
    const docs = await Note.find().sort({ dateCreated: -1 }).lean();

    const notes = docs.map(d => ({
      _id: d._id,  // <-- expose this for React
      title: d.title,
      content: d.content ?? d.Contentt ?? "", // unify field name
      // pinned: Boolean(d.pinned),
      dateCreated: d.dateCreated ?? d.dateCreated ?? d.updatedAt ?? null
      // updatedAt: d.updatedAt ?? null
    }));

    res.json(notes);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
}

export async function createNote(req: Request, res: Response) {
  const created = await Note.create(req.body);
  res.status(201).json(created);
}
// PUT /api/notes/:id
export async function updateNote(req: Request, res: Response) {
  try {
    const { id } = req.params; // <-- this is Mongo's _id
    const updated = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ message: "Note not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating note:", err);
    res.status(500).json({ message: "Failed to update note" });
  }
}

// DELETE /api/notes/:id
export async function deleteNote(req: Request, res: Response) {
  try {
    const { id } = req.params; // Mongo's _id
    const deleted = await Note.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.status(204).end(); // No content
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
}