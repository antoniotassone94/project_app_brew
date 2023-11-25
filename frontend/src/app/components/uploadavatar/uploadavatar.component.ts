import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DialogManagerService} from "../../services/dialogmanager.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {UpdateAvatarImageService} from "../../services/updateavatarimage.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-uploadavatar",
  templateUrl: "./uploadavatar.component.html",
  styleUrl: "./uploadavatar.component.css"
})

export class UploadAvatarComponent implements OnInit{
  private selectedFile:File|null = null;

  constructor(private authService:AuthService,private httprequestService:HttpRequestService,private router:Router,private updateImage:UpdateAvatarImageService,private dialogmanager:DialogManagerService){}

  public ngOnInit():void{}

  public updateFileSelected(event:any):void{
    this.selectedFile = event.target.files[0];
  }

  public uploadNow():void{
    if(this.selectedFile){
      const dataObject:FormData = new FormData();
      dataObject.append("avatar",this.selectedFile);
      dataObject.append("accessToken",<string>localStorage.getItem("accessToken"));
      this.httprequestService.httpPostRequest(environment.serverUrl + "auth/uploadavatar",dataObject).subscribe({
        next: (response:any) => {
          this.dialogmanager.openDialog(response.message);
          this.updateImage.setUrlAvatar(response.filename);
        },
        error: (error:HttpErrorResponse) => {
          const errorCode:number = error.status;
          if(errorCode === 401 || errorCode === 403){
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
            this.router.navigate([""]);
          }else{
            this.dialogmanager.openDialog(error.error.message);
          }
        }
      });
    }else{
      this.dialogmanager.openDialog("There isn't any file selected.");
    }
  }
}
