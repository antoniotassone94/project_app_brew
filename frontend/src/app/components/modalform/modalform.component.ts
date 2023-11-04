import {HttpErrorResponse} from "@angular/common/http";
import {Component,EventEmitter,Inject,OnInit, Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Beer} from "src/app/models/beer";
import {UpdateBeerDataService} from "src/app/models/updatebeerdataservice";
import {AuthService} from "src/app/services/auth.service";
import {HttpRequestService} from "src/app/services/httprequest.service";
import {UpdateCardChangedService} from "src/app/services/updatecardchanged.service";

@Component({
  selector: "app-modalform",
  templateUrl: "./modalform.component.html",
  styleUrls: ["./modalform.component.css"]
})

export class ModalFormComponent implements OnInit{
  private beer:Beer;

  constructor(@Inject(MAT_DIALOG_DATA) data:Beer,private registryIcon:MatIconRegistry,private dom:DomSanitizer,private httprequest:HttpRequestService,private authService:AuthService,private router:Router,private updatecard:UpdateCardChangedService){
    this.beer = data;
    const urlSafe:SafeResourceUrl = this.dom.bypassSecurityTrustResourceUrl("assets/images/closeIcon.svg");
    this.registryIcon.addSvgIcon("close",urlSafe);
  }

  public ngOnInit():void{}

  public getBeerId():string{
    return this.beer.getBeerId();
  }

  public getBrewingName():string{
    return this.beer.getBrewingName();
  }

  public getOGvalue():number{
    return this.beer.getOGvalue();
  }

  public getFGvalue():number{
    return this.beer.getFGvalue();
  }

  public getAlcohol():number{
    return this.beer.getAlcohol();
  }

  public updateData(form:NgForm):void{
    const values:any = form.value;
    const beerId:string = values.beerId;
    const brewingName:string = values.brewingName;
    const ogValue:number = values.ogValue;
    const fgValue:number = values.fgValue;
    const alcohol:number = values.alcohol;
    if(beerId && brewingName && beerId !== "" && brewingName !== "" && ogValue > 0 && fgValue > 0 && alcohol > 0){
      const dataObject:object = {
        accessToken:localStorage.getItem("accessToken"),
        brewingName:brewingName,
        ogValue:ogValue,
        fgValue:fgValue,
        alcohol:alcohol
      };
      this.httprequest.httpPutRequest("http://localhost:4000/app/update/" + beerId,dataObject).subscribe({
        next: (response:any) => {
          const newBeer:Beer = new Beer();
          newBeer.setBeerId(response.beer.id);
          newBeer.setBrewingName(response.beer.brewingName);
          newBeer.setOGValue(response.beer.ogValue);
          newBeer.setFGValue(response.beer.fgValue);
          newBeer.setAlcohol(response.beer.alcohol);
          const dataService:UpdateBeerDataService = new UpdateBeerDataService();
          dataService.setBeer(newBeer);
          dataService.setMessage(response.message);
          dataService.setCheck(true);
          this.updatecard.setDataService(dataService);
        },
        error: (error:HttpErrorResponse) => {
          if(error.status === 401 || error.status === 403){
            const errorMessage: string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
            this.router.navigate([""]);
          }else{
            const errorMessage: string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            const dataService:UpdateBeerDataService = new UpdateBeerDataService();
            dataService.setMessage(error.error.message);
            dataService.setCheck(false);
            this.updatecard.setDataService(dataService);
          }
        }
      });
    }
  }
}
