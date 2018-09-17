const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, colorize, printf, json } = format;
const path = require('path');

let appRoot = path.resolve(__dirname);
appRoot = appRoot.split('/').slice(0, appRoot.split('/').indexOf('config')).join('/');

const myFormat = printf(info => {
    return `${info.timestamp} | <${info.label}:${info.line}>  [${info.level}]: ${info.message}`;
    });

const customLevels = {
    levels: { 
        front_info: 0,
        error: 1, 
        warn: 2, 
        info: 3, 
        verbose: 4, 
        debug: 5, 
    },
    colors: { 
        front_info: "magenta",
        error: "red", 
        warn: "yellow", 
        info: "green", 
        verbose: "blue", 
        debug: "cyan"
        },
    };

const formatTimestamp = {format: 'YYYY-MM-DD  HH:ss:mm'};

let options = {
    file: {
        level: 'debug',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: combine(
            timestamp(formatTimestamp),
            myFormat,
        ),
    },
    fileFront: {
        level: 'front_info',
        filename: `${appRoot}/logs/front.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        format: combine(
            timestamp(formatTimestamp),
            myFormat,
        ),
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            colorize({ all: true}),
            timestamp(formatTimestamp),
            myFormat,
        ),
    }
};


winston.addColors(customLevels.colors);
let logger = createLogger({
    levels: customLevels.levels,
    transports: [
        new transports.File(options.file),
        new transports.File(options.fileFront),
        new transports.Console(options.console),
    ],
    exitOnError: false,
});
logger.frontMessage = function(message, type) {
    this.front_info({ message, type });

    return { message };
};

module.exports = logger;