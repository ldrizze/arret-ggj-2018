import {BallHasFiredEvent} from '../events/BallHasFiredEvent'
import {Observer} from '../classes/Observer'
import {Log} from '../classes/Logger'
import {User} from '../classes/User'
import {Payload} from '../classes/Payload'
import {ServiceDecorators} from '../classes/Services'
import {Driver} from '../classes/Driver'

@ServiceDecorators.service(['MainDriver'])
export class OnUserDisconnect extends Observer{
	private log:Log = new Log("Observer.OnUserDisconnect")

	private MainDriver:Driver;

	public run(attachs:any){
		this.log.dbg("Anyone has been disconnected from the server...");
		let _user = attachs.find('user');

		if(_user.item){
			_user = _user.item;
			if(_user.player != null){
				this.log.dbg("Unset player", _user.player);
				let _d = this.MainDriver;

				/* If has gameroom and the game is running */
				if(_user.player.gameroom != null && _user.player.gameroom.gameStarted){
					_user.player.gameroom.gameStarted = false;
					_user.player.gameroom.players.foreach((element, index) => {
						if(element.id == _user.player.id) return true;
						let _pld = new Payload(element.user, 'abortGame', {'errormsg': 'A player has been disconected from the game'});
						_d.send(_pld);

						if(element.gameroom != null) element.gameroom.removePlayer(element);
					});
				}

				if(_user.player.gameroom != null){
					_user.player.gameroom.removePlayer(_user.player);
				}
				_user.destroyPlayer()
			}
		}
	}
}