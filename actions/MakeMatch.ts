import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"
import {ServiceDecorators} from "../classes/Services"
import {Collection} from "../classes/Collection"
import {Gameroom} from "../classes/Gameroom"
import {Player} from "../classes/Player"
import {Driver} from "../classes/Driver"
import {Log} from "../classes/Logger"
import {User} from "../classes/User"

@ServiceDecorators.service(["Users", "MainDriver", "Gamerooms"])
export class MakeMatch extends Action{

	public key:string = "makematch";

	public Users:Collection<User>;
	public MainDriver:Driver;
	public Gamerooms:Collection<Gameroom>;

	private log:Log = new Log("Actions.MakeMatch");

	public run(payload:Payload):Payload{

		let g : Gameroom = null;
		let p : Player = payload.player;
		let md : Driver = this.MainDriver;

		/* Make make player if doesn't has been maked */
		if(payload.player === null){
			payload.user.makePlayer();
			p = payload.user.player;
		}

		if(payload.data.type == 'mobile'){ // Mobile player

			this.Gamerooms.foreach((element,index) => {
				if(element.playerCount >= 2 && !element.gameStarted){ // Sala tem apenas uma vaga sobrando
					if(element.host && !g){ // Nao achou sala e a sala atual já tem host mas tem uma vaga sobrando
						g = element;
						return false;
					}else{ // Já achou sala ou a sala só tem uma vaga sobrando mas tem que ser vr pra ser host
						// Continua procurando
					}
				}else{ // sala tem mais de uma vaga sobrando
					if(!g && !element.gameStarted){
						g = element;
						return false;
					}
				}
			});

		}else if(payload.data.type == 'vr'){ // VR player

			this.Gamerooms.foreach((element,index) => {
				/**
				 * Se a sala tem host continua procurando senão, se ainda 
				 * nao achou uma sala continua procurando. Se encontrou 
				 * uma sala sem host guarda a referncia e nao procura mais.
				 * Mas termina o for. :P
				 */
				if(!element.host && !g && !element.gameStarted){
					g = element;
				}
			});
		}

		if(!g){ // Nao encontrou sala apropriada
			// TO-DO: instanciar nova gameroom
			// TO-DO: adicionar a collection de gamerooms
			this.log.dbg('Instanciate new gameroom.');
			this.log.dbg('Add gameroom to Gamerooms collection.');
			g = new Gameroom("grname", 3, false);
			this.Gamerooms.add(g);
		}

		g.addPlayer(payload.user.player); // adiciona o player à sala

		if(payload.data.type == 'vr' && !g.host){ // se o player for vr e nao tiver host na sala
			g.setHost(payload.user.player);
		}

		if(g.isFull){ // Se após a entrada do novo player a sala está completa
			// TO-DO: broadcast entrada de usuário e inicio de partida
			this.log.dbg('Broadcast new user entering and match start to all gameroom\'s players');
			g.gameStarted = true;
			g.players.foreach((element, index) => {
				let _pl = new Payload(element.user, 'joinRoom', { grid: g.id, newuser: true, totalusers: g.playerCount, startgame: true, host: (g.host != null && element.player.id == g.host.id) })
				md.send(_pl)
			});

		}else{
			// TO-DO: broadcast entrada de usuário
			this.log.dbg('Broadcast new user entering to all gameroom\'s players');
			g.players.foreach((element, index) => {
				let _pl = new Payload(element.user, 'joinRoom', { grid: g.id, newuser: true, totalusers: g.playerCount, startgame: false, host: (g.host != null && element.player.id == g.host.id) })
				md.send(_pl)
			});
		}

		return null;
	}
	
}