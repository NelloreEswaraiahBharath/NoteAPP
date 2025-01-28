import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (note.title.trim() === "" || note.content.trim() === "") {
      setErrorMessage("Please provide both title and content.");
      return;
    }
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
    });
    setErrorMessage(""); // Clear the error message if submission is successful
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            style={{
              borderColor: note.title.trim() === "" ? "red" : "initial",
            }} // Error border color for title
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          style={{
            borderColor: note.content.trim() === "" ? "red" : "initial",
          }} // Error border color for content
        />

        <Zoom in={isExpanded}>
          <Fab
            onClick={submitNote}
            disabled={note.title.trim() === "" || note.content.trim() === ""}
          >
            <AddIcon />
          </Fab>
        </Zoom>

        {errorMessage && (
          <div style={{ color: "red", marginTop: "10px" }}>
            <span role="img" aria-label="error">
              ⚠️
            </span>{" "}
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
