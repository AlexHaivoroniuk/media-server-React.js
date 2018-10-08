const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
    Actors : String,
    //Awards : String,
    //BoxOffice : String,
    Country : String,
    //DVD : String,
    Director : String,
    Genre : String,
    InProduction : String,
    Language : String,
    NumberOf: {Episodes: String, Seasons: String},
    //Metascore : String,
    OriginalTitle: String,
    Plot : String,
    Poster : String,
    Production : String,
    //Rated : String,
    //Ratings: [{ Source: String, Value: String }] ,
    //Released: String,
    //Response: String,
    Runtime: String,
    Seasons: [{Number: String, Name: String, EpisodeCount: String, Year: String, Owerview: String, Poster: String}],
    Title: String,
    Type: String,
    Website: String,
    Writer: String,
    Year: {First: String, Last: String},
    imdbID: String,
    imdbRating: String,
    libraryId: String,
    filename: { type: mongoose.Schema.Types.ObjectId, ref: 'Files' }
});

const TV = mongoose.model('TV', tvSchema);

module.exports = TV;