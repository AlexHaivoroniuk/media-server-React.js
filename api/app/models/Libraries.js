const mongoose = require('mongoose');

const librariesSchema = new mongoose.Schema({
   name: String,
   path: String,
   userId: String
});

const Libraries = mongoose.model('Libraries', librariesSchema);

module.exports = Libraries;