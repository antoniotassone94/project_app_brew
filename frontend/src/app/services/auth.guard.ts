import {CanActivateFn} from "@angular/router";
import {CanActivateChildFn} from "@angular/router";

export const authGuardParent:CanActivateFn = (route,state) => {
  return true;
};

export const authGuardChildren:CanActivateChildFn = (childRoute,state) => {
  return true;
};
