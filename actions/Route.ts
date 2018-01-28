import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"
import {ServiceDecorators} from "../classes/Services"
import {Collection} from "../classes/Collection"
import {Gameroom} from "../classes/Gameroom"
import {Player} from "../classes/Player"
import {Driver} from "../classes/Driver"
import {Log} from "../classes/Logger"
import {User} from "../classes/User"

@ServiceDecorators.service(["Users", "MainDriver"])
export class Route extends Action{

	public key:string = "route";

	public Users:Collection<User>;
	public MainDriver:Driver;

	private log:Log = new Log("Actions.Route");

    public run(payload:Payload):Payload{
 		this.log.dbg("Received route")
 		this.log.inf("Payload", payload)
 		this.log.dbg("Routing route")

 		let drv:Driver = this.MainDriver;

 		this.log.dbg("Routing to",this.Users.length,"users")

 		this.Users.foreach((element, index) => {
 			if(element.client_id != payload.user.client_id){
 				let pl = new Payload(element, payload.data)
 				drv.send(pl)
 			}
 		});

        return null;
    }
    
}