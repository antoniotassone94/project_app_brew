import {ElementRef,Injectable} from "@angular/core";

@Injectable({
  providedIn:"root"
})

export class ResponsiveSidebarService{
  constructor(){}

  public updateViewRouter(sidebar:ElementRef,element:ElementRef):void{
    if(sidebar.nativeElement.style.visibility === "hidden"){
      element.nativeElement.style.position = "fixed";
      element.nativeElement.style.left = "0px";
    }
  }
}
