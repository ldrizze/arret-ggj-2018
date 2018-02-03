import {BallHasFiredEvent} from '../events/BallHasFiredEvent'
import {Observer} from '../classes/Observer'
import {Log} from '../classes/Logger'
import {User} from '../classes/User'
import {Payload} from '../classes/Payload'
import {ServiceDecorators} from '../classes/Services'
import {Driver} from '../classes/Driver'

@ServiceDecorators.service(['MainDriver', 'Gamerooms'])
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
				let _ps = [];
				let _g = _user.player.gameroom;

				/* If has gameroom and the game is running */
				if(_user.player.gameroom != null && _user.player.gameroom.gameStarted){
					_user.player.gameroom.players.foreach((element, index) => {
						_ps.push(element);
						if(element.id == _user.player.id) return true;
						let _pld = new Payload(element.user, 'abortGame', {'errormsg': 'A player has been disconected from the game'});
						_d.send(_pld);
					});

					this.log.dbg("Gameroom players", (_user.player.gameroom.players ? _user.player.gameroom.players.length : 0))
					for(let i in _ps){
						this.log.dbg("Removing player", _ps[i])
						_g.removePlayer(_ps[i])
						this.log.dbg("Destroying player in User", _ps[i].user)
						_ps[i].user.destroyPlayer()
					}
				}

				/* Clear gameroom.gameStarted and make it free */
				this.log.dbg("gameroom.gameStarted set to false");
				_g.gameStarted = false;
				this.log.dbg("cleaning up drones")
				_g.drones.clear();
			}
		}
	}
}