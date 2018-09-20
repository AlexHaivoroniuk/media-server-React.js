const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const {ExpressSseTransport, SSE}    = require('./app/middleware/sse');
const {url, port}   = require('./config/config');
const app           = express();
const winston       = require('./config/winston');
const Movie = require("./app/models/Movie");
const { LibrariesCtrlSinglton } = require("./app/routes/library_routes");
const PopulateDb = require('./app/middleware/PopulateDbWithMovie');
const { URL } = require('url');
const testFolder = new URL('file:///home/ohaivoroniuk/Movies');
const api = require("./config/config");
const apiKey = api.apiKey;
const path = require('path');
const scriptName = path.basename(__filename);
const fs = require("fs");
const axios = require("axios");
 
let moviesBeforeChanges = fs.readdirSync(testFolder);

const { combine, timestamp, json } =  require('winston').format;

const formatTimestamp = {format: 'YYYY-MM-DD  HH:ss:mm'};

const streamSSE = new SSE();

winston.add(new ExpressSseTransport({
    level: 'front_info',
    handleExceptions: true,
    format: combine(
        timestamp(formatTimestamp),
        json()
    )
}, streamSSE));

require('./app/utils/AddNewGlobals');

mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
  });
mongoose.connect(url, { useNewUrlParser: true })
                    .then( () => { 
                        console.log('MongoDB Connected');
                    })
                    .catch((err) => { 
                        console.error('Failed to open Mongodb Connection: ', err.message);
                        process.exit(1);
                    });
app.get('/movies_populate', PopulateDb);
app.get('/notif_stream', (req, res) => {
    streamSSE.subscribe(req, res);
})
require('./app/routes')(app);
app.listen(port, () => {
    console.log(`Server Live on: ${port}`);

    LibrariesCtrlSinglton.setWatchersForAll();

    function AddMoviesOrSingleMovie(filename){
        console.log(')))))))))))))))AddMoviesOrSingleMovie');
        let movieTitle = filename.substring(0, filename.indexOf('('));
        let movieYear = filename.substring(filename.indexOf('('), filename.indexOf(')'));
        let toAddMovie = moviesBeforeChanges.every(m =>
            (
                m.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') 
                !== 
                filename.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','')
            )
        );
        console.log('AddMoviesOrSingleMovie MBC:', moviesBeforeChanges);
        console.log(filename);
        console.log("BOOOOOOOOL",toAddMovie);        
        if(toAddMovie){
            return axios
          .get(
            `http://www.omdbapi.com/?apikey=${apiKey}&t=${
              movieTitle
            }&y=${movieYear}`
          )
          .then(res => {
              if(res.data.Response === "True"){
            winston.info({ message: 'INFO Movie fetch was successful', label: scriptName, line: __line})
             return new Movie(res.data)
               .save();
              }
          }).catch(err => {
            winston.warn({ message: `WARN Movie fetch failed with error: ${err.message}`, label: scriptName, line: __line});
          })
          ;
          Promise.all(reqArr).then(data => {
            res.json(data);
          });
        }
    }

    function RemoveMoviesOrSingleMovie(filename){
        console.log('RemoveMoviesOrSingleMovie]]]]]]]]]]]]]]]]]]]]');
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
                winston.info({ message: `Movie ${movieToDelete[0].Title} was deleted`, label: scriptName, line: __line});
                });
               
          }).catch(err => {
            winston.warn({ message: `WARN Movie fetch failed with error: ${err.message}`, label: scriptName, line: __line});
          });
    }

    function UpdateDatabase(filename){
        moviesAfterChanges = fs.readdirSync(testFolder);
        MACTemporary = [];
        console.log("UpdateDatabase MAC:", moviesAfterChanges);
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
                moviesAfterChanges.forEach(movieAF => {
                    if(!moviesBeforeChanges.includes(movieAF)) {
                        AddMoviesOrSingleMovie(movieAF);
                    }
                });
            }
        }
        else{
            AddMoviesOrSingleMovie(filename);
        }
    }
    fs.watch(testFolder, function(eventType, filename){
        // let moviesAfterChanges = fs.readdirSync(testFolder);
        if(eventType === "rename"){
            UpdateDatabase(filename);
            console.log('fs.watch MAC:', moviesAfterChanges);
            moviesBeforeChanges = moviesAfterChanges;
        }
    });

});