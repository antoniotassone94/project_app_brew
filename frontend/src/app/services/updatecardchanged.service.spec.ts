import {TestBed} from "@angular/core/testing";
import {UpdateCardChangedService} from "./updatecardchanged.service";

describe("UpdateCardChangedService", () => {
  let service: UpdateCardChangedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCardChangedService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
