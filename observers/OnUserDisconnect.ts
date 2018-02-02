import {BallHasFiredEvent} from '../events/BallHasFiredEvent'
import {Observer} from '../classes/Observer'
import {Log} from '../classes/Logger'
import {User} from '../classes/User'

export class OnUserDisconnect extends Observer{
	private log:Log = new Log("Observer.OnUserDisconnect")

    public run(attachs:any){
    	this.log.dbg("Anyone has been disconnected from the server...");
    	let _user = attachs.find('user');

    	if(_user.item){
    		_user = _user.item;
	    	if(_user.player != null){
    			this.log.dbg("Unset player", _user.player);
	    		if(_user.player.gameroom != null){
	    			_user.player.gameroom.removePlayer(_user.player);
	    		}
	    		_user.destroyPlayer()
	    	}
	    }
    }
}