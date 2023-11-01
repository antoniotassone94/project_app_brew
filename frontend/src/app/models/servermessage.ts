export class MessageType{
  private idMessage:number;
  private textMessage:string;

  constructor(){
    this.idMessage = 0;
    this.textMessage = "";
  }

  public getIdMessage():number{
    return this.idMessage;
  }

  public setIdMessage(idMessage:number):void{
    this.idMessage = idMessage;
  }

  public getTextMessage():string{
    return this.textMessage;
  }

  public setTextMessage(textMessage:string):void{
    this.textMessage = textMessage;
  }
}
