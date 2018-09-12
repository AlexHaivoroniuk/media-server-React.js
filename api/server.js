const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const PopulateDb    = require('./app/middleware/PopulateDbWithMovie');
// const {ExpressSseMiddleware , ExpressSseTransport, getNotifHandler}    = require('./app/middleware/sse2');
const {ExpressSseTransport, SSE}    = require('./app/middleware/sse');
const {url, port}   = require('./config/config');
const app           = express();
const winston       = require('./config/winston');

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
                    })
app.use('/movies', PopulateDb);
app.get('/notif_stream', (req, res) => {
    streamSSE.subscribe(req, res);
    // console.log(streamSSE.getSubscriberCount());
})
require('./app/routes')(app);
app.listen(port, () => {
    console.log(`Server Live on: ${port}`);
});