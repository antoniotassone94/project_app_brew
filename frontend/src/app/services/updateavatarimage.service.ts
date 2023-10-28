import {HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject,Observable} from "rxjs";
import {HttprequestService} from "./httprequest.service";

@Injectable({
  providedIn:"root"
})

export class UpdateavatarimageService{
  private urlAvatar:BehaviorSubject<string> = new BehaviorSubject<string>("assets/images/avatar.jpg"); //url dell'avatar di default
  private urlObservable:Observable<string> = this.urlAvatar.asObservable();

  constructor(private httprequestService:HttprequestService){
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest("http://localhost:4000/auth/user",dataObject).subscribe({
      next: (response:any) => {
        if(response.avatar != ""){ //cambio l'url solo se l'avatar è impostato dall'utente
          const filename:string = response.avatar;
          this.urlAvatar.next("http://localhost:4000/auth/avatar/" + filename);
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
    this.urlAvatar.next("http://localhost:4000/auth/avatar/" + filename);
  }
}