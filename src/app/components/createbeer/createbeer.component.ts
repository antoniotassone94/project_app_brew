import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Beer} from "src/app/models/beer";

@Component({
  selector: "app-createbeer",
  templateUrl: "./createbeer.component.html",
  styleUrls: ["./createbeer.component.css"]
})
export class CreatebeerComponent implements OnInit{
  public beersList:Beer[] = [];

  constructor(){}

  ngOnInit():void{}

  createBeer(formCreate:NgForm):void{
    const values:any = formCreate.value;
    const brewname:string = values.brewingname;
    const ogValue:number = values.OG;
    const fgValue:number = values.FG;
    const alcohol:number = values.alcohol;
    const newBeer:Beer = new Beer(brewname,ogValue,fgValue,alcohol);
    this.beersList.push(newBeer);
  }
}
