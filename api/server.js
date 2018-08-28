const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const PopulateDb    = require('./app/middleware/PopulateDbWithMovie');
const sseMW    = require('./app/middleware/sse');
const {url, port}   = require('./config/config');
const app           = express();

const eventBus = require('./app/utils/EventBus');
require('./app/utils/AddNewGlobals');
 
const sseClients = new sseMW.Clients();

mongoose.Promise = Promise;
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(sseMW.sseMiddleware);
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
app.use('/movies', PopulateDb)
app.get('/notif_stream', function(req, res) {
    sseClients.add(res.sseConnection);
    res.sseConnection.setup();
    eventBus.on('message', function(data) {
        res.sseConnection.send(data); 
    });
});
require('./app/routes')(app);
const server = app.listen(port, () => {
    console.log(`Server Live on: ${port}`);
});