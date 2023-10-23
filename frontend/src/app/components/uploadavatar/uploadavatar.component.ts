import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-uploadavatar",
  templateUrl: "./uploadavatar.component.html",
  styleUrls: ["./uploadavatar.component.css"]
})
export class UploadavatarComponent implements OnInit{
  constructor(private httprequestService:HttprequestService){}

  public ngOnInit():void{}

  public uploadNow(form:NgForm):void{
    const values:any = form.value;
    const avatar:string = values.avatar;
    const dataObject:object = {accessToken:localStorage.getItem("accessToken"),avatar:avatar};
    this.httprequestService.httpPostRequest("http://localhost:4000/auth/uploadavatar",dataObject).subscribe({
      next: (response:any) => {
        console.log(response);
      },
      error: (error:HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
