import {Collection} from "../classes/Collection"
import {OnBallHasFiredObserver} from "../observers/OnBallHasFired"
import {OnUserDisconnect} from "../observers/OnUserDisconnect"

export let Observers = new Collection<Object>("event", [

	// Lista de observers e seus eventos
	{
		event:"ballHasFired",
		observers:[
			OnBallHasFiredObserver
		]
	},

	{
		event:'userDisconnected',
		observers:[
			OnUserDisconnect
		]
	}

]);