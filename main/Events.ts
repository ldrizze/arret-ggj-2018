import {Event} from "../classes/Event"
import {Collection} from "../classes/Collection"
import {BallHasFiredEvent} from "../events/BallHasFiredEvent"
import {UserDisconnected} from "../events/UserDisconnected"

export let Events = new Collection<Event>("name", [
	
	// Lista de eventos
	BallHasFiredEvent,
	UserDisconnected

]);