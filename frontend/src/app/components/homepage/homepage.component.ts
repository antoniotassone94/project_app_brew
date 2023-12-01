import {Component,OnInit} from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css"
})

export class HomepageComponent implements OnInit{
  private _loginView:boolean;
  private _message1:string;
  private _message2:string;

  constructor(){
    this._loginView = true;
    this._message1 = "Go to register form";
    this._message2 = "Go to login form";
  }

  public get loginView():boolean{
    return this._loginView;
  }

  public get message1():string{
    return this._message1;
  }

  public get message2():string{
    return this._message2;
  }

  public ngOnInit():void{}

  public switchLoginRegister():void{
    this._loginView = !this._loginView;
  }
}
