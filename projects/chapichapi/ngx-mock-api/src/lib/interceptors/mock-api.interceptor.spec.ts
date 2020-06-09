import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpResponse,
} from "@angular/common/http";
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
    augmentations: (requestData) => ({ ...requestData, createdAt: mockDate }),
    customResponse: (req, resp) =>
      req.body.fieldA
        ? resp
        : ({ ...resp, body: null, status: 400 } as HttpResponse<any>),
  },
];

describe("MockApiInterceptor", () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MockApiModule.forRoot(mockApi)],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockApiInterceptor,
          multi: true,
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe("GET Requests", () => {
    it("should add Mock Data", async () => {
      const response = await http.get(mockURL).toPromise();
      expect(response).toBeTruthy();
      expect(response).toEqual(mockData);
      httpMock.verify();
    });
  });

  describe("POST Requests", async () => {
    it("should generate the data from augmentations", async () => {
      const response = await http.post(mockURL, mockData).toPromise();
      expect(response).toBeTruthy();
      expect(response).toEqual({
        ...mockData,
        createdAt: mockDate,
      });
      httpMock.verify();
    });

    it("should return a custom response if condition is true", async () => {
      const { fieldA, ...badRequestData } = mockData;
      const response = await http.post(mockURL, badRequestData).toPromise();
      expect(response).toBeFalsy();
      httpMock.verify();
    });
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
