import {HttpErrorResponse} from "@angular/common/http";
import {Injectable,inject} from "@angular/core";
import {BehaviorSubject,Observable} from "rxjs";
import {HttpRequestService} from "./httprequest.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})

export class UpdateAvatarImageService{
  private urlAvatar:BehaviorSubject<string>;
  private urlObservable:Observable<string>;
  private httprequestService:HttpRequestService;

  constructor(){
    this.urlAvatar = new BehaviorSubject<string>("assets/images/avatar.jpg"); //url dell'avatar di default
    this.urlObservable = this.urlAvatar.asObservable();
    this.httprequestService = inject(HttpRequestService);
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "auth/user",dataObject).subscribe({
      next: (response:any) => {
        if(response.avatar != ""){ //cambio l'url solo se l'avatar è impostato dall'utente
          const filename:string = response.avatar;
          this.urlAvatar.next(environment.serverUrl + "auth/avatar/" + filename);
        }
      },
      error: (error:HttpErrorResponse) => {
        //in caso di errore lo stampo in console e imposto l'url dell'avatar di default
        const errorMessage:string = error.statusText + " (" + error.status + ")";
        console.error(errorMessage);
        this.urlAvatar.next("assets/images/avatar.jpg");
      }
    });
  }

  public getUrlAvatar():Observable<string>{
    return this.urlObservable;
  }

  public setUrlAvatar(filename:string):void{
    this.urlAvatar.next(environment.serverUrl + "auth/avatar/" + filename);
  }
}
