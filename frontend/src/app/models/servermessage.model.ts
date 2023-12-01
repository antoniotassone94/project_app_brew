export class MessageType{
    private _idMessage:number;
    private _textMessage:string;
  
    constructor(){
      this._idMessage = 0;
      this._textMessage = "";
    }
  
    public get idMessage():number{
      return this._idMessage;
    }
  
    public set idMessage(idMessage:number){
      this._idMessage = idMessage;
    }
  
    public get textMessage():string{
      return this._textMessage;
    }
  
    public set textMessage(textMessage:string){
      this._textMessage = textMessage;
    }
  }
