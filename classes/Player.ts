import {GameObject} from "./GameObject"
import {Vector3} from "./Vector3";
import {User}     from './User'
import {Gameroom} from "./Gameroom"

export class Player extends GameObject{

    private _id : number = -1;
    private _gameroom : Gameroom;
    private _user : User;
    private guest : boolean = true;
    private input : object = {
        position : new Vector3,
        rotation : new Vector3
    }
    
    private gameIsFocused : boolean = true;

    get gameroom(){
    	return this._gameroom;
    }

    get id(){
        return this._id;
    }

    get user(){
        return this._user;
    }
}