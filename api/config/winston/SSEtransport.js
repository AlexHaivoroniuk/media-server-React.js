const Transport = require('winston-transport');
const eventBus  = require('./../../app/utils/EventBus')
// const conn = require('./../../server');

module.exports = class SSETransport extends Transport {
    constructor(opts) {
        super(opts);
    }

    log(info, callback) {
        setImmediate(() => {
            eventBus.emit('message', info)
            // console.log(info)
          });
        callback();
    }
}
