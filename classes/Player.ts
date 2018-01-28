import {GameObject} from "./GameObject"
import {Vector3} from "./Vector3";
import {Gameroom} from "./Gameroom"

export class Player extends GameObject{

    private id : number = -1;
    private _gameroom : Gameroom;
    private guest : boolean = true;
    private input : object = {
        position : new Vector3,
        rotation : new Vector3
    }
    
    private gameIsFocused : boolean = true;

    get gameroom(){
    	return this._gameroom;
    }
}