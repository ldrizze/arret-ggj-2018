import {Driver} from "../classes/Driver"
import {Payload} from "../classes/Payload"
import {Collection} from "../classes/Collection"
import {Log} from "../classes/Logger"

let socketIO = require("socket.io");
export class SocketIO extends Driver{

	private app:any;
	private io:any;
	private sockets:Collection<any>;
	private log:Log = new Log('Driver.SocketIO');
	public port:number;

	public initialize():void{
		this.app = require('http').createServer(this.handleHTTPService.bind(this));
		this.io = socketIO(this.app);

		// SocketIO events
		this.io.on("connection", this.onConnect.bind(this));

		this.sockets = new Collection<any>('id');

		__io_instance = this;
	}

	public listen(port:number):void{
		this.port = port;
		this.app.listen(port)
	}

	public send(p:any):void{
		if(p instanceof Payload){
			let payload:Payload = p;

			if(payload.is_received) this.log.wrn("Returning a received payload")

			let _d = {
				action: payload.data.action,
				payload: (<any>Object).assign({}, payload.data)
			}

			delete _d.payload.action;

			this.log.dbg("Sending payload to", payload.user.client_id, JSON.stringify(_d))

			let _sock = this.sockets.find(payload.user.client_id);
			if(_sock){
				_sock.s.emit('action', _d)
			}else{
				this.log.err("Socket not found for client_id", payload.user.client_id)
			}
		}else if(p instanceof Array){
			for(let i in p){
				this.send(p[i]);
			}
		}
	}

	public close(socket:any):void{

	}

	private onConnect(socket:any){
		this.log.inf("Client connected", socket.id)
		this.sockets.add({'id': socket.id, s:socket})

		/* Listen for socket events */
		socket.on('action', this.onReceive);
		socket.on('disconnect', this.onClose);

		/* Core inform */
		this.onConnectFn(socket.id)
	}

	private onReceive(data:any):void{
		__io_instance.doReceive(this, data);
	}

	private doReceive(socket:any, data:any){
		this.log.dbg("Data received from", socket.id, JSON.stringify(data))
		this.onReceiveFn(socket.id, data);
	}

	private onClose():void{
		__io_instance.doClose(this);
	}

	private doClose(socket:any):void{
		this.log.inf("Connection closed from", socket.id)
		this.onCloseFn(socket.id);
	}

	private handleHTTPService(req: any, res: any):void{
		res.writeHead(200);
		res.end(this.port.toString());
	}
}

let __io_instance = null;