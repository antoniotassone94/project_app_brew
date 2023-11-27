import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css"
})

export class RegisterComponent implements OnInit{
  private message:string = "";

  constructor(private authService:AuthService){}

  public ngOnInit():void{}

  public getMessage():string{
    return this.message;
  }

  public doRegister(form:NgForm):void{
    if(form.valid){
      this.authService.registerRequest(form.value).subscribe({
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
