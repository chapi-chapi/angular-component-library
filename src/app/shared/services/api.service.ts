import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IProduct } from "../models/IProduct";
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
  private formatProduct = (product: IProduct) => {
    var updatedProduct: IProduct = product;
    return updatedProduct;
  };

  /** Retrieves all products from the API.
   * @returns {Observable<IProduct[]>}
   * @memberof ApiService
   */
  public getProducts(): Observable<IProduct[]> {
    return this.httpClient
      .get(`${this.apiBaseUrl}products`)
      .pipe(
        map((response: any[]) =>
          response.map(product => this.formatProduct(product))
        )
      );
  }

  /** Retrieves the product information for the specified email.
   * @param {string} email
   * @returns {Observable<IProduct>}
   * @memberof ApiService
   */
  public getProduct(email: string): Observable<IProduct> {
    return this.httpClient
      .get(`${this.apiBaseUrl}products/${email}`)
      .pipe(map((product: IProduct) => this.formatProduct(product)));
  }

  /** Creates a new product via the API.
   * @param {IProduct} product
   * @returns {Observable<IProduct>} The information for the newly created product.
   * @memberof ApiService
   */
  public addProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient
      .post(`${this.apiBaseUrl}products`, product)
      .pipe(map((product: IProduct) => this.formatProduct(product)));
  }

  /** Updates the product information via the API
   * @param {IProduct} product
   * @returns {Observable<IProduct>} The information for the newly updated product.
   * @memberof ApiService
   */
  public updateProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient
      .put(`${this.apiBaseUrl}products/${product.id}`, product)
      .pipe(map((product: IProduct) => this.formatProduct(product)));
  }
}
