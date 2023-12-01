import {Injectable} from "@angular/core";
import {BehaviorSubject,Observable} from "rxjs";
import {DataService} from "../models/dataservice.model";

@Injectable({
  providedIn:"root"
})

export class UpdateCardChangedService{
  private dataChanged:BehaviorSubject<DataService>;
  private dataObservable:Observable<DataService>;

  constructor(){
    this.dataChanged = new BehaviorSubject<DataService>(new DataService());
    this.dataObservable = this.dataChanged.asObservable();
  }

  public getDataService():Observable<DataService>{
    return this.dataObservable;
  }

  public setDataService(dataService:DataService):void{
    this.dataChanged.next(dataService);
  }
}
