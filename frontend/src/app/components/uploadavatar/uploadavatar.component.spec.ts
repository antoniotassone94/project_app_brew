import {ComponentFixture,TestBed} from "@angular/core/testing";
import {UploadavatarComponent} from "./uploadavatar.component";

describe("UploadavatarComponent", () => {
  let component: UploadavatarComponent;
  let fixture: ComponentFixture<UploadavatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadavatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
