import {inject} from "@angular/core";
import {CanActivateFn,CanActivateChildFn} from "@angular/router";
import {AuthService} from "./auth.service";

export const authGuardParent:CanActivateFn = (route,state) => {
  return inject(AuthService).isLogged();
};

export const authGuardChildren:CanActivateChildFn = (childRoute,state) => {
  return inject(AuthService).isLogged();
};
