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
  constructor(private authService:AuthService,private router:Router){}

  public ngOnInit():void{}

  public doLogin(form:NgForm):void{
    const values:any = form.value;
    const email:string = values.email;
    const password:string = values.password;
    const dataObject:object = {email:email,password:password};
    this.authService.loginRequest(dataObject).subscribe(result => {
      if(this.authService.setLogged(result)){
        this.router.navigate(["dashboard"]);
      }else{
        console.log("authentication error");
      }
    });
  }
}
