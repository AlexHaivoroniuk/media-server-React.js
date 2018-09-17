const Transport = require('winston-transport');

module.exports.SSE = class SSE {
    constructor(options) {
        this.options = Object.assign({}, {
            pingInterval: 10000,
            maxStreamDuration: 60000,
            clientRetryInterval: 10000,
            startId: 1,
            historySize: 100,
            rewind: 0
        }, options);

        this.nextID = this.options.startId;
        this.clients = new Set();
        this.messages = [];

        if (this.options.pingInterval) {
            this.pingTimer = setInterval(() => 	this.clients.forEach(c => c.res.write('\n\n'))
			, this.options.pingInterval);
        }
    }

    publish(data, eventName) {
		const thisID = this.nextID;
		if (typeof data === "object") data = JSON.stringify(data);
		data = data ? data.split(/[\r\n]+/).map(str => 'data: '+str).join('\n') : '';

		const output = (
			(data ? "id: " + thisID + "\n" : "") +
			(data || "data: ") + '\n\n'
		);

		this.clients.forEach(c => c.res.write(output));

		this.messages.push(output);
		while (this.messages.length > this.options.historySize) {
			this.messages.shift();
		}
		this.nextID++;
	}

	subscribe(req, res) {
		const c = {req, res};
		c.req.socket.setNoDelay(true);
		c.res.writeHead(200, {
			"Content-Type": "text/event-stream",
			"Cache-Control": "s-maxage="+(Math.floor(this.options.maxStreamDuration/1000)-1)+"; max-age=0; stale-while-revalidate=0; stale-if-error=0",
			"Connection": "keep-alive"
		});
		let body = "retry: " + this.options.clientRetryInterval + '\n\n';

		const lastID = Number.parseInt(req.headers['last-event-id'], 10);
		const rewind = (!Number.isNaN(lastID)) ? ((this.nextID-1)-lastID) : this.options.rewind;
		if (rewind) {
			this.messages.slice(0-rewind).forEach(output => {
				body += output
			});
		}

		c.res.write(body);
		c.res.on('close', () => {
			
		})
		let id =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

		this.clients.add(c);

		setTimeout(() => {
			if (!c.res.finished) {
				this.unsubscribe(c);
			}
		}, this.options.maxStreamDuration);
		c.res.on('close', () => this.unsubscribe(c));
		return c;
	}

	unsubscribe(c) {
		c.res.end();
		this.clients.delete(c);
	}

	listClients() {
		const rollupByIP = {};
		this.clients.forEach(c => {
			const ip = c.req.connection.remoteAddress;
			if (!(ip in rollupByIP)) {
				rollupByIP[ip] = 0;
			}
			rollupByIP[ip]++;
		});
		return rollupByIP;
	}

	getSubscriberCount() {
		return this.clients.size;
	}
}

class SSETransport extends Transport {
    constructor(opts, sseInst) {
		super(opts);
		this.ssePub = sseInst;
    }
	
    log(info, callback) {
		this.ssePub.publish(info);
        callback();
    }
}

module.exports.ExpressSseTransport = SSETransport;
