import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit{
  constructor(private authService:AuthService){}

  public ngOnInit():void{}

  public doRegister(form:NgForm):void{
    const values:any = form.value;
    const name:string = values.name;
    const email:string = values.email;
    const password:string = values.password;
    const dataObject:object = {name:name,email:email,password:password};
    this.authService.registerRequest(dataObject).subscribe(result => {
      console.log(result);
    });
  }
}
