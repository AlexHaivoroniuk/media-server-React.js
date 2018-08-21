const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const PopulateDb    = require('./app/middleware/PopulateDbWithMovie');
const {url, port}   = require('./config/config');
const winston       = require('./config/winston');
const app           = express();
 
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
                        winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)    
                        console.error('Failed to open Mongodb Connection: ', err.message);
                        process.exit(1);
                    })
app.use('/movies', PopulateDb)
app.get('/aaa', function(req, res) {
    res.send(new Error("GOtch error"));
    res.end();
})
require('./app/routes')(app);
app.listen(port, () => {
    console.log(`Server Live on: ${port}`);
})
