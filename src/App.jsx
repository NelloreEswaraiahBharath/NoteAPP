// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Heading from "./Components/Heading";
import AddNotes from "./Components/AddNotes";
import DeleteNotes from "./Components/DeleteNotes";
import EditNotes from "./Components/EditNotes";

const App = () => {
  return (
    // <Router>
    <Routes>
      <Route path="/" element={<Heading />} />
      <Route path="/notes/create" element={<AddNotes />} />
      <Route path="/notes/delete/:id" element={<DeleteNotes />} />
      <Route path="/notes/edit/:id" element={<EditNotes />} />
    </Routes>
    // </Router>
  );
};

export default App;
