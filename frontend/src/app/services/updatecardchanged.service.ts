import {Injectable} from "@angular/core";
import {BehaviorSubject,Observable} from "rxjs";
import {DataService} from "../models/dataservice";

@Injectable({
  providedIn:"root"
})

export class UpdateCardChangedService{
  private dataChanged:BehaviorSubject<DataService> = new BehaviorSubject<DataService>(new DataService());
  private dataObservable:Observable<DataService> = this.dataChanged.asObservable();

  constructor(){}

  public getDataService():Observable<DataService>{
    return this.dataObservable;
  }

  public setDataService(dataService:DataService):void{
    this.dataChanged.next(dataService);
  }
}
