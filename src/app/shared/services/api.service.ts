import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IAclComponent } from "../models/IAclComponent";
import { Observable } from "rxjs";

/** Service for handling all interactions with the API.
 * @export
 * @class ApiService
 */
@Injectable({
  providedIn: "root"
})
export class ApiService {
  private apiBaseUrl = "/api/";

  constructor(private httpClient: HttpClient) {}

  private formateDate = (datetime: string) => new Date().toString();
  private formatProduct = (product: IAclComponent) => {
    var updatedProduct: IAclComponent = product;
    return updatedProduct;
  };

  /** Retrieves all components from the API.
   * @returns {Observable<IAclComponent[]>}
   * @memberof ApiService
   */
  public getComponents(): Observable<IAclComponent[]> {
    return this.httpClient
      .get(`${this.apiBaseUrl}components`)
      .pipe(
        map((response: any[]) =>
          response.map(component => this.formatProduct(component))
        )
      );
  }

  /** Retrieves the component details for the specified component name.
   * @param {string} email
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  public getComponentDetails(componentName: string): Observable<any> {
    return (this.httpClient
      .get(`${this.apiBaseUrl}components/${componentName}`) as Observable<any>);
  }
}
