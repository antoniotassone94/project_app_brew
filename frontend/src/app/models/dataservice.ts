import {Beer} from "./beer";

export class DataService{
  private beer:Beer;
  private message:string;
  private check:boolean;

  constructor(){
    this.beer = new Beer();
    this.message = "";
    this.check = false;
  }

  public getBeer():Beer{
    return this.beer;
  }

  public setBeer(beer:Beer):void{
    this.beer = beer;
  }

  public getMessage():string{
    return this.message;
  }

  public setMessage(message:string):void{
    this.message = message;
  }

  public getCheck():boolean{
    return this.check;
  }

  public setCheck(check:boolean):void{
    this.check = check;
  }
}
