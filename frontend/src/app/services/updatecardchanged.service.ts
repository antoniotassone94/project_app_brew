import {Injectable} from "@angular/core";
import {BehaviorSubject,Observable} from "rxjs";
import {UpdateBeerDataService} from "../models/updatebeerdataservice";

@Injectable({
  providedIn:"root"
})

export class UpdateCardChangedService{
  private dataChanged:BehaviorSubject<UpdateBeerDataService> = new BehaviorSubject<UpdateBeerDataService>(new UpdateBeerDataService());
  private dataObservable:Observable<UpdateBeerDataService> = this.dataChanged.asObservable();

  constructor(){}

  public getDataService():Observable<UpdateBeerDataService>{
    return this.dataObservable;
  }

  public setDataService(dataService:UpdateBeerDataService):void{
    this.dataChanged.next(dataService);
  }
}
