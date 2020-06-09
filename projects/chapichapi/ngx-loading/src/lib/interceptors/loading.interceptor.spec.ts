import { TestBed } from "@angular/core/testing";

import { LoadingInterceptor } from "./loading.interceptor";
import {
  HttpTestingController,
  HttpClientTestingModule,
} from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { LoadingModule } from "../loading.module";
import { LoadingService } from "../services/loading.service";
import { MockApiModule, IMockInterceptorData } from "@chapichapi/ngx-mock-api";

const mockURL = "/api/fishandchipsservice";
const mockData = {
  fieldA: "Fish",
  fieldB: "Chips",
};
const mockApi: IMockInterceptorData[] = [
  {
    url: mockURL,
    httpVerb: "GET",
    data: mockData,
  },
];
describe("LoadingInterceptor", () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let service: LoadingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LoadingModule.forRoot(true),
        MockApiModule.forRoot(mockApi, 500)
      ],
      providers: [LoadingInterceptor],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoadingService);
  });

  it("should call the loading service", async () => {
    const spyCalls = [];
    spyOn(service, "show").and.callFake(() => spyCalls.push("show"));
    spyOn(service, "hide").and.callFake(() => spyCalls.push("hide"));
    const response = await http.get(mockURL).toPromise();

    // Ensure the functions are called and in the right order
    expect(spyCalls.length).toBe(2, `Unexpected number of spy calls`);
    expect(spyCalls[0]).toBe("show");
    expect(spyCalls[1]).toBe("hide");

    // Ensure that the expected data is also returned
    expect(response).toBeTruthy();
    expect(response).toEqual(mockData);
  });
});
