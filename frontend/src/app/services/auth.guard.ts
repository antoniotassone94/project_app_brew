import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot,CanActivate,CanActivateChild,RouterStateSnapshot,UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate,CanActivateChild{
  constructor(private authService:AuthService){}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

      return this.authService.isLogged();
  }

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{

      return this.authService.isLogged();
  }
}
