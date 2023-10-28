import {HttpErrorResponse} from "@angular/common/http";
import {Component,EventEmitter,Input,OnInit,Output} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "src/app/services/auth.service";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})

export class CardComponent implements OnInit{
  @Input() beerId:string = "";
  @Input() brewingName:string = "";
  @Input() ogValue:number = 0;
  @Input() fgValue:number = 0;
  @Input() alcohol:number = 0;
  @Output() message:EventEmitter<string> = new EventEmitter<string>();
  @Output() checkDelete:EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService:AuthService,private router:Router,private httprequest:HttprequestService){}

  public ngOnInit():void{}

  public updateBeer():void{}

  public deleteBeer():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequest.httpDeleteRequest("http://localhost:4000/app/delete/" + this.beerId,dataObject).subscribe({
      next: (response:any) => {
        this.message.emit(response.message);
        this.checkDelete.emit(true);
      },
      error: (error:HttpErrorResponse) => {
        if(error.status == 401 || error.status == 403){
          const errorMessage:string = error.statusText + " (" + error.status + ")";
          console.error(errorMessage);
          this.authService.logout();
          this.router.navigate([""]);
        }else{
          const errorMessage:string = error.statusText + " (" + error.status + ")";
          console.error(errorMessage);
          this.message.emit(error.error.message);
          this.checkDelete.emit(false);
        }
      }
    });
  }
}
