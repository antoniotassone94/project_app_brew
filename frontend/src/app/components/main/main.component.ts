import {Component,OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css"
})

export class MainComponent implements OnInit{
  constructor(private authService:AuthService,private router:Router){}

  public ngOnInit():void{
    if(this.authService.isLogged() === true){
      this.router.navigate(["dashboard"]);
    }else{
      this.router.navigate([""]);
    }
  }
}
