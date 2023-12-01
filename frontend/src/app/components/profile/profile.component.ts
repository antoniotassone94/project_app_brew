import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit,inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css"
})

export class ProfileComponent implements OnInit{
  private _name:string;
  private _email:string;
  private authService:AuthService;
  private httprequestService:HttpRequestService;

  constructor(){
    this._name = "";
    this._email = "";
    this.authService = inject(AuthService);
    this.httprequestService = inject(HttpRequestService);
  }

  public get name():string{
    return this._name;
  }

  public get email():string{
    return this._email;
  }

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/user",dataObject).subscribe({
      next: (response:any) => {
        this._name = response.name;
        this._email = response.email;
      },
      error: (error:HttpErrorResponse) => {
        const errorMessage:string = error.statusText + " (" + error.status + ")";
        console.error(errorMessage);
        this.authService.logout();
      }
    });
  }

  public deleteProfile():void{
    this.httprequestService.httpDeleteRequest(environment.serverUrl + "auth/user",{accessToken:localStorage.getItem("accessToken")}).subscribe({
      next: (response:any) => {
        console.log(response);
      },
      error: (error:HttpErrorResponse) => {
        console.error(error);
      }
    });
  }
}
