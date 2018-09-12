const winston = require('winston');
const Transport = require('winston-transport');
const PassThrough = require('stream').PassThrough;
const fs = require('fs');

let ws = fs.createWriteStream('/home/ohaivoroniuk/SSE_stream_to_file');

const sse = (data) => {
    let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return `id: ${id}\n` + `data: ${JSON.stringify(data)}\n\n` + `retry: 10000\n`;
};


let connectionStreams = []; 

middleware = (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const stream = new PassThrough();
    stream.on('close', () => {
        stream.closed = true;
    });
    stream.on('end', () => {
        console.log('\\\\\\the stream has finished///////////////')
    })
    const data = { 
        message:"FRONT Got All Movies",
        type : "warn",label:"Triggered",
        line:12,
        level:"front_info",
        timestamp:"2018-09-11  11:29:25"
    }
    // stream.write(sse(data))
    connectionStreams.push(stream)
    // console.log(" res has now connection  res: "+ connectionStreams );
    next();
};

const notif = [];

const send = (data) => {
    const sseEvent = sse(data);
    const healthyStreams = [];
    const nbStreams = connectionStreams.length;
    let writeDone = 0; 
    connectionStreams.forEach((stream, idx) => {
        if (stream.closed) {
            stream.removeAllListeners();
            writeDone++;
            return;
        }
        
        stream.write(sseEvent, (error) => {
            notif.push(sseEvent)
            // console.log(sseEvent)
            writeDone++;
            if (!error) {
                healthyStreams.push(stream);
            }
            if (writeDone === nbStreams) {
                connectionStreams = healthyStreams;
            }
        });
        stream.pipe( `process ${idx}`, process.stdout);
    });
}

const getNotifHandler = (req, res) => {
    console.log('getNotifHandler', notif)
    // notif.forEach(item => {
    //     res.write(item);
    // })
}

class SSETransport extends Transport {
    constructor(opts) {
        super(opts);
    }

    log(info, callback) {
        send(info);
        callback();
    }
}

winston.transports.ExpressSseTransport = SSETransport;

module.exports.ExpressSseTransport = SSETransport;

module.exports.ExpressSseMiddleware = middleware;
module.exports.getNotifHandler = getNotifHandler;