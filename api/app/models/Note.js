const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    text : String,
    title: String
}, {
    timestapmts: true
});

const Note = mongoose.model('Note', notesSchema);

module.exports = Note;