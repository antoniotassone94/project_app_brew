import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit,inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {DialogManagerService} from "../../services/dialogmanager.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {UpdateAvatarImageService} from "../../services/updateavatarimage.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css"
})

export class SidebarComponent implements OnInit{
  private _nameSidebar:string;
  private _urlAvatar:string;
  private authService:AuthService;
  private httprequestService:HttpRequestService;
  private updateImage:UpdateAvatarImageService;
  private dialogmanager:DialogManagerService;

  constructor(){
    this._nameSidebar = "";
    this._urlAvatar = "assets/images/avatar.jpg";
    this.authService = inject(AuthService);
    this.httprequestService = inject(HttpRequestService);
    this.updateImage = inject(UpdateAvatarImageService);
    this.dialogmanager = inject(DialogManagerService);
  }

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/user",dataObject).subscribe({
      next: (response:any) => {
        this._nameSidebar = response.name;
      },
      error: (error:HttpErrorResponse) => {
        const errorMessage:string = error.statusText + " (" + error.status + ")";
        console.error(errorMessage);
        this.doLogout();
      }
    });
    this.updateImage.getUrlAvatar().subscribe({
      next: (value:string) => {
        this._urlAvatar = value;
      }
    });
  }

  public get nameSidebar():string{
    return this._nameSidebar;
  }

  public get urlAvatar():string{
    return this._urlAvatar;
  }

  public doLogout():void{
    this.authService.logout();
  }

  public deleteAvatar():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/deleteavatar",dataObject).subscribe({
      next: (response:any) => {
        this._urlAvatar = "assets/images/avatar.jpg";
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
  }
}
