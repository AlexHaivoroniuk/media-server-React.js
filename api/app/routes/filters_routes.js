const { URL }           = require('url');
//const fs                = require('fs');
//const axios             = require('axios');
const api               = require('../../config/config');
const apiKey            = api.apiKey;
const FiltersController   = require('../controllers/FiltersController');
const filtersCtrl = new FiltersController();

module.exports = function(app, db) {
    app.get('/filters', filtersCtrl.findAll);
};