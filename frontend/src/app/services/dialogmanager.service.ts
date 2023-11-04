import {Injectable} from "@angular/core";
import {MatDialog,MatDialogRef} from "@angular/material/dialog";
import {MessageType} from "../models/servermessage";
import {ModalMessageComponent} from "../components/modalmessage/modalmessage.component";
import {ModalFormComponent} from "../components/modalform/modalform.component";
import {Beer} from "../models/beer";

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

  public openForm(beerToUpdate:Beer):void{
    this.dialog.open(ModalFormComponent,{
      data:beerToUpdate
    });
  }

  public closeForm():void{
    this.dialog.closeAll();
  }
}
