import {Component,OnInit} from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})

export class SidebarComponent implements OnInit{
  constructor(){}

  public ngOnInit():void{}

  public doLogout():void{
    console.log("function not available.");
  }
}
