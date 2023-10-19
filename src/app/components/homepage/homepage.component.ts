import {Component,OnInit} from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})

export class HomepageComponent implements OnInit{
  private loginView:boolean = true;

  constructor(){}

  public getLoginView():boolean{
    return this.loginView;
  }

  public ngOnInit():void{}

  public switchLoginRegister():void{
    if(this.loginView == true){
      this.loginView = false;
    }else{
      this.loginView = true;
    }
  }
}
