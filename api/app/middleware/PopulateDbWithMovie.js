const Movie = require("../models/Movie");
const { URL } = require('url');
const logger = require('../../config/winston');
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const fs = require("fs");
const axios = require("axios");
const api = require("../../config/config");
const apiKey = api.apiKey;
const path = require('path');
const scriptName = path.basename(__filename);

module.exports = function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  Movie.find()
    .then(movie => {
      let moviesCount = fs.readdirSync(testFolder).length;
      if (movie.length === 0 || movie.length < moviesCount) {
        const reqArr = fs.readdirSync(testFolder).map(file => {
          const fileArr = file.split("");
          const movieName = fileArr.slice(0, fileArr.indexOf("(")).join("");
          const TitleToCheck = movieName.toLowerCase().replace(/\s/g,'');
          const movieReleaseYear = fileArr
            .slice(fileArr.indexOf("(") + 1, fileArr.indexOf(")"))
            .join("");

          const toAddMovie = movie.every(m => String(m.Title).toLowerCase().replace(/\s/g,'') !== TitleToCheck || (String(m.Type) === 'movie' && String(m.Year) !== movieReleaseYear));

          if (toAddMovie) {
            const newMovie = {
              name: movieName,
              year: movieReleaseYear
            };
            return axios
              .get(
                `http://www.omdbapi.com/?apikey=${apiKey}&t=${
                  newMovie.name
                }&y=${newMovie.year}`
              )
              .then(res => {
                logger.info({ message: 'INFO Movie fetch was successful', label: scriptName, line: __line})
                return new Movie(res.data) // add library id property
                  .save()
                  .then(data => { /*logger.info({ message:'Movie fetch was successful', label: scriptName});*/ return data})
                  .catch(err => {
                    logger.warn({ message:`WARN Movie save failed with error: ${err.message}`,label: scriptName, line: __line});
                    res.status(500).send({
                      message:
                        err.message ||
                        "Some error occurred while creating the Movie."
                    });
                  });
              }).catch(err => {
                logger.warn({ message: `WARN Movie fetch failed with error: ${err.message}`, label: scriptName, line: __line});
              })
              ;
          }
          else{
            return movies;
          }
        });
        Promise.all(reqArr).then(data => {
          res.json(data);
        });
      } else {
        logger.info({ message: 'INFO All up to date', label: scriptName,  line: __line})
        logger.front_info({ message: 'FRONT All movies are up to date ', type: 'info', label: scriptName,  line: __line});
      }
    })
    .catch(err => {
      logger.warn({ message: `WARN Movie retrieval from database failed with error: ${err.message}`, label: scriptName, line: __line})
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movies."
      });
    });

  next();
};

