import {ComponentFixture,TestBed} from "@angular/core/testing";
import {CreatebeerComponent} from "./createbeer.component";

describe("CreatebeerComponent", () => {
  let component: CreatebeerComponent;
  let fixture: ComponentFixture<CreatebeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatebeerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatebeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
