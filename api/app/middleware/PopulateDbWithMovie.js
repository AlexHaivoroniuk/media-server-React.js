const Movie = require('../models/Movie');
const { URL }    = require('url');
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const fs         = require('fs');
const axios      = require('axios');
const api        = require('../../config/config');
const apiKey     = api.apiKey;

module.exports = function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8080')
    Movie.find()
    .then(movie => {
        if (movie.length === 0) {
            const reqArr = fs.readdirSync(testFolder).map((file) => {
                const fileArr          = file.split('');
                const movieName        = fileArr.slice(0, fileArr.indexOf('(')).join('');
                const movieReleaseYear = fileArr.slice(fileArr.indexOf('(') + 1, fileArr.indexOf(')')).join('');
                const movie            = {
                    name : movieName,
                    year : movieReleaseYear
                }
                return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.name}&y=${movie.year}`)
                            .then(res => {
                                    return new Movie(res.data)
                                                .save()
                                                .then(data => data)
                                                .catch(err => {
                                                    res.status(500).send({
                                                        message: err.message || "Some error occurred while creating the Movie."
                                                    });
                                                })
                                
                            });
            });
            Promise.all(reqArr)
                .then(data => {res.json(data)});
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

    next();
}