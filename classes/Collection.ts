export class Collection<T>{

	protected list:Array<T> = new Array;

	constructor(protected key:string, list:Array<T> = null){
		if(list && list.length > 0){
			for(let i in list){
				this.add(list[i]);
			}
		}
	}

	public add(new_item:T){
		this.list.push(new_item);
	}

	public remove(key:string){
		if(this.exists(key)){
			for(let i = 0; i < this.list.length; i++){
				if(this.list[i][this.key] == key){
					this.removeByIndex(i);
					return true;
				}
			}
		}

		return false;
	}
	
	public removeByObject(old_item:T){
		let index = this.findIndex(old_item);
		if(index !== null){
			this.list.splice(index, 1);
			return true;
		}else{
			return false;
		}
	}

	public findIndex(object:T):number{
		let index:number = null;
		for(let i = 0; i < this.length; i++){
			if(this.list[i] == object){
				index = i;
				break;
			}
		}

		return index;
	}

	public removeByIndex(index:number){
		if(this.list.length-1 <= index){
			this.list.splice(index, 1);
			return true;
		}else{
			return false;
		}
	}

	public foreach(iterator_function:any){
		if(typeof iterator_function == "function"){
			for(let i in this.list){
				if(iterator_function(this.list[i], i) === false) break;
			}
		}else{
			return false;
		}
	}

	public get(key:string):Array<T>{
		let rtn = new Array<T>();
		for(let i = 0; i < this.length; i++){
			if(this.list[i][this.key] == key) rtn.push(this.list[i])
		}

		return rtn.length > 0 ? rtn : null;
	}

	public getBy(key:any, term:any){

		let rtn = new Array<T>();

		for(let i = 0; i < this.list.length; i++){
			if(this.list[i][key] == term) rtn.push(this.list[i])
		}

		return rtn.length > 0 ? rtn : null;
	}

	public findBy(key:any, term:any){
		for(let i = 0; i < this.list.length; i++){
			if(this.list[i][key] == term) return this.list[i]
		}
		return null;
	}

	public getAll():Array<T>{
		return this.list;
	}

	/* TODO */
	/* Query object */
	public query(object:any):T{
		return null;
	}

	public find(key:string):T{
		for(let i in this.list){
			if(this.list[i][this.key] == key) return this.list[i]
		}

		return null;
	}

	public exists(key:any):boolean{
		return this.find(key) !=  null;
	}

	get length(){
		return this.list.length;
	}

	public toJson(){
		return JSON.stringify(this.list);
	}

	public toString(separator:string="\n"){
		let retn = "";
		for(let i in this.list){
			retn += this.list[i].toString() + separator;
		}

		return retn;
	}

	public clear():void{
		this.list = new Array<T>();
	}
}