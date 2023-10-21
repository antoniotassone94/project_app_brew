import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit{
  private errorMessage:string = "";

  constructor(private authService:AuthService,private router:Router){}

  public ngOnInit():void{}

  public getErrorMessage():string{
    return this.errorMessage;
  }

  public doLogin(form:NgForm):void{
    const values:any = form.value;
    const email:string = values.email;
    const password:string = values.password;
    if(email != "" && password != ""){
      const dataObject:object = {email:email,password:password};
      this.authService.loginRequest(dataObject).subscribe({
        next:(response:object) => {
          if(this.authService.setLogged(response)){
            this.router.navigate(["dashboard"]);
          }else{
            this.errorMessage = "User login error.";
          }
        },
        error:(error:HttpErrorResponse) => {
          this.errorMessage = error.statusText + " (" + error.status + "): User login error.";
        }
      });
    }
  }
}
