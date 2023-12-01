export class Beer{
    private _beerId:string;
    private _brewingName:string;
    private _ogValue:number;
    private _fgValue:number;
    private _alcohol:number;
  
    constructor(){
      this._beerId = "";
      this._brewingName = "";
      this._ogValue = 0;
      this._fgValue = 0;
      this._alcohol = 0;
    }
  
    public get beerId():string{
      return this._beerId;
    }
  
    public set beerId(beerId:string){
      this._beerId = beerId;
    }
  
    public get brewingName():string{
      return this._brewingName;
    }
  
    public set brewingName(brewingName:string){
      this._brewingName = brewingName;
    }
  
    public get ogValue():number{
      return this._ogValue;
    }
  
    public set ogValue(ogValue:number){
      this._ogValue = ogValue;
    }
  
    public get fgValue():number{
      return this._fgValue;
    }
  
    public set fgValue(fgValue:number){
      this._fgValue = fgValue;
    }
  
    public get alcohol():number{
      return this._alcohol;
    }
  
    public set alcohol(alcohol:number){
      this._alcohol = alcohol;
    }
  }
