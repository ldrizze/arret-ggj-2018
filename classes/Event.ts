import {Observer} from "./Observer";
import {Collection} from "./Collection"

/**
 * @class
 * Classe principal para eventos.
 * Ela deve ser utilizada para gerar eventos na aplicacao, registrando Observers
 * e notificando os mesmos atraves do metodo notify()
 * 
 * @param eventname {string} Nome do evento (para ser manipulado em EventManager)
 * 
 * @example BallHasFiredEvent = new Event('ballhasfire')
 * @example BallHasFiredEvent.attach('playerthathasfired', player)
 * @example BallHasFiredEvent.notify()
 */
export class Event{

    protected observers:Collection<Observer> = new Collection('none');
    protected attachs:Collection<any> = new Collection('key');
    protected eventname:string;

    constructor(eventname:string){ 
        this.eventname = eventname;
    }
    
    /**
     * Registra os Observers no evento
     * @param ob Observer
     * @return Event this O proprio evento
     */
    public register(ob:Observer):Event{
        ob.__setEvent(this);
        this.observers.add(ob);
        return this;
    }
    
    /**
     * Notifica os Observers
     * @return void
     */
    public notify():void{
        this.observers.foreach(this.it.bind(this));
    }

    /**
     * Anexa algum valor (any) no evento, para obte-lo quando disparar o notify
     * @param key {string} Nome do anexo (para a funcao pega-lo no notify)
     * @param item {any} O item que sera anexado
     */
    public attach(key:string, item:any):this{
        this.attachs.add({
            'key': key,
            'item' : item
        });
        
        return this;
    }

    /**
     * Iterador do notify
     * @param element Observer
     * @param index Indice
     * @return void
     */
    protected it(element:Observer, index:any):void{
        element.run(this.attachs);
        this.attachs.clear();
    }

    get name(){
        return this.eventname;
    }
}