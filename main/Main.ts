/* Classes */
import {Configuration} from "./Configuration"
import {Collection} from "../classes/Collection"
import {User} from "../classes/User"
import {Player} from "../classes/Player"
import {Payload, ErrorPayload} from "../classes/Payload"
import {Gameroom} from "../classes/Gameroom"
import {Services} from "../classes/Services"
import {Event} from "../classes/Event"
import {Observer} from "../classes/Observer"
import {Log,Logger} from "../classes/Logger"

/* Init log */
Logger.configure(Configuration.log.console, Configuration.log.on_socket, Configuration.log.save_on_file, Configuration.log.folder);
let log = new Log("Main")

/* Instance the main driver, configure and listen */
let main_driver = new Configuration.main_driver(onConnect.bind(Configuration.main_driver), onReceive.bind(Configuration.main_driver), onClose.bind(Configuration.main_driver));

/* Main collections */
log.inf("Creating collections")
let Users = new Collection<User>("id")
let Players = new Collection<Player>("id")
let Gamerooms = new Collection<Gameroom>("id")
log.inf("Collections successfully created")

/* Register Services */
log.inf("Registering Services")
Services.add({name:"Users", obj:Users})
log.inf("User service registered")
Services.add({name:"Players", obj:Players})
log.inf("Player service registered")
Services.add({name:"Gamerooms", obj:Gamerooms})
log.inf("Gameroom service registered")
Services.add({name:"MainDriver", obj:main_driver});
log.inf("MainDriver service registered")
/* Functionality */
log.inf("Importing functionality")
import {Actions} from "./Actions"
import {Events} from "./Events"
import {Observers} from "./Observers"

/* Register observers in events */
log.inf("Registering Observers in events")
Observers.foreach((obj:any, index:any) => {
	if(Events.exists(obj.event)){
		let event = Events.find(obj.event);
		for(let ob in obj.observers){
			let ob_instance = new obj.observers[ob]();
			log.inf(ob_instance.constructor.name, " registered in event ", obj.event)
			event.register(ob_instance);
		}
	}
})

/* Control vars */
let _users_id = 1;

/* Initialize drivers */
log.inf("Initializing drivers")
let port_to_listen:number = 8000;

/**
* @function
* onConnection function is responsible for the new incomming connections,
* registering in the users collection and trigger of new user event
*/
function onConnect(client_id:string){
	log.inf("Registering new connection: ", client_id);
	let _user = new User(++_users_id, client_id);
	Users.add(_user);
	return _user.id;
}

/**
* @function
* onReceive function is responsbile for the new messages from users,
* propagating to Actions and Events
*/
function onReceive(client_id:string, data:{action:string}){
	log.inf("Routing received data from: ", client_id);
	if(!data.action || !(data instanceof Object) || !Actions.exists(data.action)){
		log.err("Action not found", data.action)
		return false;
	}
	let _user = Users.findBy('client_id', client_id);
	if(_user){

		/* Make the payload */
		log.inf("Making Payload: ", client_id);
		let _payload = new Payload(_user, data, true);

		/* Run the action */
		log.inf("Routing to action: ", data.action);
		Actions.find(data.action).run(_payload);


		return true;
	}else{
		log.err("User nout found")
	}

	return false;
}

/**
* @function
* onClose function is responsible for when a connection is closed
*/
function onClose(client_id:string){
	log.inf("User had been disconnected");
	let _user = Users.findBy('client_id', client_id);
	Events.find('userDisconnected').attach("user",_user).notify();
	log.dbg("User", _user.id, "been removed?", Users.remove(_user.id.toString()))
	log.dbg("Users connected on the server", Users.length)
}

/* Start the server */
log.inf("Main driver instancied successfully")
main_driver.initialize();
log.inf("Main driver initialized")
log.inf("Trying to listen on port", port_to_listen)
main_driver.listen(port_to_listen);
log.inf("Successfully listened on port", port_to_listen)
log.inf("Server has been started, have fun and enjoy ;)")