import {Component,Inject,OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageType} from "src/app/models/servermessage";

@Component({
  selector: "app-modalmessage",
  templateUrl: "./modalmessage.component.html",
  styleUrls: ["./modalmessage.component.css"]
})

export class ModalmessageComponent implements OnInit{
  private message:MessageType;

  constructor(private dialog:MatDialogRef<ModalmessageComponent>,@Inject(MAT_DIALOG_DATA) data:MessageType){
    this.message = data;
  }

  public ngOnInit():void{}

  public closeMessage():void{
    this.dialog.close(this.message);
  }

  public getMessage():string{
    return this.message.getTextMessage();
  }
}
