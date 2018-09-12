const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const {ExpressSseTransport, SSE}    = require('./app/middleware/sse');
const {url, port}   = require('./config/config');
const app           = express();
const winston       = require('./config/winston');
const Movie = require("./app/models/Movie");
const testFolder = '/home/ohaivoroniuk/Movies';
const api = require("./config/config");
const apiKey = api.apiKey;
const path = require('path');
const _ = require('lodash');
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
    // json: true,
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
const db = mongoose.connect(url, { useNewUrlParser: true })
                    .then( () => { 
                        console.log('MongoDB Connected');
                    })
                    .catch((err) => { 
                        console.error('Failed to open Mongodb Connection: ', err.message);
                        process.exit(1);
                    });
app.get('/notif_stream', (req, res) => {
    streamSSE.subscribe(req, res);
    // console.log(streamSSE.getSubscriberCount());
})
require('./app/routes')(app);
app.listen(port, () => {
    console.log(`Server Live on: ${port}`);



    function AddMoviesOrSingleMovie(filename){
        let movieTitle = filename.substring(0, filename.indexOf('('));
        let movieYear = filename.substring(filename.indexOf('('), filename.indexOf(')'));
        let toAddMovie = moviesBeforeChanges.every(m => m.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') !== filename.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.',''));
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
        let movieTitle = filename.substring(0, filename.indexOf('('));

        return axios
          .get(
            `http://localhost:4000/movies/`
          )
          .then(res => {
            let movieToDelete = res.data.filter(m => m.Title.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') === movieTitle.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.',''));
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
                //console.log(filename);
                //console.log("MBC: " + moviesBeforeChanges);
                //console.log("MAC: " + moviesAfterChanges);
                //console.log("MATC: " + MACTemporary);
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
        let moviesAfterChanges = fs.readdirSync(testFolder);
        if(eventType === "rename"){
            UpdateDatabase(filename);
        moviesBeforeChanges = moviesAfterChanges;
        }
        
    });

});