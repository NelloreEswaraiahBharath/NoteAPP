import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from "cors";
import Note from "./modals/note.modal.js";
import bookRoute from "./route/book.route.js";
const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 4002;
app.use(express.json());

app.post("/notes", async (req, res) => {
  const note = req.body;
  if (!note.title || !note.content) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }
  const newNote = new Note(note);
  try {
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.error(`error in create product:`, error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});
app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.use("/Note", bookRoute);
app.listen(PORT, () => {
  connectDB();
  console.log("server is listening");
});
