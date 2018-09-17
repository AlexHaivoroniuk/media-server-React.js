const Movie = require("../models/Movie");
const Libraries = require("../models/Libraries");
const { URL } = require('url');
const logger = require('../../config/winston');
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const fs = require("fs");
const axios = require("axios");
const api = require("../../config/config");
const apiKey = api.apiKey;
const path = require('path');
const _ = require('lodash');
const scriptName = path.basename(__filename);

module.exports = function(req, res, next) {
  Libraries.find()
  .then(libs => {
      if (libs !== null) {
        libs.forEach(library => {
          let testFolder = library.path;
          Movie.find()
            .then(movie => {
                const reqArr = fs.readdirSync(testFolder).map(file => {
                  const fileArr = file.split("");
                  const movieName = fileArr.slice(0, fileArr.indexOf("(")).join("");
                  const TitleToCheck = movieName.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','');
                  const movieReleaseYear = fileArr
                    .slice(fileArr.indexOf("(") + 1, fileArr.indexOf(")"))
                    .join("");

                  const toAddMovie = movie.every(m => String(m.Title).toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') !== TitleToCheck || (String(m.Type) === 'movie' && String(m.Year) !== movieReleaseYear));

                  if (toAddMovie) {
                    const newMovie = {
                      name: movieName,
                      year: movieReleaseYear
                    };
                    return axios
                      .get(
                        `http://www.omdbapi.com/?apikey=${apiKey}&t=${newMovie.name}&y=${newMovie.year}`
                      )
                      .then(res => {
                        logger.info({ message: 'INFO Movie fetch was successful', label: scriptName, line: __line})
                        return new Movie({...res.data, libraryId: library._id})
                          .save()
                          .then(data => data)
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
                });
                Promise.all(reqArr).then(data => {
                  res.json(data);
                });
            })
            .catch(err => {
              logger.warn({ message: `WARN Movie retrieval from database failed with error: ${err.message}`, label: scriptName, line: __line})
              res.status(500).send({
                message: err.message || "Some error occurred while retrieving movies."
              });
            });
          })
      }
  })
  .catch(err => new Error(err))
};
