const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    filename : String
});

const Files = mongoose.model('File', filesSchema);

module.exports = Files;
