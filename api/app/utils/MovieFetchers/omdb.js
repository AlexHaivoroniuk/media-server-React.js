const axios = require('axios');
const api = require("./../../../config/config");
const Movie = require("./../../models/Movie");
const logger = require('./../../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);

module.exports = function(options) {
    console.log('omdb.get');
    return axios
        .get(
            `http://www.omdbapi.com/?apikey=${api.apiKey}&t=${
            options.title
            }&y=${options.year}`
        )
        .then(res => {
            if(res.data.Response === "True"){
                logger.info({ message: `INFO Movie "${options.title}" fetch was successful`, label: scriptName, line: __line})
                
                return new Movie({...res.data, libraryId: options.libraryId});
            } else {
                return Promise.reject();
            }
        });
};
