/** Interface representing an angular component for the ACL.
 * To be used to communicate with the mock API.
 * @export
 * @interface IAclComponent
 */
export interface IAclComponent {
  id?: string;
  name: string;
  description: string;
  subtitle?: string;
  insertedUtc?: string;
  updatedUtc?: string;
}
