import {Collection} from "./Collection"

export class Logger{

	private static on_console:boolean;
	private static on_socket:boolean;
	private static on_file:boolean;
	private static folder:string;

	private static sockets = new Collection<any>("id");

	public static configure(on_console:boolean, on_socket:boolean,on_file:boolean, folder?:string):void{
		Logger.on_console = on_console;
		Logger.on_socket = on_socket;
		Logger.on_file = on_file;
		Logger.folder = folder;
	}

	public static log(message:string):void{
		if(Logger.on_socket){

		}

		if(Logger.on_file){

		}

		if(Logger.on_console){
			console.log(message);
		}
	}

	private static _save_log_file():void{

	}

}

export class Log{

	public static DBG:number = 1;
	public static WRN:number = 2;
	public static ERR:number = 3;
	public static INF:number = 4;

	private logtypes = [null, "DBG", "WRN", "ERR", "INF"];

	constructor(private name:string){}

	public log(logtype:number, ...message:any[]):void{
		if(this.logtypes[logtype] != undefined){
			Logger.log(`#${this.logtypes[logtype]} [${this.name}] ${message.join(' | ')}`);
		}else{
			Logger.log(`#ERR [${this.name}.Log] logtype error ${logtype}`);
		}
	}

	public dbg(...message:any[]):void{
		message.unshift(Log.DBG)
		this.log.apply(this, message)
	}

	public err(...message:any[]):void{
		message.unshift(Log.ERR)
		this.log.apply(this, message)
	}

	public wrn(...message:any[]):void{
		message.unshift(Log.WRN)
		this.log.apply(this, message)
	}

	public inf(...message:any[]):void{
		message.unshift(Log.INF)
		this.log.apply(this, message)
	}
}