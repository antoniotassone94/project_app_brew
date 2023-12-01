import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {DialogManagerService} from "../../services/dialogmanager.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrl: "./changepassword.component.css"
})

export class ChangePasswordComponent implements OnInit{
  private authService:AuthService;
  private httprequestService:HttpRequestService;
  private dialogmanager:DialogManagerService;

  constructor(){
    this.authService = inject(AuthService);
    this.httprequestService = inject(HttpRequestService);
    this.dialogmanager = inject(DialogManagerService);
  }

  public ngOnInit():void{}

  public changePassword(form:NgForm):void{
    if(form.valid && form.value.newPassword === form.value.repeatPassword){
      const dataObject:object = {accessToken:localStorage.getItem("accessToken"),newPassword:form.value.newPassword,repeatPassword:form.value.repeatPassword};
      this.httprequestService.httpPostRequest(environment.serverUrl + "auth/changepassword",dataObject).subscribe({
        next: (response:any) => {
          this.dialogmanager.openDialog(response.message);
        },
        error: (error:HttpErrorResponse) => {
          const errorCode:number = error.status;
          if(errorCode === 401 || errorCode === 403){
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
          }else{
            this.dialogmanager.openDialog(error.error.message);
          }
        }
      });
    }else{
      this.dialogmanager.openDialog("Some fields of the form isn't compiled correctly.");
    }
  }
}
