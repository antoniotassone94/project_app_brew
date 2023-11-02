import {TestBed} from "@angular/core/testing";
import {DialogmanagerService} from "./dialogmanager.service";

describe("DialogmanagerService",() => {
  let service: DialogmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogmanagerService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
