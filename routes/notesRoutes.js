const express = require('express');
const router = express.Router();
const Notes = require('../modules/notes');

// home page
router.get("/", async (req, res) => {
  try {
    const url = 'https://first-express-project-93j2.onrender.com/'
    res.status(200).json({
      allNotes: `${url}note`,
      getNoteById: `${url}note/<id>`,
      updateNote: `${url}note/<id>`,
      deleteNote: `${url}note/<id>`,
    })
  } catch (err) {
    res.status(500).json({errore: err.message})
  }
});

// get one note by id
router.get("/note/:id", async (req, res) => {
  try {
    const notesData = await Notes.findById(req.params.id);
    res.status(200).json(notesData)
  } catch (err) {
    res.status(500).json({errore: err.message})
  }
});

// add new note
router.post("/note", async (req, res) => {
  try {
    const notesData = new Notes(req.body);
    await notesData.save();
    res.status(200).json({message: "Add a new note is successfully", notesData});
  } catch (err) {
    res.status(500).json({errore: err.message})
  }
});

// update note by id
router.put("/note/:id", async (req, res) => {
  try {
    const {id} = req.params
    const dataUpdated = req.body
    const NoteUpdated = await Notes.findByIdAndUpdate(id, dataUpdated, {new: true})
    res.status(200).json({message: "Updated note is successfully", NoteUpdated})
  } catch (err) {
    res.status(500).json({errore: err.message})
  }
});

// delete note by id
router.delete("/note/:id", async (req, res) => {
  try {
    const {id} = req.params
    await Notes.findByIdAndDelete(id)
    res.status(200).json({message: "Delete note is successfully"})
  } catch (err) {
    res.status(500).json({errore: err.message})
  }
});


module.exports = router