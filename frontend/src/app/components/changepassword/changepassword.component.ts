import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.css"]
})

export class ChangepasswordComponent implements OnInit{
  private message:string = "";

  constructor(private httprequestService:HttprequestService){}

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
          console.log(response);
        },
        error: (error:HttpErrorResponse) => {
          console.error(error);
        }
      });
    }
  }
}
