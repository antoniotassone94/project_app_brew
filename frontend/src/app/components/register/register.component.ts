import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css"
})

export class RegisterComponent implements OnInit{
  private _message:string;
  private authService:AuthService;

  constructor(){
    this._message = "";
    this.authService = inject(AuthService);
  }

  public ngOnInit():void{}

  public get message():string{
    return this._message;
  }

  public doRegister(form:NgForm):void{
    if(form.valid){
      this.authService.registerRequest(form.value).subscribe({
        next:(response:any) => {
          this._message = response.message;
        },
        error:(error:HttpErrorResponse) => {
          this._message = error.statusText + " (" + error.status + "): User registration error.";
        }
      });
    }
  }
}
