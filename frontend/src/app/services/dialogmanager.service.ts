import {Injectable} from "@angular/core";
import {MatDialog,MatDialogRef} from "@angular/material/dialog";
import {MessageType} from "../models/servermessage";
import {ModalMessageComponent} from "../components/modalmessage/modalmessage.component";

@Injectable({
  providedIn:"root"
})

export class DialogManagerService{
  constructor(private dialog:MatDialog){}

  public openDialog(messageToPrint:string):void{
    const message:MessageType = new MessageType();
    message.setIdMessage(new Date().getTime());
    message.setTextMessage(messageToPrint);
    this.dialog.open(ModalMessageComponent,{
      data:message
    });
  }
}
