const axios = require('axios');
const url = require('url');
const config = require("./../../../config/config");
const Movie = require("./../../models/Movie");
const TV = require("./../../models/TV");
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
                console.log(res.data);
                if (res.data.Type === 'series') {
                    const year = {
                        'First':  res.data.Year.split('–')[0],
                        'Last':  res.data.Year.split('–')[1],
                    };
                    const dataTV = {
                        'Title': res.data.Title,  // Name ?
                        'OriginalTitle': res.data.Title,
                        'Year': year,
                        'Genre': res.data.Genre,
                        'Director': res.data.Director,
                        'Writer': res.data.Writer,
                        'Actors': res.data.Actors,
                        'Plot': res.data.Plot,
                        'Language': res.data.Language,
                        'Country': res.data.Country,
                        'Poster': res.data.Poster,
                        'Production': res.data.Production,
                        'InProduction': year.Last ? true : false,
                        'NumberOf':{
                            'Seasons': res.data.totalSeasons,
                            'Episodes': null,
                        },
                        'Runtime': res.data.Runtime,
                        'Seasons': [],
                        'Status': year.Last ? 'Ended' : 'Returning Series',
                        'Type': 'tv',
                        'Website': null
                    };
                    console.log(dataTV);
                    logger.info({ message: `INFO TV Series "${options.title}" fetch was successful`, label: scriptName, line: __line});

                    return new TV(dataTV);
                } else {
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
                        'Type': 'movie',
                        'Production': res.data.Production
                    };
                    logger.info({ message: `INFO Movie "${options.title}" fetch was successful`, label: scriptName, line: __line});

                    return new Movie(data);
                }

                //return new Movie({...res.data, libraryId: options.libraryId});
                //return new Movie(data);
            } else {
                return Promise.reject();
            }
        });
};
