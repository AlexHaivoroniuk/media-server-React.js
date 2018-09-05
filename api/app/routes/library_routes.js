
const LibrariesController   = require('../controllers/LibrariesController');
const librariesCtrl = new LibrariesController();

module.exports = function(app, db) {
    app.get('/libraries', librariesCtrl.findAll);
    app.get('/libraries/:id', librariesCtrl.findOne);
    app.post('/libraries', librariesCtrl.create);
    app.put('/libraries/:id', librariesCtrl.update);
    app.delete('/libraries/:id', librariesCtrl.delete);
};