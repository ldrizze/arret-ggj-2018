import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"
import {ServiceDecorators} from "../classes/Services"
import {Collection} from "../classes/Collection"
import {Gameroom} from "../classes/Gameroom"
import {Player} from "../classes/Player"
import {Driver} from "../classes/Driver"
import {Log} from "../classes/Logger"
import {User} from "../classes/User"

@ServiceDecorators.service(["MainDriver"])
export class GameplayLoaded extends Action{

	public key:string = "gameplayLoaded";

	public Users:Collection<User>;
	public MainDriver:Driver;
	public Gamerooms:Collection<Gameroom>;

	private log:Log = new Log("Actions.GameplayLoaded");

	public run(payload:Payload):Payload{

		/* Se player não foi instanciado */
		if(!payload.player){
			this.log.wrn("User", payload.user, "trying to ready, but it isn't in any gameroom");
			return null;
		}

		/* Se o cara não está em nenhuma gameroom */
		if(!payload.gameroom){
			this.log.wrn("Player", payload.player, "trying to ready, but it isn't in any gameroom");
			return null;
		}

		/* Se a gameroom não foi iniciada */
		if(!payload.gameroom.gameStarted){
			this.log.wrn("Player", payload.player, "trying to ready, but the gameroom hasn't been started");
			return null;
		}

		/* Player ready */
		if(!payload.player.ready){
			payload.player.ready = true;
		}else{
			this.log.wrn("Player", payload.player, "already ready");
			return null;
		}

		let all_ready = true;
		payload.player.gameroom.players.foreach((p, i) => {
			if(!p.ready){
				all_ready = false;
				return false;
			}
		});

		if(all_ready){
			payload.gameroom.timer.start()
			let _p = Payload.createRoomPayload(payload.gameroom, 'gameplayLoaded', {'start': true});
			this.MainDriver.send(_p);
			return null;
		}

		return new Payload(payload.user, 'gameplayLoaded', {'start':false});
	}
	
}