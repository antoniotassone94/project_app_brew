import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit{
  private message:string = "";

  constructor(private authService:AuthService){}

  public ngOnInit():void{}

  public getMessage():string{
    return this.message;
  }

  public doRegister(form:NgForm):void{
    const values:any = form.value;
    const name:string = values.name;
    const email:string = values.email;
    const password:string = values.password;
    if(name != "" && email != "" && password != ""){
      const dataObject:object = {name:name,email:email,password:password};
      this.authService.registerRequest(dataObject).subscribe({
        next:(response:any) => {
          this.message = response.message;
        },
        error:(error:HttpErrorResponse) => {
          this.message = error.statusText + " (" + error.status + "): User registration error.";
        }
      });
    }
  }
}
