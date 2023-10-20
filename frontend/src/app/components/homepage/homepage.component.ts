import {Component,OnInit} from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})

export class HomepageComponent implements OnInit{
  private loginView:boolean = true;
  private message1:string = "Go to register form";
  private message2:string = "Go to login form";

  constructor(){}

  public getLoginView():boolean{
    return this.loginView;
  }

  public getMessage1():string{
    return this.message1;
  }

  public getMessage2():string{
    return this.message2;
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
