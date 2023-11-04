import {TestBed} from "@angular/core/testing";
import {UpdateAvatarImageService} from "./updateavatarimage.service";

describe("UpdateAvatarImageService", () => {
  let service: UpdateAvatarImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAvatarImageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
