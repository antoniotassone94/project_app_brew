import {Component,Input,OnInit} from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})

export class CardComponent implements OnInit{
  @Input() brewingName:string = "";
  @Input() ogValue:number = 0;
  @Input() fgValue:number = 0;
  @Input() alcohol:number = 0;

  constructor(){}

  ngOnInit():void{}
}
