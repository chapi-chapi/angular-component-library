import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { TimeagoModule } from "ngx-timeago";

import { ChapiChapiCardComponent } from './card/card.component';
import { ChapiChapiCardListComponent } from './card-list/card-list.component';

@NgModule({
  declarations: [ChapiChapiCardComponent, ChapiChapiCardListComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    TimeagoModule
  ],
  exports: [
    ChapiChapiCardComponent,
    ChapiChapiCardListComponent
  ]
})
export class ChapiChapiCardModule { }
