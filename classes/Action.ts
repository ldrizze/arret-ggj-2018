import {Collection} from "../classes/Collection"
import {Observer} from "../classes/Observer"
import {Payload} from "../classes/Payload"

export abstract class Action{

	public abstract key:string = "action";

    public abstract run(payload:Payload):Payload;
}