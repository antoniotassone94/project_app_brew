import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.css"]
})

export class CalculatorComponent implements OnInit{
  private resultValue:string = "";

  constructor(){}

  public ngOnInit():void{}

  public getResult():string{
    return this.resultValue;
  }

  public calculate(form:NgForm):void{
    const values:any = form.value;
    const OGvalue:number = values.OG;
    const FGvalue:number = values.FG;
    const result:string = (((OGvalue - FGvalue) / 7.5) + 0.5).toFixed(1);
    this.resultValue = result;
  }
}
