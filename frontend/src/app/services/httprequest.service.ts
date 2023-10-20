import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class HttprequestService {
  constructor(private httpClient:HttpClient){}

  public httpPostRequest(url:string,body:object):Observable<any>{
    return this.httpClient.post(url,body);
  }
}
