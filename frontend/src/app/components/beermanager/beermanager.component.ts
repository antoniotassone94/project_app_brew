import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Beer} from "../../models/beer";
import {AuthService} from "../../services/auth.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {DialogManagerService} from "../../services/dialogmanager.service";
import {UpdateCardChangedService} from "../../services/updatecardchanged.service";
import {DataService} from "../../models/dataservice";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-beermanager",
  templateUrl: "./beermanager.component.html",
  styleUrl: "./beermanager.component.css"
})

export class BeerManagerComponent implements OnInit{
  private beersList:Beer[] = [];

  constructor(private httprequestService:HttpRequestService,private authService:AuthService,private dialogManagerService:DialogManagerService,private updatecard:UpdateCardChangedService){}

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest(environment.serverUrl + "app/getAll",dataObject).subscribe({
      next: (response:any) => {
        const listBeers:any[] = response.beers;
        for (let i = 0; i < listBeers.length; i++) {
          const beer: Beer = new Beer();
          beer.setBeerId(listBeers[i].id);
          beer.setBrewingName(listBeers[i].brewingName);
          beer.setOGValue(listBeers[i].ogValue);
          beer.setFGValue(listBeers[i].fgValue);
          beer.setAlcohol(listBeers[i].alcohol);
          this.beersList.push(beer);
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
        if(dataChanged.getCheck() === true){
          const beerChanged:Beer = dataChanged.getBeer();
          let i = 0;
          const beerId:string = beerChanged.getBeerId();
          while(i < this.beersList.length && this.beersList[i].getBeerId() !== beerId){
            i++;
          }
          if(i < this.beersList.length){
            this.beersList[i].setBrewingName(beerChanged.getBrewingName());
            this.beersList[i].setOGValue(beerChanged.getOGvalue());
            this.beersList[i].setFGValue(beerChanged.getFGvalue());
            this.beersList[i].setAlcohol(beerChanged.getAlcohol());
          }
        }
        this.dialogManagerService.openDialog(dataChanged.getMessage());
      }
    });
    this.updatecard.setDataService(new DataService());
  }

  public getBeersList():Beer[]{
    return this.beersList;
  }

  public createBeer(form:NgForm):void{
    const values:any = form.value;
    const brewname:string = values.brewingname;
    const ogValue:number = values.OG;
    const fgValue:number = values.FG;
    const alcohol:number = values.alcohol;
    if(brewname && brewname !== "" && ogValue > 0 && fgValue > 0 && alcohol > 0){
      const dataObject:object = {
        accessToken:localStorage.getItem("accessToken"),
        brewingName:brewname,
        ogValue:ogValue,
        fgValue:fgValue,
        alcohol:alcohol
      };
      this.httprequestService.httpPutRequest(environment.serverUrl + "app/create",dataObject).subscribe({
        next: (response:any) => {
          const newBeer:Beer = new Beer();
          newBeer.setBeerId(response.beer);
          newBeer.setBrewingName(brewname);
          newBeer.setOGValue(ogValue);
          newBeer.setFGValue(fgValue);
          newBeer.setAlcohol(alcohol);
          this.beersList.push(newBeer);
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
      while(i < this.beersList.length && this.beersList[i].getBeerId() !== beerId){
        i++;
      }
      if(i < this.beersList.length){
        this.beersList.splice(i,1);
      }
    }
  }
}
