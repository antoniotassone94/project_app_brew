import {ComponentFixture,TestBed} from "@angular/core/testing";
import {BeerManagerComponent} from "./beermanager.component";

describe("BeerManagerComponent", () => {
  let component: BeerManagerComponent;
  let fixture: ComponentFixture<BeerManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
