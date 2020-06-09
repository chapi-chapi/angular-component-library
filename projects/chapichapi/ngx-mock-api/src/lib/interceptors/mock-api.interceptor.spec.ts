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
      req.body.fieldA ? resp : ({ ...resp, body: null, status: 400 } as HttpResponse<any>),
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

  describe("GET Requests", () => {
    it("should add Mock Data", inject(
      [HttpClient, HttpTestingController],
      async (http: HttpClient, mock: HttpTestingController) => {
        const response = await http.get(mockURL).toPromise();
        expect(response).toBeTruthy();
        expect(response).toEqual(mockData);
        mock.verify();
      }
    ));
  });

  describe("POST Requests", async () => {
    it("should generate the data from augmentations", inject(
      [HttpClient, HttpTestingController],
      async (http: HttpClient, mock: HttpTestingController) => {
        const response = await http.post(mockURL, mockData).toPromise();
        expect(response).toBeTruthy();
        expect(response).toEqual({
          ...mockData,
          createdAt: mockDate,
        });
        mock.verify();
      }
    ));
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
