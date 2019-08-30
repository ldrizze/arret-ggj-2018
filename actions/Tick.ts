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

@ServiceDecorators.service(["MainDriver"])
export class Tick extends Action{

	public key:string = "tick";

	public Users:Collection<User>;
	public MainDriver:Driver;
	public Gamerooms:Collection<Gameroom>;

	private log:Log = new Log("Actions.Tick");

	public run(payload:Payload):Payload{

		/* Se todos os jogadores ainda não carregaram o game */
		if(!payload.gameroom || !payload.gameroom.allPlayersAreReady()){
			this.log.wrn("All players aren't ready, wait...")
			return null;
		}

		/* Se o game está rolando */
		if(!payload.gameroom || !payload.gameroom.gameStarted){
			return null;
		}

		let thetime = payload.gameroom.timer.time/1000;
		let m = Math.floor(thetime/60);
		let s = Math.floor(thetime%60);

		return new Payload(payload.user, this.key, {'m' : m, 's': s, 't' : thetime})
	}
	
}
