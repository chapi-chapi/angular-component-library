import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibrariesListComponent } from './pages/libraries-list/libraries-list.component';
import { LibraryDetailsComponent } from './pages/library-details/library-details.component';


const routes: Routes = [
  { path: '',
    redirectTo: '/libraries',
    pathMatch: 'full'
  },
  {
    path: 'libraries',
    component: LibrariesListComponent
  },
  {
    path: 'library-details/:library',
    component: LibraryDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
