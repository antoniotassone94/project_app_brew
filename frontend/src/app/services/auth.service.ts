import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpRequestService} from "./httprequest.service";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  constructor(private httprequest:HttpRequestService){}

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
  }
}
