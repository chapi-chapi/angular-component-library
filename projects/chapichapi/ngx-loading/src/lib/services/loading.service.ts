import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

/** Service for displaying a loading modal on the site to indicate that something is happening in the background.
 * @export
 * @class LoadingService
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }
  public isLoading$ = new BehaviorSubject<boolean>(false);
  public show = () => this.isLoading$.next(true);
  public hide = () => this.isLoading$.next(false);
}
