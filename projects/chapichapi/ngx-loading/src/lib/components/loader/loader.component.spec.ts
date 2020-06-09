import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoaderComponent } from "./loader.component";
import { LoadingService } from "../../services/loading.service";

describe("LoaderComponent", () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let compiled;
  let service: LoadingService;
  let getOverlayElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    }).compileComponents();

    service = TestBed.inject(LoadingService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
    getOverlayElement = () => compiled.querySelector(".chapichapi-loader-overlay");
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should be set to not be loading by default", () => {
    expect(component.showLoader$.value).toBeFalse();
    expect(getOverlayElement()).toBeFalsy();
  });

  it("should set showLoader value based on service show/hide", () => {
    service.show();
    expect(component.showLoader$.value).toBeTrue();

    fixture.detectChanges();
    expect(getOverlayElement()).toBeTruthy();

    service.hide();
    expect(component.showLoader$.value).toBeFalse();

    fixture.detectChanges();
    expect(getOverlayElement()).toBeFalsy();
  });
});
