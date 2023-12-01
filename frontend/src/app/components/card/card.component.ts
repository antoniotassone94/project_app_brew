import {HttpErrorResponse} from "@angular/common/http";
import {Component,EventEmitter,Input,OnInit,Output,inject} from "@angular/core";
import {Beer} from "../../models/beer.model";
import {AuthService} from "../../services/auth.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.css"
})

export class CardComponent implements OnInit{
  @Input() beer:Beer = new Beer();
  @Output() message:EventEmitter<string>;
  @Output() checkDelete:EventEmitter<boolean>;
  @Output() seeUpdate:EventEmitter<Beer>;
  private authService:AuthService;
  private httprequest:HttpRequestService;

  constructor(){
    this.message = new EventEmitter<string>();
    this.checkDelete = new EventEmitter<boolean>();
    this.seeUpdate = new EventEmitter<Beer>();
    this.authService = inject(AuthService);
    this.httprequest = inject(HttpRequestService);
  }

  public ngOnInit():void{}

  public updateBeer():void{
    this.seeUpdate.emit(this.beer);
  }

  public deleteBeer():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequest.httpDeleteRequest(environment.serverUrl + "app/delete/" + this.beer.beerId,dataObject).subscribe({
      next: (response:any) => {
        this.message.emit(response.message);
        this.checkDelete.emit(true);
      },
      error: (error:HttpErrorResponse) => {
        if(error.status === 401 || error.status === 403){
          const errorMessage:string = error.statusText + " (" + error.status + ")";
          console.error(errorMessage);
          this.authService.logout();
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
