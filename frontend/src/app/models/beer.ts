export class Beer{
  private beerId:string;
  private brewingName:string;
  private ogValue:number;
  private fgValue:number;
  private alcohol:number;

  constructor(){
    this.beerId = "";
    this.brewingName = "";
    this.ogValue = 0;
    this.fgValue = 0;
    this.alcohol = 0;
  }

  public getBeerId():string{
    return this.beerId;
  }

  public setBeerId(beerId:string):void{
    this.beerId = beerId;
  }

  public getBrewingName():string{
    return this.brewingName;
  }

  public setBrewingName(brewingName:string):void{
    this.brewingName = brewingName;
  }

  public getOGvalue():number{
    return this.ogValue;
  }

  public setOGValue(ogValue:number):void{
    this.ogValue = ogValue;
  }

  public getFGvalue():number{
    return this.fgValue;
  }

  public setFGValue(fgValue:number):void{
    this.fgValue = fgValue;
  }

  public getAlcohol():number{
    return this.alcohol;
  }

  public setAlcohol(alcohol:number):void{
    this.alcohol = alcohol;
  }
}
