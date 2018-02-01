import {Player} from "./Player"
import {Driver} from "./Driver"

export class User{

    private _player:Player;
    private _driver:Driver;
    private _is_guest:boolean = true;

    constructor(private _id:number, private _client_id:string){}

    get player(){
    	return this._player;
    }

    get client_id(){
    	return this._client_id;
    }

    get id(){
    	return this._id;
    }

    get is_guest(){
        return this._is_guest;
    }

    public setDriver(driver:Driver):void{
        this._driver = driver;
    }

    public auth(username:string, password:string):boolean{
        /* TODO */
        return null;
    }

    public makePlayer(){
        this._player = new Player();
        this._player.setUser(this);
    }

    public destroyPlayer(){
        this._player = null;
    }

    public toString(){
        return this._id+"|"+this._client_id
    }
    
}