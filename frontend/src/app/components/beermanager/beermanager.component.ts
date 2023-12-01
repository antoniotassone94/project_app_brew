import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit,inject} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Beer} from "../../models/beer.model";
import {AuthService} from "../../services/auth.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {DialogManagerService} from "../../services/dialogmanager.service";
import {UpdateCardChangedService} from "../../services/updatecardchanged.service";
import {DataService} from "../../models/dataservice.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-beermanager",
  templateUrl: "./beermanager.component.html",
  styleUrl: "./beermanager.component.css"
})

export class BeerManagerComponent implements OnInit{
  private _beersList:Beer[];
  private httprequestService:HttpRequestService;
  private authService:AuthService;
  private dialogManagerService:DialogManagerService;
  private updatecard:UpdateCardChangedService;

  constructor(){
    this._beersList = [];
    this.httprequestService = inject(HttpRequestService);
    this.authService = inject(AuthService);
    this.dialogManagerService = inject(DialogManagerService);
    this.updatecard = inject(UpdateCardChangedService);
  }

  public get beersList():Beer[]{
    return this._beersList;
  }

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "app/getAll",dataObject).subscribe({
      next: (response:any) => {
        const listBeers:any[] = response.beers;
        for (let i = 0; i < listBeers.length; i++) {
          const beer: Beer = new Beer();
          beer.beerId = listBeers[i].id;
          beer.brewingName = listBeers[i].brewingName;
          beer.ogValue = listBeers[i].ogValue;
          beer.fgValue = listBeers[i].fgValue;
          beer.alcohol = listBeers[i].alcohol;
          this._beersList.push(beer);
        }
      },
      error: (error:HttpErrorResponse) => {
        if(error.status === 401 || error.status === 403){
          const errorMessage:string = error.statusText + " (" + error.status + ")";
          console.error(errorMessage);
          this.authService.logout();
        }else{
          this.dialogManagerService.openDialog(error.error.message);
          const errorMessage:string = error.statusText + " (" + error.status + ")";
          console.error(errorMessage);
        }
      }
    });
    this.updatecard.getDataService().subscribe({
      next: (dataChanged:DataService) => {
        this.dialogManagerService.closeForm();
        if(dataChanged.check === true){
          const beerChanged:Beer = dataChanged.beer;
          let i = 0;
          const beerId:string = beerChanged.beerId;
          while(i < this._beersList.length && this._beersList[i].beerId !== beerId){
            i++;
          }
          if(i < this._beersList.length){
            this._beersList[i].brewingName = beerChanged.brewingName;
            this._beersList[i].ogValue = beerChanged.ogValue;
            this._beersList[i].fgValue = beerChanged.fgValue;
            this._beersList[i].alcohol = beerChanged.alcohol;
          }
        }
        this.dialogManagerService.openDialog(dataChanged.message);
      }
    });
    this.updatecard.setDataService(new DataService());
  }

  public createBeer(form:NgForm):void{
    if(form.valid && form.value.ogValue > 0 && form.value.fgValue > 0 && form.value.alcohol > 0){
        this.httprequestService.httpPutRequest(environment.serverUrl + "app/create",form.value).subscribe({
          next: (response:any) => {
            const newBeer:Beer = new Beer();
            newBeer.beerId = response.beer;
            newBeer.brewingName = form.value.brewingName;
            newBeer.ogValue = form.value.ogValue;
            newBeer.fgValue = form.value.fgValue;
            newBeer.alcohol = form.value.alcohol;
            this._beersList.push(newBeer);
            this.dialogManagerService.openDialog(response.message);
          },
          error: (error:HttpErrorResponse) => {
            if(error.status === 401 || error.status === 403){
              const errorMessage: string = error.statusText + " (" + error.status + ")";
              console.error(errorMessage);
              this.authService.logout();
            }else{
              this.dialogManagerService.openDialog(error.error.message);
              const errorMessage: string = error.statusText + " (" + error.status + ")";
              console.error(errorMessage);
            }
          }
        });
    }else{
      this.dialogManagerService.openDialog("Some fields of the form isn't compiled correctly.");
    }
  }

  public printMessage(event:string):void{
    this.dialogManagerService.openDialog(event);
  }

  public updateCard(event:Beer):void{
    this.dialogManagerService.openForm(event);
  }

  public deleteCard(event:boolean,beerId:string):void{
    if(event){
      let i = 0;
      while(i < this._beersList.length && this._beersList[i].beerId !== beerId){
        i++;
      }
      if(i < this._beersList.length){
        this._beersList.splice(i,1);
      }
    }
  }
}
