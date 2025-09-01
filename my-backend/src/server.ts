import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "../src/db.js";
import noteRoutes from "../src/noteRoutes.js";

const app = express();

app.use(cors());            // tighten origins later for prod
app.use(express.json());    // parse JSON bodies

app.get("/", (_req, res) => res.send("Notes API ✅"));
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGO_URI;
if (!URI) throw new Error("MONGO_URI missing in .env");

connectDB(URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`));
});
