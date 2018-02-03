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
export class PlaceDrone extends Action{

	public key:string = "placeDrone";

	public Users:Collection<User>;
	public MainDriver:Driver;
	public Gamerooms:Collection<Gameroom>;

	private log:Log = new Log("Actions.PlaceDrone");

	public run(payload:Payload):Payload{

		/* Se todos os jogadores ainda não carregaram o game */
		if(!payload.gameroom && !payload.gameroom.allPlayersAreReady()){
			this.log.wrn("All players aren't ready, wait...")
			return null;
		}

		/* Se o cara não for um dos mobile */
		if(payload.player.id == payload.gameroom.host.id){
			this.log.wrn("Player", payload.player, "trying to place drone, but it is the alien (lul)");
			return null;
		}

		/* Se o game está rolando */
		if(!payload.gameroom || !payload.gameroom.gameStarted){
			this.log.wrn("User", payload.user, "trying to place drone, but no game has started");
			return null;
		}

		/* Verifica se as informações estão corretas */
		if(payload.data && payload.data instanceof Object && payload.data.x && payload.data.y && payload.data.z){

			let drone = new GameObject();
			drone.setPosition(new Vector3(payload.data.x, payload.data.y, payload.data.z));
			payload.gameroom.drones.add(drone);
			let dp = drone.getPosition();
			let _p:Array<Payload> = new Array<Payload>();
			payload.gameroom.players.foreach((p:Player,i) => {
				if(p.id != payload.player.id) _p.push(new Payload(p.user, 'placeDrone', {'x': dp.x, 'y': dp.y, 'z' : dp.z, 'color' : payload.player.color}));
			});

			/* Send payload to another users */ 
			if(_p.length > 0){
				this.MainDriver.send(_p);
			}

		}

		return null;
	}
	
}