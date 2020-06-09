import { HttpResponse, HttpRequest } from '@angular/common/http';

/** Represents a configuration that can be used to mock out the calls to a backend API
 */
export interface IMockInterceptorData {
  /** The URL to target to mock ('/api/users' for example)
   */
  url: string;
  /** The verb to target (GET, POST etc.)
   */
  httpVerb: IMockInterceptorHttpVerb;
  /** The data to return for the specified url and verb
   */
  data?: any;

  /** Used to augment the object(s) returned (such as generating an Id or timestamp on a Posted item etc.). */
  augmentations?: (requestData: any) => any;

  /** Can be used to provide a custom response for the specific endpoint based on any particular condition.
   * For example, you may want a post request to fail if it does not include the correct information:
   * (req, resp) => req.body.id ? resp : {...resp, body: null, statusCode: 400}
   */
  customResponse?: (request: HttpRequest<any>, response: HttpResponse<any>) => HttpResponse<any>;
}

export type IMockInterceptorHttpVerb = "GET" | "POST" | "PUT" | "PATCH";
