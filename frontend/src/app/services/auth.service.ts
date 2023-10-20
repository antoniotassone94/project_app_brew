import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttprequestService} from "./httprequest.service";

@Injectable({
  providedIn: "root"
})

export class AuthService {
  constructor(private httprequest:HttprequestService){}

  public loginRequest(body:object):Observable<any>{
    return this.httprequest.httpPostRequest("http://localhost:4000/auth/login",body);
  }

  public registerRequest(body:object):Observable<any>{
    return this.httprequest.httpPostRequest("http://localhost:4000/auth/register",body);
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
