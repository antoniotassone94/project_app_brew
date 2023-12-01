import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css"
})

export class LoginComponent implements OnInit{
  private _errorMessage:string;
  private authService:AuthService;

  constructor(private router:Router){
    this._errorMessage = "";
    this.authService = inject(AuthService);
  }

  public get errorMessage():string{
    return this._errorMessage;
  }

  public ngOnInit():void{}

  public doLogin(form:NgForm):void{
    if(form.valid){
      this.authService.loginRequest(form.value).subscribe({
        next:(response:object) => {
          if(this.authService.setLogged(response)){
            this.router.navigate(["dashboard"]);
          }else{
            this._errorMessage = "User login error.";
          }
        },
        error:(error:HttpErrorResponse) => {
          this._errorMessage = error.statusText + " (" + error.status + "): User login error.";
        }
      });
    }
  }
}
