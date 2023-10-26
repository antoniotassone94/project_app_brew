import {TestBed} from "@angular/core/testing";
import {UpdateavatarimageService} from "./updateavatarimage.service";

describe("UpdateavatarimageService", () => {
  let service: UpdateavatarimageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateavatarimageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
