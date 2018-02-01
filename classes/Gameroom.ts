import {Player} 	from "./Player"
import {Collection} from "./Collection"

export class Gameroom{

	private _id 		: string;
	private _host 		: Player;
	public players 	: Collection<Player>;
	
	constructor(
		private name:string,
		private maxPlayers:number = 3, // Arret tem apenas 3 players por sala
		private privategame : boolean = false
	){
		this.players = new Collection<Player>("id")
		this._id = this.makeID()
	}
	
	public addPlayer(player:Player){
		player.setGameroom(this);
		this.players.add(player);
	}

	public removePlayer(player:Player){
		if(this.players.remove(player.id))
			player.unsetGameroom();
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

	get id(){
		return this._id;
	}

	get isPrivate(){
		return this.privategame;
	}

	public findPlayerById(){

	}

	public update(){

	}

	public setHost(host:Player){
		this._host = host;
	}

	private makeID() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text.substr(0, 4);
	}
}