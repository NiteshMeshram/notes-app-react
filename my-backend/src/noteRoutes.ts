import { Router } from "express";
import { createNote, deleteNote, getNotes, updateNote } from "./noteController.js";

const router = Router();

router.get("/", getNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;