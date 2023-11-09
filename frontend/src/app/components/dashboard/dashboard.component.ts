import {Component,ElementRef,OnInit,ViewChild} from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})

export class DashboardComponent implements OnInit{
  @ViewChild("sidebar") sidebar!:ElementRef;

  constructor(){}

  public ngOnInit():void{}

  public showSidebar():void{
    if(this.sidebar.nativeElement.style.visibility === "hidden"){
      this.sidebar.nativeElement.style.visibility = "visible";
    }else{
      this.sidebar.nativeElement.style.visibility = "hidden";
    }
  }
}
