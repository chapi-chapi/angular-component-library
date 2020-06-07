import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IACLLibrary } from "../models/IACLLibrary";
import { Observable } from "rxjs";

/** Service for handling all interactions with the API.
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: "root",
})
export class ApiService {
  private apiBaseUrl = "/api/";

  constructor(private httpClient: HttpClient) {}

  /** Retrieves all components from the API.
   * @returns {Observable<IACLLibrary[]>}
   * @memberof ApiService
   */
  public getComponents(): Observable<IACLLibrary[]> {
    return this.httpClient.get(`${this.apiBaseUrl}components`) as Observable<
      IACLLibrary[]
    >;
  }

  /** Retrieves the component details for the specified component name.
   * @param {string} email
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  public getComponentDetails(componentName: string): Observable<any> {
    return this.httpClient.get(
      `${this.apiBaseUrl}components/${componentName}`
    ) as Observable<any>;
  }
}
