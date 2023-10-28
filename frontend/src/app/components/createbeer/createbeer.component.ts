import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Beer} from "src/app/models/beer";

@Component({
  selector: "app-createbeer",
  templateUrl: "./createbeer.component.html",
  styleUrls: ["./createbeer.component.css"]
})

export class CreatebeerComponent implements OnInit{
  private beersList:Beer[] = [];

  constructor(){}

  public ngOnInit():void{}

  public getBeersList():Beer[]{
    return this.beersList;
  }

  public createBeer(form:NgForm):void{
    const values:any = form.value;
    const brewname:string = values.brewingname;
    const ogValue:number = values.OG;
    const fgValue:number = values.FG;
    const alcohol:number = values.alcohol;
    if(brewname != "" && ogValue > 0 && fgValue > 0 && alcohol > 0){
      const newBeer:Beer = new Beer();
      newBeer.setBrewingName(brewname);
      newBeer.setOGValue(ogValue);
      newBeer.setFGValue(fgValue);
      newBeer.setAlcohol(alcohol);
      this.beersList.push(newBeer);
    }
  }
}
