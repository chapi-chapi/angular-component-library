import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockApiInterceptor } from './mock-api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IMockInterceptorData } from './IMockInterceptorData';


/** Module that provides services for intercepting Api calls and using locally mocked data instead.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MockApiModule {
  /** Sets up an interceptor that mocks API requests based on the mockApi config passed in.
   * @param IMockInterceptorData[] mockApi A config that describes what calls to mock and what data to return.
   * @param boolean environmentFlag A flag that can be used to optionally turn the mock api interceptor on or off based on an environment flag.
   * @returns ModuleWithProviders
   */
  static forRoot(mockApi: IMockInterceptorData[], environmentFlag: boolean = true) : ModuleWithProviders {
    return {
      ngModule: MockApiModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockApiInterceptor,
          multi: true
        },
        { provide: "mockApiData", useValue: mockApi },
        { provide: "isActive", useValue: environmentFlag }
      ]
    }
  }
 }
