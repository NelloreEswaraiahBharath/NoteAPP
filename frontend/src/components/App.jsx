import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await axios.get("http://localhost:4001/note");
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNote();
  }, []);

  async function addNote(newNote) {
    try {
      const res = await axios.post("http://localhost:4001/notes", newNote);
      setNotes((prevNotes) => {
        return [...prevNotes, res.data.data];
      });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:4001/notes/${id}`);
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note._id !== id);
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id} // Use the MongoDB _id as the key
            id={noteItem._id} // Pass the MongoDB _id to the delete function
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote} // Delete function uses the MongoDB _id
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
