import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"
import {ServiceDecorators} from "../classes/Services"
import {Collection} from "../classes/Collection"
import {Gameroom} from "../classes/Gameroom"
import {Player} from "../classes/Player"
import {Driver} from "../classes/Driver"
import {Log} from "../classes/Logger"
import {User} from "../classes/User"
import {GameObject} from "../classes/GameObject"
import {Vector3} from "../classes/Vector3"
import {Drone} from "../classes/Drone"

@ServiceDecorators.service(["MainDriver"])
export class GameOver extends Action{

	public key:string = "gameOver";

	public Users:Collection<User>;
	public MainDriver:Driver;
	public Gamerooms:Collection<Gameroom>;

	private log:Log = new Log("Actions.GameOver");

	public run(payload:Payload):Payload{

		/* Se todos os jogadores ainda não carregaram o game */
		if(!payload.gameroom && !payload.gameroom.allPlayersAreReady()){
			this.log.wrn("All players aren't ready, wait...")
			return null;
		}

		/* Se o game está rolando */
		if(!payload.gameroom || !payload.gameroom.gameStarted){
			this.log.wrn("User", payload.user, "trying to gameOver, but no game has started");
			return null;
		}

		/* Só aceita a mensagem do host */
		if(payload.user.player.id != payload.gameroom.host.id){
			this.log.wrn("User", payload.user, "trying to gameOver, but isn't the host");
			return null;
		}


		if(payload.data && payload.data.winner){

			let _pl:Payload[] = Payload.createRoomPayload(payload.gameroom, this.key, {winner: payload.data.winner});
			this.MainDriver.send(_pl);

			/* Clear the game */
			this.log.dbg("The game is over, cleaning up the gameroom")
			let _g:Gameroom = payload.gameroom;
			let _gp:Player[] = [];

			_g.players.foreach((p) => {
				_gp.push(p);
			})

			for(let i in _gp){
				this.log.dbg("Removing player", _gp[i]);
				_g.removePlayer(_gp[i]);
				this.log.dbg("Destroying player in User", _gp[i].user);
				_gp[i].user.destroyPlayer();
			}


			/* Clear gameroom.gameStarted and make it free */
			this.log.dbg("gameroom.gameStarted set to false");
			_g.gameStarted = false;
			this.log.dbg("cleaning up drones");
			_g.drones.clear();
			this.log.dbg("cleaning uo player colors");
			_g.clearColors();
			this.log.dbg("Gameroom", _g, "has been cleared and up for another match!");
		}else{
			this.log.wrn("Wrong payload data");
		}


		return null;
	}
	
}