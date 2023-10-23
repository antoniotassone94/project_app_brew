import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-uploadavatar",
  templateUrl: "./uploadavatar.component.html",
  styleUrls: ["./uploadavatar.component.css"]
})

export class UploadavatarComponent implements OnInit{
  private selectedFile:File|null = null;
  private message:string = "";

  constructor(private authService:AuthService,private httprequestService:HttprequestService,private router:Router){}

  public ngOnInit():void{}

  public getMessage():string{
    return this.message;
  }

  public updateFileSelected(event:any):void{
    this.selectedFile = event.target.files[0];

    //stampa dell'oggetto file in console (istruzione provvisoria)
    console.log(this.selectedFile);

  }

  public uploadNow(form:NgForm):void{
    if(this.selectedFile){
      const dataObject:FormData = new FormData();
      dataObject.append("avatar",this.selectedFile);
      dataObject.append("accessToken",<string>localStorage.getItem("accessToken"));
      this.httprequestService.httpPostRequest("http://localhost:4000/auth/uploadavatar",dataObject).subscribe({
        next: (response:any) => {

          //stampa della risposta del server in console (istruzione provvisoria)
          console.log(response);

        },
        error: (error:HttpErrorResponse) => {
          const errorCode:number = error.status;
          if(errorCode == 401 || errorCode == 403){
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
            this.router.navigate([""]);
          }else{
            this.message = error.error.message;
          }
        }
      });
    }else{
      this.message = "There isn't any file selected.";
    }
  }
}