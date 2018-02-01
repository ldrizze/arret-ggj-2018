import {Player} 	from "./Player"
import {Collection} from "./Collection"

export class Gameroom{

	private _host 		: Player;
	private players 	: Collection<Player>;
	private transport 	: Array<Object>;
	
	constructor(
		private id:number,
		private name:string,
		private password:string,
		private maxPlayers:number = 3 // Arret tem apenas 3 players por sala
	){
		this.players = new Collection<Player>("name")
	}
	
	public addPlayer(player:Player){
		this.players.add(player);
	}

	public removePlayer(){

	}

	get host(){
		return this._host;
	}

	get isFull(){
		return this.players.length == this.maxPlayers;
	}

	get playerCount(){
		return this.players.length;
	}

	public findPlayerById(){

	}

	public update(){

	}

	public setHost(host:Player){
		this._host = host;
	}
}