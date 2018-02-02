import {BallHasFiredEvent} from '../events/BallHasFiredEvent'
import {Observer} from '../classes/Observer'
import {Log} from '../classes/Logger'
import {User} from '../classes/User'

export class OnUserDisconnect extends Observer{
	private log:Log = new Log("Observer.OnUserDisconnect")

    public run(attachs:any){
    	this.log.dbg("Anyone has been disconnected from the server...");
    	let _user:User = attachs.find('user');

    	if(_user.player != null){
    		if(_user.player.gameroom != null){
    			_user.player.gameroom.removePlayer(_user.player);
    		}
    		_user.destroyPlayer()
    	}
    }
}