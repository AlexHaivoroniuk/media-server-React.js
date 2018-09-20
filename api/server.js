const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const {ExpressSseTransport, SSE}    = require('./app/middleware/sse');
const {url, port}   = require('./config/config');
const app           = express();
const winston       = require('./config/winston');
const Movie = require("./app/models/Movie");
const MovieFetcher = require('./app/utils/MovieFetcher');
const { LibrariesCtrlSinglton } = require("./app/routes/library_routes");
const PopulateDb = require('./app/middleware/PopulateDbWithMovie');
const { URL } = require('url');
const testFolder = '/home/dimka/Movies';
const path = require('path');
const scriptName = path.basename(__filename);
const fs = require("fs");
 
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
        let movieTitle = filename.substring(0, filename.indexOf('('));
        let movieYear = filename.substring(filename.indexOf('('), filename.indexOf(')'));
        Movie.find().then( res => {
            moviesInDB = res;
            let toAddMovie = moviesInDB.every(m =>
                (
                    m.Title.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','') 
                    !== 
                    movieTitle.toLowerCase().replace(/\s/g,'').replace(':','').replace('?','').replace('.','')
                )
            );
            if(toAddMovie){
                MovieFetcher.get({
                    title: movieTitle,
                    year: movieYear
                })
                .then(res => {
                    res.save();
                })
                .catch((res) => {
                    logger.warn({ message: `WARN Movie "${movieTitle}" not found`, label: scriptName, line: __line});
                });
            }
        });
        
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
            return  Movie.findByIdAndRemove(movieToDelete[0]._id).then( data=> {
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
