import {Event} from "../classes/Event"
import {Observer} from "../classes/Observer"
import {Collection} from "../classes/Collection"

class testObserver extends Observer{

    public run(attachs:Collection<any>):void{
        console.log("Oh my gosh, this event is on fire!");
        console.log("Let me see the attachs...");
        console.log(attachs);
    }
}

let event = new Event("testEvent");
let observer = new testObserver();
event.register(observer);
event.attach("um", "Attach one");
event.attach("two", "Attach two");
event.attach("three", "Attach three");

event.notify();

/* Tests events on Main */
import {Events} from "../main/Events"
import {Observers} from "../main/Observers"

console.log("Well... Let's test the main Events register")
console.log(Events.find("ballHasFired"))

Observers.foreach((obj:any, index:any) => {
	if(Events.exists(obj.event)){
		let event = Events.find(obj.event);
		for(let ob in obj.observers){
			console.log("Registering observer:", (new obj.observers[ob]).constructor.name)
			event.register(new obj.observers[ob]());
		}
	}
})