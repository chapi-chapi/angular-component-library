import { Injectable, Inject } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { IMockInterceptorData } from "./IMockInterceptorData";

/** Mocks calls to a backend API, providing responses in-memory rather than calling out to a different service.
 */
@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject("mockApiData") private mockApiData: IMockInterceptorData[],
    @Inject("isActive") private isActive: boolean[]
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isActive) {
      const mockApiUrl = this.mockApiData.find(
        (url) => url.url === request.url && url.httpVerb === request.method
      );
      if (mockApiUrl)
        return of(new HttpResponse({ status: 200, body: mockApiUrl.data }));
    }
    return next.handle(request);
  }
}
