import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { MockApiInterceptor } from "./mock-api.interceptor";
import { MockApiModule } from "../mock-api.module";
import { IMockInterceptorData } from "../models/IMockInterceptorData";

const mockDate = new Date();
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
  {
    url: mockURL,
    httpVerb: "POST",
    augmentations: (requestData) => ({...requestData, createdAt: mockDate})
  }
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

  describe("intercept HTTP requests", () => {
    it("should add Mock Data for GET requests", inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {
        http.get(mockURL).subscribe((response) => {
          expect(response).toBeTruthy();
          expect(response).toEqual(mockData);
        });
        mock.verify();
      }
    ));

    it("should generate the data from augmentations", inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {
        http.post(mockURL, mockData).subscribe((response) => {
          expect(response).toBeTruthy();
          expect(response).toEqual({
            ...mockData,
            createdAt: mockDate
          });
        });
        mock.verify();
      }
    ));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
