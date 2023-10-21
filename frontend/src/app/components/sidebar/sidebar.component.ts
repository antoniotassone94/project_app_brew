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
  private username:string = "";

  constructor(private authService:AuthService,private httprequestService:HttprequestService,private router:Router){}

  public ngOnInit():void{
    this.httprequestService.httpPostRequest("http://localhost:4000/auth/user",{accessToken:localStorage.getItem("accessToken")}).subscribe({
      next: (response:any) => {
        this.username = response.email;
      },
      error: (error:HttpErrorResponse) => {
        this.username = error.statusText + " (" + error.status + ")";
      }
    });
  }

  public getUsername():string{
    return this.username;
  }

  public doLogout():void{
    this.authService.logout();
    this.router.navigate([""]);
  }
}
