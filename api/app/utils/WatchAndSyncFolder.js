const fs = require('fs');
const Movie = require('./../models/Movie');
const MovieFetcher = require('./MovieFetcher');
const logger       = require('./../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);

module.exports = function (folder, id) {

    let moviesBeforeChanges = fs.readdirSync(folder);
    
    function AddMoviesOrSingleMovie(filename){
        let movieTitle = filename.substring(0, filename.indexOf('('));
        let movieYear = filename.substring(filename.indexOf('(') + 1, filename.indexOf(')'));
        Movie.find()
        .then(res => {
            
            let moviesInDB = res;
            let toAddMovie = moviesInDB.every(m =>
                (
                    m.Title.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') 
                    !== 
                    movieTitle.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','')
                )
            );

            if(toAddMovie) {
                MovieFetcher.get({
                    title: movieTitle,
                    year: movieYear,
                    libraryId: id
                })
                .then(res => {
                    res.save();
                })
                .catch((res) => {
                    logger.warn({ message: `WARN Movie "${movieTitle}" not found`, label: scriptName, line: __line});
                });
            }
        })
    }

    function RemoveMoviesOrSingleMovie(filename){
        let movieTitle = filename.substring(0, filename.indexOf('('));
        return Movie.find()
            .then(res => {
                    let movieToDelete = res.filter(m => { 
                        if (m.Title !== undefined) {
                            return (
                                m.Title.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') 
                                === 
                                movieTitle.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','')
                            )
                        } else {
                            return false;
                        }

                    } 
        )
            return Movie.findByIdAndRemove(movieToDelete[0]._id).then( data=> {
                logger.info({ message: `Movie ${movieToDelete[0].Title} was deleted`, label: scriptName, line: __line});
                });
            
        }).catch(err => {
            logger.warn({ message: `WARN Movie fetch failed with error: ${err.message}`, label: scriptName, line: __line});
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
            else{
                
                if(!MACTemporary.includes(filename.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.',''))){
                    RemoveMoviesOrSingleMovie(filename);
                }
            }
        }
        else{
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