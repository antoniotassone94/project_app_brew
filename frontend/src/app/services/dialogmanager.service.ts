import {Injectable,inject} from "@angular/core";
import {MatDialog,MatDialogRef} from "@angular/material/dialog";
import {MessageType} from "../models/servermessage.model";
import {ModalMessageComponent} from "../components/modalmessage/modalmessage.component";
import {ModalFormComponent} from "../components/modalform/modalform.component";
import {Beer} from "../models/beer.model";

@Injectable({
  providedIn:"root"
})

export class DialogManagerService{
  private dialog:MatDialog;

  constructor(){
    this.dialog = inject(MatDialog);
  }

  public openDialog(messageToPrint:string):void{
    if(messageToPrint && messageToPrint !== ""){
      const message:MessageType = new MessageType();
      message.idMessage = new Date().getTime();
      message.textMessage = messageToPrint;
      this.dialog.open(ModalMessageComponent,{
        data:message
      });
    }
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
