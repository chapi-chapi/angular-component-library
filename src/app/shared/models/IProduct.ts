/** Interface representing a Product model.
 * To be used to communicate with the API.
 * @export
 * @interface IProduct
 */
export interface IProduct {
  id?: string;
  name: string;
  description: string;
  insertedUtc?: string;
  updatedUtc?: string;
}
