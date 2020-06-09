// ANGULAR IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// MATERIAL/THIRD PARTY IMPORTS
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { TimeagoModule } from 'ngx-timeago';
import { MarkdownModule } from 'ngx-markdown';

// SHOWCASE APP IMPORTS
import { AppComponent } from './app.component';
import { LibrariesListComponent } from './pages/libraries-list/libraries-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiErrorInterceptor } from './shared/interceptors/api-error.interceptor';
import { NotificationsService } from './shared/services/notifications.service';
import { ChapiChapiCardModule } from './modules/card/card.module';
import { environment } from 'src/environments/environment';
import { LibraryDetailsComponent } from './pages/library-details/library-details.component';
import { mockApi } from './mock-api';

// PROJECT IMPORTS
import { MockApiModule } from '@chapichapi/ngx-mock-api';
import { LoadingModule } from '@chapichapi/ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    LibrariesListComponent,
    LibraryDetailsComponent
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
    MarkdownModule.forRoot(),
    TimeagoModule.forRoot(),
    ChapiChapiCardModule,
    LoadingModule.forRoot(),
    MockApiModule.forRoot(environment.mock ? mockApi : null, 1000)
  ],
  providers: [
    NotificationsService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4500 } },
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
