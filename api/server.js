const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const {ExpressSseTransport, SSE}    = require('./app/middleware/sse');
const {url, port}   = require('./config/config');
const app           = express();
const winston       = require('./config/winston');
const watcherSync = require('./app/utils/WatchAndSyncFolder');
const { LibrariesCtrlSinglton } = require("./app/routes/library_routes");
const PopulateDb = require('./app/middleware/PopulateDbWithMovie');
const testFolder = '/home/ohaivoroniuk/Movies';

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

    watcherSync(testFolder, -1);
});
