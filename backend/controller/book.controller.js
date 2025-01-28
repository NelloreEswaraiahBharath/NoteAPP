import Note from "../modals/note.modal.js";

export const getNote = async (req, res) => {
  try {
    const note = await Note.find();
    res.status(200).json(note);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
