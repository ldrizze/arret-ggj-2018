export class Timer{
    private started_at:Date;
    private ms:number;
    private steps:number;
    
    public start(){
    	this.started_at = new Date();
    }

    public pause(){

    }

    public reset(){
    	this.started_at = null;
    }

    get time():number{
    	let now = new Date();
    	return now.getTime() - this.started_at.getTime();
    }
}