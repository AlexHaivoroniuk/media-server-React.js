const Movie = require("../models/Movie");
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const fs = require("fs");
const axios = require("axios");
const api = require("../../config/config");
const apiKey = api.apiKey;

module.exports = function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  Movie.find()
    .then(movie => {
      let moviesCount = fs.readdirSync(testFolder).length;
      if (movie.length === 0 || movie.length < moviesCount) {
        const reqArr = fs.readdirSync(testFolder).map(file => {
          const fileArr = file.split("");
          const movieName = fileArr.slice(0, fileArr.indexOf("(")).join("");
          const movieReleaseYear = fileArr
            .slice(fileArr.indexOf("(") + 1, fileArr.indexOf(")"))
            .join("");

          function isSameName(movie) {
            return movie.Title === movieName;
          }
          function isSameYear(movie) {
            return movie.Year === movieReleaseYear;
          }
          if (!movie.some(isSameName) || !movie.some(isSameYear)) {
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
                return new Movie(res.data)
                  .save()
                  .then(data => data)
                  .catch(err => {
                    res.status(500).send({
                      message:
                        err.message ||
                        "Some error occurred while creating the Movie."
                    });
                  });
              });
          }
        });
        Promise.all(reqArr).then(data => {
          res.json(data);
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });

  next();
};

