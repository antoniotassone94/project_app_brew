import {Component,OnInit} from "@angular/core";
import {NgForm} from "@angular/forms";

@Component({
  selector: "app-calculator",
  templateUrl: "./calculator.component.html",
  styleUrl: "./calculator.component.css"
})

export class CalculatorComponent implements OnInit{
  private _result:string;

  constructor(){
    this._result = "";
  }

  public get result():string{
    return this._result;
  }

  public ngOnInit():void{}

  public calculate(form:NgForm):void{
    const values:any = form.value;
    const OGvalue:number = values.OG;
    const FGvalue:number = values.FG;
    if(OGvalue > 0 && FGvalue > 0){
      const result:string = (((OGvalue - FGvalue) / 7.5) + 0.5).toFixed(1);
      this._result = result;
    }
  }
}
