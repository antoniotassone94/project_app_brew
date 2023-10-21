import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import { HttprequestService } from "src/app/services/httprequest.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})

export class SidebarComponent implements OnInit{
  constructor(private authService:AuthService,private httprequestService:HttprequestService,private router:Router){}

  public ngOnInit():void{
    this.httprequestService.httpPostRequest("http://localhost:4000/auth/user",{accessToken:localStorage.getItem("accessToken")}).subscribe({
      next: (response:any) => {
        console.log(response);
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }

  public doLogout():void{
    this.authService.logout();
    this.router.navigate([""]);
  }
}
