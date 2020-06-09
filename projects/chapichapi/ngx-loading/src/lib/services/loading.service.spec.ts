import { TestBed } from "@angular/core/testing";

import { LoadingService } from "./loading.service";
import { TestScheduler } from "rxjs/testing";

describe("LoadingService", () => {
  let service: LoadingService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set isLoading to true when 'show' is called", () => {
    expect(service.isLoading$.value).toBe(false);
    service.show();
    expect(service.isLoading$.value).toBe(true);
  });

  it("should set isLoading to false when 'hide' is called", () => {
    service.isLoading$.next(true);
    expect(service.isLoading$.value).toBe(true);
    service.hide();
    expect(service.isLoading$.value).toBe(false);
  });
});
