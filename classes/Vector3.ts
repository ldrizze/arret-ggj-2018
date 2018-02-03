export class Vector3{

    constructor(
        protected _x : number = 0.0,
        protected _y : number = 0.0,
        protected _z : number = 0.0
    ){
        
    }
    public add(vec:Vector3):Vector3;
    public add(x:number, y:number, z:number):Vector3;

    public add(vecOrX:any, y?:number, z?:number):Vector3{
        if(vecOrX instanceof Vector3){
            this._x += vecOrX.x;
            this._y += vecOrX.y;
            this._z += vecOrX.z;
        }else{
            this._x += vecOrX;
            this._y += y;
            this._z += z;
        }
        return this;
    }

    public static add(vec:Vector3, vec2:Vector3):Vector3{
        return vec.add(vec2);
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    get z(){
        return this._z;
    }
    
}