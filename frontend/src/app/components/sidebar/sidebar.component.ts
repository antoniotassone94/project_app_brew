import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})

export class SidebarComponent implements OnInit{
  private nameSidebar:string = "";

  constructor(private authService:AuthService,private httprequestService:HttprequestService,private router:Router){}

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest("http://localhost:4000/auth/user",dataObject).subscribe({
      next: (response:any) => {
        this.nameSidebar = response.name;
      },
      error: (error:HttpErrorResponse) => {
        const errorMessage:string = error.statusText + " (" + error.status + ")";
        console.error(errorMessage);
        this.doLogout();
      }
    });
  }

  public getNameSidebar():string{
    return this.nameSidebar;
  }

  public doLogout():void{
    this.authService.logout();
    this.router.navigate([""]);
  }
}
