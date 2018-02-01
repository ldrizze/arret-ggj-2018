import {GameObject} from "./GameObject"
import {Vector3} from "./Vector3";
import {User}     from './User'
import {Gameroom} from "./Gameroom"
import {Log} from "./Logger"

export class Player extends GameObject{

    private _id : string = "-1";
    private _gameroom : Gameroom;
    private _user : User;
    private guest : boolean = true;
    private input : object = {
        position : new Vector3,
        rotation : new Vector3
    }

    private log : Log = new Log("Player")
    
    private gameIsFocused : boolean = true;

    constructor(){
        super();
        this._id = this.makeID()
        this.log.inf("CREATING NEW PLAYER", this._id)
    }

    get gameroom(){
    	return this._gameroom;
    }

    get id(){
        return this._id;
    }

    get user(){
        return this._user;
    }

    public inGameroom(){
        return this._gameroom !== null;
    }

    public setGameroom(gr:Gameroom){
        this._gameroom = gr;
    }

    public unsetGameroom(){
        this._gameroom = null;
    }

    public setUser(u:User){
        this._user = u;
    }

    private makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text.substr(0, 4);
    }

    public toString(){
        return this._id;
    }
}