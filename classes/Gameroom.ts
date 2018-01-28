import {Player} from "./Player"
import {Collection} from "./Collection"

export class Gameroom{

	private host : Player;
	private players : Collection<Player>;
	private transport : Array<Object>;
	
	constructor(
		private id:number,
		private name:string,
		private password:string,
		private maxPlayers:number = 10
	){
		
	}
	
	public addPlayer(){

	}

	public removePlayer(){

	}

	get isFull(){
		return this.players.length == this.maxPlayers;
	}

	public findPlayerById(){

	}

	public update(){

	}
}