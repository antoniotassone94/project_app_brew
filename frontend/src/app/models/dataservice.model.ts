import {Beer} from "./beer.model";

export class DataService{
  private _beer:Beer;
  private _message:string;
  private _check:boolean;

  constructor(){
    this._beer = new Beer();
    this._message = "";
    this._check = false;
  }

  public get beer():Beer{
    return this._beer;
  }

  public set beer(beer:Beer){
    this._beer = beer;
  }

  public get message():string{
    return this._message;
  }

  public set message(message:string){
    this._message = message;
  }

  public get check():boolean{
    return this._check;
  }

  public set check(check:boolean){
    this._check = check;
  }
}
