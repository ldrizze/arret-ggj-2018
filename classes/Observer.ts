import {Collection} from "./Collection"
import {Event} from "./Event"

/**
 * @class
 * Classe que será notificada quando um evento acontecer.
 * A instância dessa classe deverá ser registrada em um Event, caso contrário ela não terá utilidade.
 */
export abstract class Observer{
    public abstract run(attachs:Collection<any>):void;
    protected event:Event;

    public __setEvent(event:Event){
        this.event = event;
    }
}