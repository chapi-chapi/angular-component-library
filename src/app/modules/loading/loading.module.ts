import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { LoadingService } from './services/loading.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/** Module that provides services for indicating to the user to wait for an action to complete.
 */
@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  providers: [LoadingService],
  exports: [LoaderComponent]
})
export class LoadingModule {
  /** Optionally sets up an interceptor that automatically shows a loading spinner when the app makes any http calls.
   * @param boolean [includeInterceptor=true] specify whether to automatically show a loading spinner when the app makes any http calls.
   * @returns ModuleWithProviders
   * @memberof LoadingModule
   */
  static forRoot(includeInterceptor: boolean = true) : ModuleWithProviders {
    return {
      ngModule: LoadingModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        },
        { provide: "isActive", useValue: includeInterceptor },
      ]
    };
  }
}
