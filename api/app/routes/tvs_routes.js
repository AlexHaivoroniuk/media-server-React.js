const TVController   = require('../controllers/TVsController');
const tvCtrl = new TVController();

module.exports = function(app, db) {
    //app.get('/tvs', tvCtrl.findAll);
    app.get('/tvs/:id', tvCtrl.findOne);
    //app.put('/tvs/:id', tvCtrl.update);
    //app.delete('/tvs/:id', tvCtrl.delete);
};