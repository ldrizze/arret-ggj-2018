import {Player} 	from "./Player"
import {Collection} from "./Collection"
import {Log} from "./Logger"
import {GameObject} from "./GameObject"
import {Timer} from "./Timer"


export class Gameroom{

	private _id 		: string;
	private _host 		: Player;
	public players 		: Collection<Player>;
	public gameStarted 	: boolean = false;
	public drones		: Collection<GameObject>;
	public timer		: Timer;
	public blue			: boolean = false;
	public red 			: boolean = false;

	private log			: Log = new Log("Gameroom");
	
	constructor(
		private name:string,
		private maxPlayers:number = 3, // Arret tem apenas 3 players por sala
		private privategame : boolean = false
	){
		this.players = new Collection<Player>("id")
		this._id = this.makeID()
		this.drones = new Collection<GameObject>("none")
		this.timer = new Timer;
	}
	
	public addPlayer(player:Player){
		player.setGameroom(this);
		this.players.add(player);
	}

	public removePlayer(player:Player){
		this.log.dbg("Removing player", player.id);
		if(this.players.remove(player.id)){
			if(this._host != null && this._host.id == player.id) this.unsetHost();
			player.unsetGameroom();
		}
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

	public unsetHost(){
		this._host = null;
	}

	public allPlayersAreReady():boolean{
		let rdy = true;
		if(this.players.length > 0){
			this.players.foreach((p:Player) => {
				if(!p.ready){
					rdy = false;
					return false;
				}
			});
		}
		return rdy;
	}

	public clearColors():void{
		this.red = false;
		this.blue = false;
	}

	private makeID():string{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text.substr(0, 4);
	}
}