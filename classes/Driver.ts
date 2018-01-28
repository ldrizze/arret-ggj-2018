import {Payload} from "./Payload"
export abstract class Driver{
	constructor(protected onConnectFn:Function,protected onReceiveFn:Function,protected onCloseFn:Function){}
	public abstract initialize():void;
	public abstract listen(port:number):void;
	public abstract send(payload:Payload):void;
	public abstract close(socket:any):void;
}