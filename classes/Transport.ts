import {Collection} from "./Collection"

export class Transport{

    constructor(protected _transport_data:Collection<any>){

    }

    public updateData(data:Collection<any>){
        this._transport_data = data;
    }

    public prepare(){

    }

    private compress(){

    }
}