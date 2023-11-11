import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {HttpRequestService} from "src/app/services/httprequest.service";
import {environment} from "src/environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})

export class ProfileComponent implements OnInit{
  private name:string = "";
  private email:string = "";

  constructor(private authService:AuthService,private httprequestService:HttpRequestService,private router:Router){}

  public getName():string{
    return this.name;
  }

  public getEmail():string{
    return this.email;
  }

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/user",dataObject).subscribe({
      next: (response:any) => {
        this.name = response.name;
        this.email = response.email;
      },
      error: (error:HttpErrorResponse) => {
        const errorMessage:string = error.statusText + " (" + error.status + ")";
        console.error(errorMessage);
        this.authService.logout();
        this.router.navigate([""]);
      }
    });
  }
}
