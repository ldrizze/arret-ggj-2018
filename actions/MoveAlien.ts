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
export class MoveAlien extends Action{

	public key:string = "moveAlien";

	public Users:Collection<User>;
	public MainDriver:Driver;
	public Gamerooms:Collection<Gameroom>;

	private log:Log = new Log("Actions.MoveAlien");

	public run(payload:Payload):Payload{

		/* Se todos os jogadores ainda não carregaram o game */
		if(!payload.gameroom || !payload.gameroom.allPlayersAreReady()){
			this.log.wrn("All players aren't ready, wait...")
			return null;
		}

		/* Se o cara não é o VR */
		if(payload.player.id != payload.gameroom.host.id){
			this.log.wrn("Player", payload.player, "trying to walk as alien, but it isn't the alien (lul)");
			return null;
		}

		/* Se o game está rolando */
		if(!payload.gameroom || !payload.gameroom.gameStarted){
			this.log.wrn("User", payload.user, "trying to walk, but no game has started");
			return null;
		}

		/* Verifica se as informações estão corretas */
		if(payload.data && payload.data instanceof Object && payload.data.x && payload.data.y && payload.data.z){

			if(payload.user.player.id != payload.gameroom.host.id){
				this.log.wrn("Payload user is not the host", payload);
				return null;
			}

			payload.player.setPosition(new Vector3(payload.data.x, payload.data.y, payload.data.z));
			let _pp = payload.player.getPosition();
			let _p:Array<Payload> = new Array<Payload>();
			payload.gameroom.players.foreach((p:Player,i) => {
				if(p.id != payload.player.id) _p.push(new Payload(p.user, 'moveAlien', {'x': _pp.x, 'y': _pp.y, 'z' : _pp.z}));
			});

			/* Send payload to another users */ 
			if(_p.length > 0){
				this.MainDriver.send(_p);
			}

		}else{
			this.log.dbg("No payload data found");
		}

		return null;
	}
	
}