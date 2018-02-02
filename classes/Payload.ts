import {User} from "./User"
import {Gameroom} from "./Gameroom"
import {Player} from "./Player"
import {Network} from "./Network"

export class Payload{
    
    constructor(private _user:User,
        _action:string,
    private _data:any = null,
    private _is_received = false){
        this._data['action'] = _action;
    }

    public transport():boolean{
    	return false;
    }

    get user(){
    	return this._user;
    }

    get gameroom(){
    	return (this._user.player != null && this._user.player.gameroom != null) ? this._user.player.gameroom : null;
    }

    get player(){
    	return (this._user.player != null) ? this._user.player : null;
    }

    get data(){
    	return this._data;
    }

    get is_received(){
        return this._is_received
    }

    public toString(){
        return JSON.stringify(this.data);
    }
    
}

export class ErrorPayload extends Payload{

    constructor(_user:User,_error_code:number,_error_message:string){
         super(_user, 'error', {error:true, code:_error_code, message:_error_message});
    }
}