const fs = require('fs');
const Movie = require('./../models/Movie');
const TV = require('./../models/TV');
const Files = require('./../models/Files');
const mongoose = require('mongoose');
const MovieFetcher = require('./MovieFetcher');
const logger       = require('./../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);

module.exports = function (folder, libraryId) {

    let moviesBeforeChanges = fs.readdirSync(folder);
    
    function AddMoviesOrSingleMovie(filename){
        let movieTitle = filename.substring(0, filename.indexOf('('));
        let movieYear = filename.substring(filename.indexOf('(') + 1, filename.indexOf(')'));
        return Files.findOne({filename: filename})
        .then(res => {
            if (res === null) {
                MovieFetcher.get({
                    title: movieTitle,
                    year: movieYear
                })
                .then(res => {
                    let files = new Files({
                        _id: new mongoose.Types.ObjectId(),
                        filename: filename
                    });
                    files.save();

                    res.libraryId = libraryId || -1;
                    res.filename = files._id;
                    res.save();
                })
                .catch((res) => {
                    logger.warn({ message: `WARN Movie "${movieTitle}" not found`, label: scriptName, line: __line});
                });
            }
        })
        .catch(e => console.log(e));
    }

    function RemoveMoviesOrSingleMovie(filename){
        return Files.findOneAndRemove({filename: filename})
        .then(file => {
            Movie.findOneAndRemove({filename: file._id})
            .then( data=> {
                if (data) {
                    logger.info({ message: `Movie ${data.Title} was deleted`, label: scriptName, line: __line});
                }
            })
            .catch(e => console.log(e));

            return file;
        })
        .then(file => {
            TV.findOneAndRemove({filename: file._id})
            .then( data=> {
                if (data) {
                    logger.info({ message: `TV ${data.Title} was deleted`, label: scriptName, line: __line});
                }
            })
            .catch(e => console.log(e));

            return file;
        })
        .catch(e => {
            logger.warn({ message: `WARN Movie "${filename}" doesn't exist in DB`, label: scriptName, line: __line});
        });
    }

    function UpdateDatabase(filename){
        moviesAfterChanges = fs.readdirSync(folder);
        MACTemporary = [];

        moviesAfterChanges.forEach(element => {
            MACTemporary.push(element.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.',''));
        });
        
        if(!!!moviesAfterChanges.includes(filename)){
        
            if(moviesAfterChanges.length !== moviesBeforeChanges.length)
                RemoveMoviesOrSingleMovie(filename);
            else {
                
                if(!MACTemporary.includes(filename.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.',''))){
                    RemoveMoviesOrSingleMovie(filename);
                }
            }
        }
        else {
            AddMoviesOrSingleMovie(filename);
        }
    }
    let folderWatcher = fs.watch(folder, function(eventType, filename){
       
        let moviesAfterChanges = fs.readdirSync(folder);

        if(eventType === "rename"){
            UpdateDatabase(filename);
            moviesBeforeChanges = moviesAfterChanges;
        }
    });
    return folderWatcher;
}