import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit{
  constructor(){}

  public ngOnInit():void{}

  public doLogin(form:NgForm):void{
    const values:any = form.value;
    const email:string = values.email;
    const password:string = values.password;
    console.log(email,password);
  }
}
