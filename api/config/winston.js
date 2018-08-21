const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;
const path = require('path');
let appRoot = path.resolve(__dirname);
// console.log(appRoot.split('/').slice(0, appRoot.split('/').indexOf('config')).join('/'));
appRoot = appRoot.split('/').slice(0, appRoot.split('/').indexOf('config')).join('/');

const myFormat = printf(info => {
    return `${info.timestamp} ${info.label} ${info.level}: ${info.message}`;
  });
  

let options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        // colorize: false
    },
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            timestamp(),
            myFormat,
            colorize(),
        ),
    },
    sse: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorise: false
    }
};



let logger = createLogger({
    level: 'error',
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    format: combine(
        timestamp(),
        myFormat,
        colorize(),
    ),
    exitOnError: false
});

module.exports = logger;