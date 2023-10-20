import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit{
  constructor(){}

  public ngOnInit():void{}

  public doRegister(form:NgForm):void{
    const values:any = form.value;
    const name:string = values.name;
    const email:string = values.email;
    const password:string = values.password;
    console.log(name,email,password);
  }
}
