import {ServiceDecorators, Services} from "../classes/Services"
import {Action} from "../classes/Action"
import {Payload} from "../classes/Payload"

/* Register services */
Services.add({name: "String", obj: "HUEBR"})

/* Test the decorator */
@ServiceDecorators.service(["String"])
class TestServices extends Action{

	/* Services variables */
	public String:any;

	public key:string = "testServices";
	
    public run(payload:Payload):Payload{
    	return null;
    }

    public test(){
    	console.log(this.String);
    }
}

let act = new TestServices();
act.test();