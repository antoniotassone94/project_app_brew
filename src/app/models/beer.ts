export class Beer{
  constructor(
    private brewingName:string,
    private ogValue:number,
    private fgValue:number,
    private alcohol:number){}

  public getBrewingName():string{
    return this.brewingName;
  }

  public getOGvalue():number{
    return this.ogValue;
  }

  public getFGvalue():number{
    return this.fgValue;
  }

  public getAlcohol():number{
    return this.alcohol;
  }
}
