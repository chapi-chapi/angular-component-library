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
  data: any;
}

export type IMockInterceptorHttpVerb = "GET" | "POST" | "PUT" | "PATCH";
