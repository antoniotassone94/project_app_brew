import {CanActivateFn} from "@angular/router";
import {CanActivateChildFn} from "@angular/router";
import {AuthService} from "./auth.service";

export const authGuardParent:CanActivateFn = (route,state) => {
  //const authService:AuthService = new AuthService();
  //return authService.isLogged();
  return true;
};

export const authGuardChildren:CanActivateChildFn = (childRoute,state) => {
  //const authService:AuthService = new AuthService();
  //return authService.isLogged();
  return true;
};
