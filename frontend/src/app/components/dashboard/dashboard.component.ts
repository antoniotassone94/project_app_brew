import {Component,ElementRef,OnInit,ViewChild} from "@angular/core";
import {ResponsiveSidebarService} from "../../services/responsivesidebar.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css"
})

export class DashboardComponent implements OnInit{
  @ViewChild("sidebar") sidebar!:ElementRef;
  @ViewChild("router") router!:ElementRef;

  constructor(private responsivesidebar:ResponsiveSidebarService){}

  public ngOnInit():void{}

  public showSidebar():void{
    if(this.sidebar.nativeElement.style.visibility === "hidden"){
      this.sidebar.nativeElement.style.visibility = "visible";
    }else{
      this.sidebar.nativeElement.style.visibility = "hidden";
      this.responsivesidebar.updateViewRouter(this.sidebar,this.router);
    }
  }

  public hideSidebar():void{
    if(window.innerWidth <= 768){
      this.sidebar.nativeElement.style.visibility = "hidden";
    }
  }
}
