import {ComponentFixture,TestBed} from "@angular/core/testing";
import {BeermanagerComponent} from "./beermanager.component";

describe("BeermanagerComponent", () => {
  let component: BeermanagerComponent;
  let fixture: ComponentFixture<BeermanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeermanagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
