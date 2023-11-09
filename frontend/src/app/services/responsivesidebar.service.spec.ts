import {TestBed} from "@angular/core/testing";
import {ResponsiveSidebarService} from "./responsivesidebar.service";

describe("ResponsiveSidebarService", () => {
  let service: ResponsiveSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsiveSidebarService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
