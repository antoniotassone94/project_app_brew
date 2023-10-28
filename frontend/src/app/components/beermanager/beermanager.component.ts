import {HttpErrorResponse} from "@angular/common/http";
import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Beer} from "src/app/models/beer";
import {AuthService} from "src/app/services/auth.service";
import {HttprequestService} from "src/app/services/httprequest.service";

@Component({
  selector: "app-beermanager",
  templateUrl: "./beermanager.component.html",
  styleUrls: ["./beermanager.component.css"]
})

export class BeermanagerComponent implements OnInit{
  private beersList:Beer[] = [];
  private messageServer:string = "";

  constructor(private httprequestService:HttprequestService,private authService:AuthService,private router:Router){}

  public ngOnInit():void{
    const dataObject:object = {accessToken:localStorage.getItem("accessToken")};
    this.httprequestService.httpPostRequest("http://localhost:4000/app/getAll",dataObject).subscribe({
        next: (response:any) => {
          const listBeers:any[] = response.beers;
          for(let i = 0;i < listBeers.length;i++){
            const beer:Beer = new Beer();
            beer.setBeerId(listBeers[i].id);
            beer.setBrewingName(listBeers[i].brewingName);
            beer.setOGValue(listBeers[i].ogValue);
            beer.setFGValue(listBeers[i].fgValue);
            beer.setAlcohol(listBeers[i].alcohol);
            this.beersList.push(beer);
          }
        },
        error: (error:HttpErrorResponse) => {
          if(error.status == 401 || error.status == 403){
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
            this.router.navigate([""]);
          }else{
            this.messageServer = error.error.message;
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
          }
        }
      });
  }

  public getBeersList():Beer[]{
    return this.beersList;
  }

  public getMessage():string{
    return this.messageServer;
  }

  public createBeer(form:NgForm):void{
    const values:any = form.value;
    const brewname:string = values.brewingname;
    const ogValue:number = values.OG;
    const fgValue:number = values.FG;
    const alcohol:number = values.alcohol;
    if(brewname != "" && ogValue > 0 && fgValue > 0 && alcohol > 0){
      const dataObject:object = {
        accessToken:localStorage.getItem("accessToken"),
        brewingName:brewname,
        ogValue:ogValue,
        fgValue:fgValue,
        alcohol:alcohol
      };
      this.httprequestService.httpPutRequest("http://localhost:4000/app/create",dataObject).subscribe({
        next: (response:any) => {
          const newBeer:Beer = new Beer();
          newBeer.setBrewingName(brewname);
          newBeer.setOGValue(ogValue);
          newBeer.setFGValue(fgValue);
          newBeer.setAlcohol(alcohol);
          this.beersList.push(newBeer);
          this.messageServer = response.message;
        },
        error: (error:HttpErrorResponse) => {
          if(error.status == 401 || error.status == 403){
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
            this.router.navigate([""]);
          }else{
            this.messageServer = error.error.message;
            const errorMessage:string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
          }
        }
      });
    }
  }

  public printMessage(event:string):void{
    this.messageServer = event;
  }

  public deleteCard(event:boolean,beerId:string):void{
    if(event){
      let i = 0;
      while(i < this.beersList.length && this.beersList[i].getBeerId() != beerId){
        i++;
      }
      if(i < this.beersList.length){
        this.beersList.splice(i,1);
      }
    }
  }
}
