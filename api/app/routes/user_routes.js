const { URL } = require('url');
const api = require('../../config/config');
const apiKey = api.apiKey;
const UserController = require('../controllers/UserController');
const userCtrl = new UserController();

module.exports = function(app, db) {
    app.post('/login', userCtrl.login);
    app.get('/createlogins', userCtrl.createLogins);
    app.get('/users', userCtrl.get);
    app.post('/users', userCtrl.create);
    app.put('/users/:id', userCtrl.update);
    app.delete('/users/:id', userCtrl.delete);
};