import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"]
})

export class ChangepasswordComponent implements OnInit{
  constructor(){}

  public ngOnInit():void{}

  public changePassword(form:NgForm):void{
    const values:any = form.value;
    const newPassword:string = values.newPassword;
    const repeatPassword:string = values.repeatPassword;
    if(newPassword != "" && repeatPassword != ""){
      console.log(newPassword,repeatPassword);
    }
  }
}
