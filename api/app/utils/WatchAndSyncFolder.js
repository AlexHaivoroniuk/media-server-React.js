const fs = require('fs');
const axios = require('axios');
const api = require("./../../config/config");
const Movie = require("./../models/Movie");
const logger       = require('./../../config/winston');
const path = require('path');
const scriptName = path.basename(__filename);
const apiKey = api.apiKey;

module.exports = function (folder, id) {

  

    let moviesBeforeChanges = fs.readdirSync(folder);

    function AddMoviesOrSingleMovie(filename){
        console.log('AddMoviesOrSingleMovie');
        let movieTitle = filename.substring(0, filename.indexOf('('));
        let movieYear = filename.substring(filename.indexOf('('), filename.indexOf(')'));
        return axios
            .get(
                `http://localhost:4000/movies/`
            )
            .then(res => {
                
                let moviesInDB = res.data;
                let toAddMovie = moviesInDB.every(m =>
                    (
                        m.Title.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') 
                        !== 
                        movieTitle.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','')
                    )
                );

                if(toAddMovie) {
                    return axios
                        .get(
                            `http://www.omdbapi.com/?apikey=${apiKey}&t=${
                            movieTitle
                            }&y=${movieYear}`
                        )
                        .then(res => {
                            if(res.data.Response === "True"){
                                logger.info({ message: 'INFO Movie fetch was successful', label: scriptName, line: __line})
                               
                                return new Movie({...res.data, libraryId: id}).save();
                            }
                        }).catch(err => {
                            logger.warn({ message: `WARN Movie fetch failed with error: ${err.message}`, label: scriptName, line: __line});
                        })
                    Promise.all(reqArr).then(data => {
                        res.json(data);
                    });
                }

            })

     
    }

    function RemoveMoviesOrSingleMovie(filename){
        console.log('RemoveMoviesOrSingleMovie');
        let movieTitle = filename.substring(0, filename.indexOf('('));
        return axios
            .get(
                `http://localhost:4000/movies/`
            )
            .then(res => {
                    let movieToDelete = res.data.filter(m => { 
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
            return axios
            .delete(
            `http://localhost:4000/movies/${movieToDelete[0]._id}`
            ).then( data=> {
                logger.info({ message: `Movie ${movieToDelete[0].Title} was deleted`, label: scriptName, line: __line});
                });
            
        }).catch(err => {
            logger.warn({ message: `WARN Movie fetch failed with error: ${err.message}`, label: scriptName, line: __line});
        });
    }

    function UpdateDatabase(filename){
        console.log('UpdateDatabase');
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