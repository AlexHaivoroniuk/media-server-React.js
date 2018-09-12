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
        setInterval(() => {
            this.res.write(':\n\n')
        }, 30000); 
    };
    send(data) {
        let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.res.write(
            `id: ${id}\n` 
            + `data: ${JSON.stringify(data)}\n\n`
            + `retry: 10000`);
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
        connections.push({ id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15), conn });
        console.log(connections)
        let data = { message:"FRONT Got All Movies",type : "warn",label:"Triggered",line:12,level:"front_info",timestamp:"2018-09-11  11:29:25"}
        // if (connections.length > 0){     
        //     connections.forEach(con => {
        //         // con.res.sseConnnection.send(data);
        //         console.log(con);
        //     })
        // }
        console.log('New client connected, now: ', connections.length);
        conn.res.on('close', function () {
            let i = connections.map(item => {
                return item.conn;
            }).indexOf(conn);
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