import {Collection} from "../classes/Collection"

export let Services = new Collection<Object>("name");

export class ServiceDecorators{
	public static service(services:Array<string> = null){
		return function(constructor:Function){
			for(let s in services){
				let the_service = services[s];

				if(Services.exists(the_service)){
					constructor.prototype[the_service] = Services.find(the_service)['obj'];
				}
			}
		}
	}
}