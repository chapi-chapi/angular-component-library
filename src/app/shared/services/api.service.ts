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
          response.map(product => this.formatProduct(product))
        )
      );
  }

  /** Retrieves the product information for the specified email.
   * @param {string} email
   * @returns {Observable<IAclComponent>}
   * @memberof ApiService
   */
  public getProduct(email: string): Observable<IAclComponent> {
    return this.httpClient
      .get(`${this.apiBaseUrl}products/${email}`)
      .pipe(map((product: IAclComponent) => this.formatProduct(product)));
  }

  /** Creates a new product via the API.
   * @param {IAclComponent} product
   * @returns {Observable<IAclComponent>} The information for the newly created product.
   * @memberof ApiService
   */
  public addProduct(product: IAclComponent): Observable<IAclComponent> {
    return this.httpClient
      .post(`${this.apiBaseUrl}products`, product)
      .pipe(map((product: IAclComponent) => this.formatProduct(product)));
  }

  /** Updates the product information via the API
   * @param {IAclComponent} product
   * @returns {Observable<IAclComponent>} The information for the newly updated product.
   * @memberof ApiService
   */
  public updateProduct(product: IAclComponent): Observable<IAclComponent> {
    return this.httpClient
      .put(`${this.apiBaseUrl}products/${product.id}`, product)
      .pipe(map((product: IAclComponent) => this.formatProduct(product)));
  }
}
