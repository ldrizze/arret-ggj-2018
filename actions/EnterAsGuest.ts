import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"
import {ServiceDecorators} from "../classes/Services"
import {Collection} from "../classes/Collection"
import {Gameroom} from "../classes/Gameroom"
import {Player} from "../classes/Player"
import {Driver} from "../classes/Driver"
import {Log} from "../classes/Logger"

@ServiceDecorators.service(["Gamerooms", "Players", "MainDriver"])
export class EnterAsGuest extends Action{

	public key:string = "enterAsGuest";

	public Gamerooms:Collection<Gameroom>;
	public Players:Collection<Player>;
	public MainDriver:Driver;

	private log:Log = new Log("Actions.EnterAsGuest");

    public run(payload:Payload):Payload{
 		this.log.dbg("Entering as guest")
 		this.log.inf("Payload", payload)
 		this.log.dbg("Sending message back")

 		let _send_payload = new Payload(payload.user, {allineedismusic:"get there"});
 		this.MainDriver.send(_send_payload);

        return null;
    }
    
}