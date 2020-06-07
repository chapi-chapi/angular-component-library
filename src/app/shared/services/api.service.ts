import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

  /** Retrieves all libraries from the API.
   * @returns {Observable<IACLLibrary[]>}
   * @memberof ApiService
   */
  public getLibraries(): Observable<IACLLibrary[]> {
    return this.httpClient.get(`${this.apiBaseUrl}libraries`) as Observable<
      IACLLibrary[]
    >;
  }

  /** Retrieves the library details for the specified component name.
   * @param {string} libraryName
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  public getLibraryDetails(libraryName: string): Observable<any> {
    return this.httpClient.get(
      `${this.apiBaseUrl}libraries/${libraryName}`
    ) as Observable<any>;
  }
}
