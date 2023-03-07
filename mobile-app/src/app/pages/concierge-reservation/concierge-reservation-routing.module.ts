import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConciergeReservationPage } from './concierge-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ConciergeReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConciergeReservationPageRoutingModule {}
