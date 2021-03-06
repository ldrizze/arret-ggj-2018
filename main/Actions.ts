import {Action} from "../classes/Action"
import {Collection} from "../classes/Collection"

import {Route} from "../actions/Route"
import {MakeMatch} from "../actions/MakeMatch"
import {GameplayLoaded} from "../actions/GameplayLoaded"
import {PlaceDrone} from "../actions/PlaceDrone"
import {MoveAlien} from "../actions/MoveAlien"
import {Tick} from "../actions/Tick"
import {DestroyDrone} from "../actions/DestroyDrone"
import {GameOver} from "../actions/GameOver"

export let Actions = new Collection<any>("key", [

	// Lista de Actions
	new MakeMatch(),
	new GameplayLoaded(),
	new PlaceDrone(),
	new MoveAlien(),
	new Tick(),
	new DestroyDrone(),
	new GameOver(),
	new Route()

]);