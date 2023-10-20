import {Component,OnInit} from "@angular/core";
import {AuthService} from "src/app/services/auth.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})

export class MainComponent implements OnInit{
  constructor(private authService:AuthService){}

  public ngOnInit():void{}

  public isLogged():boolean{
    return this.authService.isLogged();
  }
}
