import {TestBed} from "@angular/core/testing";
import {CanActivateFn,CanActivateChildFn} from "@angular/router";
import {authGuardParent,authGuardChildren} from "./auth.guard";

describe("authGuard", () => {
  const executeGuard1: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuardParent(...guardParameters));

  const executeGuard2: CanActivateChildFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuardChildren(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(executeGuard1).toBeTruthy();
  });

  it("should be created", () => {
    expect(executeGuard2).toBeTruthy();
  });
});
