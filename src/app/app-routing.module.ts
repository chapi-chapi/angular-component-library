import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './pages/components/components.component';
import { ComponentDetailsComponent } from './pages/component-details/component-details.component';


const routes: Routes = [
  {
    path: 'components',
    component: ComponentsComponent
  },
  {
    path: 'component-details',
    component: ComponentDetailsComponent
  }
  // ,
  // { path: '',
  //   redirectTo: '/components',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
