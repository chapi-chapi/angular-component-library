import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/components/components.component';


const routes: Routes = [
  {
    path: 'components',
    component: ProductsComponent
  },
  { path: '',
    redirectTo: '/components',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
