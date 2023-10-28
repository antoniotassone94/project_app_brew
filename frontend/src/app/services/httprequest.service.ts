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

  public httpPutRequest(url:string,body:object):Observable<any>{
    return this.httpClient.put(url,body);
  }

  public httpDeleteRequest(url:string,body:object):Observable<any>{
    return this.httpClient.delete(url,{body:body});
  }

  public httpPatchRequest(url:string,body:object):Observable<any>{
    return this.httpClient.patch(url,body);
  }
}
