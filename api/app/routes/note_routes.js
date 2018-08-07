const notesCtrl = require('../controllers/NotesController'); 

module.exports = function(app, db) {
    app.post('/notes', notesCtrl.create);
    app.get('/notes', notesCtrl.findAll);
    app.get('/notes/:id', notesCtrl.findOne);
    app.put('/notes/:id', notesCtrl.update);
    app.delete('/notes/:id', notesCtrl.delete);
};