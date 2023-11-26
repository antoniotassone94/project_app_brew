import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpRequestService} from "./httprequest.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  constructor(private httprequest:HttpRequestService,private router:Router){}

  public loginRequest(body:object):Observable<any>{
    return this.httprequest.httpPostRequest(environment.serverUrl + "auth/login",body);
  }

  public registerRequest(body:object):Observable<any>{
    return this.httprequest.httpPostRequest(environment.serverUrl + "auth/register",body);
  }

  public isLogged():boolean{
    return localStorage.getItem("accessToken") != null;
  }

  public setLogged(result:any):boolean{
    localStorage.setItem("accessToken",result.accessToken);
    return true;
  }

  public logout():void{
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }
}
