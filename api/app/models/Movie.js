const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    Actors : String,
    Awards : String,
    BoxOffice : String,
    Country : String,
    DVD : String,
    Director : String,
    Genre : String,
    Language : String,
    Metascore : String,
    Plot : String,
    Poster : String,
    Production : String,
    Rated : String,
    Ratings: [{ Source: String, Value: String }] ,
    Released: String,
    Response: String,
    Runtime: String,
    Title: String,
    Type: String,
    Website: String,
    Writer: String,
    Year: String,
    imdbID: String,
    imdbRating: String,
    libraryId: String,
    filename: { type: mongoose.Schema.Types.ObjectId, ref: 'Files' }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;