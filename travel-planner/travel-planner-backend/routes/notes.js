const express = require("express")
const router = express.Router()
const bodyParser = require('body-parser')
const notesModel = require("./../models/notes")

router.use(bodyParser.json())

router.get('/:noteTitle', (req, res) => {
    const noteTitle = req.params.noteTitle
    console.log(notesModel.openNote(noteTitle))

    res.status(200).send(notesModel.openNote(noteTitle))
})

router.post('/save', (req, res) => {
    const newNote = req.body.note

    res.status(200).send(notesModel.saveNewNote(newNote.title, newNote.text))
})

router.post('/update', (req, res) => {
    const note = req.body.note

    res.status(200).send(notesModel.updateNote(note.title, note.text))
})

module.exports = router
