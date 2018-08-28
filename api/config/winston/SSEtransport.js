const Transport = require('winston-transport');
const eventBus  = require('./../../app/utils/EventBus');
module.exports = class SSETransport extends Transport {
    constructor(opts) {
        super(opts);
    }

    log(info, callback) {
        setImmediate(() => {
            eventBus.emit('message', info)
          });
        callback();
    }
}
