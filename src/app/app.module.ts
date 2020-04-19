import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ComponentsComponent } from "./pages/components/components.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule, MatNativeDateModule } from "@angular/material/core";
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule } from "@angular/material/datepicker";
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TimeagoModule } from "ngx-timeago";

import { ApiErrorInterceptor } from "./shared/interceptors/api-error.interceptor";
import { NotificationsService } from "./shared/services/notifications.service";
import { MockApiModule } from "./modules/mock-api/mock-api.module";
import { ChapiChapiCardModule } from './modules/card/card.module';
import { IMockInterceptorData } from './modules/mock-api/models/IMockInterceptorData';
import { environment } from 'src/environments/environment';
import { LoadingModule } from './modules/loading/loading.module';
import { ComponentDetailsComponent } from './pages/component-details/component-details.component';

const mockApi : IMockInterceptorData[] = [
  {
    url: "/api/components",
    httpVerb: "GET",
    data: [
      {
        name: "Mock Api",
        subtitle: "Interceptor",
        description: "Provides an interceptor for mocking API calls.",
        insertedUtc: new Date(),
        updatedUtc: new Date(),
      },
    ],
  },
  {
    url: "/api/components/card",
    httpVerb: "GET",
    data:
      {
        directory: 'modules/card',
        fileNames: ['card/card.component.html', 'card/card.component.scss', 'card/card.component.ts']
      }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    ComponentDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTabsModule,
    TimeagoModule.forRoot(),
    ChapiChapiCardModule,
    LoadingModule.forRoot(),
    MockApiModule.forRoot(mockApi, environment.mock, 3000)
  ],
  providers: [
    NotificationsService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4500 } },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
