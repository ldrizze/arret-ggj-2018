import {Action} from "../classes/Action"
import {Collection} from "../classes/Collection"

import {Route} from "../actions/Route"
import {MakeMatch} from "../actions/MakeMatch"

export let Actions = new Collection<any>("key", [

	// Lista de Actions
	new MakeMatch(),
	new Route()

]);