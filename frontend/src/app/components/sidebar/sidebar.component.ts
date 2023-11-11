import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {DialogManagerService} from "src/app/services/dialogmanager.service";
import {HttpRequestService} from "src/app/services/httprequest.service";
import {UpdateAvatarImageService} from "src/app/services/updateavatarimage.service";
import {environment} from "src/environments/environment";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})

export class SidebarComponent implements OnInit{
  private nameSidebar:string = "";
  private urlAvatar:string = "assets/images/avatar.jpg";

  constructor(private authService:AuthService,private httprequestService:HttpRequestService,private router:Router,private updateImage:UpdateAvatarImageService,private dialogmanager:DialogManagerService){}

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/user",dataObject).subscribe({
      next: (response:any) => {
        this.nameSidebar = response.name;
      },
      error: (error:HttpErrorResponse) => {
        const errorMessage:string = error.statusText + " (" + error.status + ")";
        console.error(errorMessage);
        this.doLogout();
      }
    });
    this.updateImage.getUrlAvatar().subscribe({
      next: (value:string) => {
        this.urlAvatar = value;
      }
    });
  }

  public getNameSidebar():string{
    return this.nameSidebar;
  }

  public getUrlAvatar():string{
    return this.urlAvatar;
  }

  public doLogout():void{
    this.authService.logout();
    this.router.navigate([""]);
  }

  public deleteAvatar():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/deleteavatar",dataObject).subscribe({
      next: (response:any) => {
        this.urlAvatar = "assets/images/avatar.jpg";
        this.dialogmanager.openDialog(response.message);
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
  }
}
