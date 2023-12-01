import {HttpErrorResponse} from "@angular/common/http";
import {Component,Inject,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer,SafeResourceUrl} from "@angular/platform-browser";
import {Beer} from "../../models/beer.model";
import {DataService} from "../../models/dataservice.model";
import {AuthService} from "../../services/auth.service";
import {HttpRequestService} from "../../services/httprequest.service";
import {UpdateCardChangedService} from "../../services/updatecardchanged.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: "app-modalform",
  templateUrl: "./modalform.component.html",
  styleUrl: "./modalform.component.css"
})

export class ModalFormComponent implements OnInit{
  private _beer:Beer;

  constructor(@Inject(MAT_DIALOG_DATA) data:Beer,private registryIcon:MatIconRegistry,private dom:DomSanitizer,private httprequest:HttpRequestService,private authService:AuthService,private updatecard:UpdateCardChangedService){
    this._beer = data;
    const urlSafe:SafeResourceUrl = this.dom.bypassSecurityTrustResourceUrl("assets/images/closeIcon.svg");
    this.registryIcon.addSvgIcon("close",urlSafe);
  }

  public get beer():Beer{
    return this._beer;
  }

  public ngOnInit():void{}

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
      this.httprequest.httpPutRequest(environment.serverUrl + "app/update/" + beerId,dataObject).subscribe({
        next: (response:any) => {
          const newBeer:Beer = new Beer();
          newBeer.beerId = response.beer.id;
          newBeer.brewingName = response.beer.brewingName;
          newBeer.ogValue = response.beer.ogValue;
          newBeer.fgValue = response.beer.fgValue;
          newBeer.alcohol = response.beer.alcohol;
          const dataService:DataService = new DataService();
          dataService.beer = newBeer;
          dataService.message = response.message;
          dataService.check = true;
          this.updatecard.setDataService(dataService);
        },
        error: (error:HttpErrorResponse) => {
          if(error.status === 401 || error.status === 403){
            const errorMessage: string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            this.authService.logout();
          }else{
            const errorMessage: string = error.statusText + " (" + error.status + ")";
            console.error(errorMessage);
            const dataService:DataService = new DataService();
            dataService.message = error.error.message;
            dataService.check = false;
            this.updatecard.setDataService(dataService);
          }
        }
      });
    }
  }
}
