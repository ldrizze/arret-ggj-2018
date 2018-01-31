import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"
import {ServiceDecorators} from "../classes/Services"
import {Collection} from "../classes/Collection"
import {Gameroom} from "../classes/Gameroom"
import {Player} from "../classes/Player"
import {Driver} from "../classes/Driver"
import {Log} from "../classes/Logger"
import {User} from "../classes/User"

@ServiceDecorators.service(["Users"])
export class CreateRoom extends Action{

	public key:string = "route";

	public Users:Collection<User>;
	public MainDriver:Driver;

	private log:Log = new Log("Actions.Route");

    public run(payload:Payload):Payload{
 		

        return null;
    }
    
}