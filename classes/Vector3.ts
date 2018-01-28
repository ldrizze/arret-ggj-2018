export class Vector3{

    constructor(
        protected x : number = 0.0,
        protected y : number = 0.0,
        protected z : number = 0.0
    ){
        
    }
    public add(vec:Vector3):Vector3;
    public add(x:number, y:number, z:number):Vector3;

    public add(vecOrX:any, y?:number, z?:number):Vector3{
        if(vecOrX instanceof Vector3){
            this.x += vecOrX.x;
            this.y += vecOrX.y;
            this.z += vecOrX.z;
        }else{
            this.x += vecOrX;
            this.y += y;
            this.z += z;
        }
        return this;
    }

    public static add(vec:Vector3, vec2:Vector3):Vector3{
        return vec.add(vec2);
    }
    
}