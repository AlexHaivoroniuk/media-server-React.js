const axios = require('axios');
const url = require('url');
const config = require("./../../../config/config");
const Movie = require("./../../models/Movie");
const logger = require('./../../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);

module.exports = function(options) {
    const endpoint = '';
    const query = {
        t: options.title.trim(),
        y: options.year,
        apikey: config.omdb.apiKey
    };

    const omdbURL = url.format({
        protocol: 'http',
        hostname: 'www.omdbapi.com',
        pathname: endpoint,
        query: query
    });
    console.log('omdb.get', omdbURL);
    return axios
        .get(omdbURL)
        .then(res => {
            if(res.data.Response === "True"){
                logger.info({ message: `INFO Movie "${options.title}" fetch was successful`, label: scriptName, line: __line})
                //console.log(res.data);

                const data = {
                    'Title': res.data.Title,
                    'Year': res.data.Year,
                    'Rated': res.data.Rated,
                    'Released': res.data.Released,
                    'Genre': res.data.Genre,
                    'Director': res.data.Director,
                    'Writer': res.data.Writer,
                    'Actors': res.data.Actors,
                    'Plot': res.data.Plot,
                    'Language': res.data.Language,
                    'Country': res.data.Country,
                    'Awards': res.data.Awards,
                    'Poster': res.data.Poster,
                    'imdbRating': res.data.imdbRating,
                    'Type': (res.data.Type === 'series') ? 'tv' : 'movie',
                    'Production': res.data.Production
                };
                
                //return new Movie({...res.data, libraryId: options.libraryId});
                return new Movie({...data, libraryId: options.libraryId});
            } else {
                return Promise.reject();
            }
        });
};
