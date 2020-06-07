import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { MockApiInterceptor } from "./mock-api.interceptor";
import { MockApiModule } from "../mock-api.module";
import { IMockInterceptorData } from "../models/IMockInterceptorData";

const mockData = {
  fieldA: "Fish",
  fieldB: "Chips",
};
const mockURL = "/api/fishandchipsservice";
const mockApi: IMockInterceptorData[] = [
  {
    url: mockURL,
    httpVerb: "GET",
    data: mockData,
  },
];

describe("MockApiInterceptor", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MockApiModule.forRoot(mockApi)],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockApiInterceptor,
          multi: true,
        },
      ],
    })
  );

  describe("intercept HTTP GET requests", () => {
    it("should add Mock Data", inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {
        http.get("/api/fishandchipsservice").subscribe((response) => {
          expect(response).toBeTruthy();
          expect(response).toEqual(mockData);
        });
        mock.verify();
      }
    ));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
