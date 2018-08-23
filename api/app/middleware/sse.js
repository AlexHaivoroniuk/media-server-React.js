exports.sseMiddleware = function sseMiddleware(req, res, next) {
    // console.log(" sseMiddleware is activated with "+ req+" res: "+res);
    res.sseConnection = new Connection(res);
    console.log(" res has now connection  res: "+res.sseConnection );
    next();
};
/**
 * A Connection is a simple SSE manager for 1 client.
 */
class Connection {
    constructor(res) {
        this.res = res;
    }
    setup() {
        this.res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
    };
    send(data) {
        let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.res.write(`id: ${id}\ndata: ${JSON.stringify(data)}\n\n`);
    };
};
 
exports.Connection = Connection;
/**
 * A Clients handles a bundle of connections with cleanup after lost connection.
 */
class Clients {
    constructor() {
        this.connections = [];
    }
    add(conn){
        let connections = this.connections;
        connections.push(conn);
        console.log('New client connected, now: ', connections.length);
        conn.res.on('close', function () {
            let i = connections.indexOf(conn);
            if (i >= 0) {
                connections.splice(i, 1);
            }
            console.log('Client disconnected, now: ', connections.length);
        });
    };
    forEach(cb){
        this.connections.forEach(cb);
    };
};
exports.Clients = Clients;