import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"]
})

export class ChangepasswordComponent implements OnInit{
  private message:string = "";

  constructor(private authService:AuthService,private httprequestService:HttprequestService,private router:Router){}

  public getMessage():string{
    return this.message;
  }

  public ngOnInit():void{}

  public changePassword(form:NgForm):void{
    const values:any = form.value;
    const newPassword:string = values.newPassword;
    const repeatPassword:string = values.repeatPassword;
    if(newPassword != "" && repeatPassword != "" && newPassword == repeatPassword){
      const dataObject:object = {accessToken:localStorage.getItem("accessToken"),newPassword:newPassword,repeatPassword:repeatPassword};
      this.httprequestService.httpPostRequest("http://localhost:4000/auth/changepassword",dataObject).subscribe({
        next: (response:any) => {
          this.message = response.message;
        },
        error: (error:HttpErrorResponse) => {
          const errorCode:number = error.status;
          if(errorCode == 401 || errorCode == 403){
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
            this.router.navigate([""]);
          }else{
            this.message = error.error.message;
          }
        }
      });
    }
  }
}
