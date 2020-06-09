import { Injectable, Inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IMockInterceptorData } from "../models/IMockInterceptorData";
import { delay } from "rxjs/operators";

/** Mocks calls to a backend API, providing responses in-memory rather than calling out to a different service.
 */
@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject("mockApiData") private mockApiData: IMockInterceptorData[],
    @Inject("isActive") private isActive: boolean,
    @Inject("delay") private delay: number,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    handler: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.mockApiData) {
      const mockApiUrl = this.mockApiData.find(
        (url) => url.url === request.url && url.httpVerb === request.method
      );
      if (mockApiUrl) {
        if (mockApiUrl.augmentations) {
          mockApiUrl.data = mockApiUrl.augmentations(request.body ?? mockApiUrl.data);
        }

        return of(
          new HttpResponse({
            status: 200,
            body: mockApiUrl.data,
          })
        ).pipe(delay(this.delay));
      }
    }
    return handler.handle(request);
  }
}
