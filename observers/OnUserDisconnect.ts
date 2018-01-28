import {BallHasFiredEvent} from '../events/BallHasFiredEvent'
import {Observer} from '../classes/Observer'
import {Log} from '../classes/Logger'

export class OnUserDisconnect extends Observer{
	private log:Log = new Log("Observer.OnUserDisconnect")

    public run(attachs:any){
    	this.log.dbg("Anyone has been disconnected from the server...");
    }
}