const { URL }           = require('url');
const testFolder        = new URL('file:///home/ohaivoroniuk/Movies');
const fs                = require('fs');
const axios             = require('axios');
const api               = require('../../config/config');
const apiKey            = api.apiKey;
const MovieController   = require('../controllers/MoviesController');
const movieCtrl = new MovieController();

module.exports = function(app, db) {
    app.get('/movies', movieCtrl.findAll);
    app.get('/movies/:id', movieCtrl.findOne);
    app.put('/movies/:id', movieCtrl.update);
    app.delete('/movies/:id', movieCtrl.delete);
};