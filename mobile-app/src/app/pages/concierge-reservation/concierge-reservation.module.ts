import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConciergeReservationPageRoutingModule } from './concierge-reservation-routing.module';

import { ConciergeReservationPage } from './concierge-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConciergeReservationPageRoutingModule
  ],
  declarations: [ConciergeReservationPage]
})
export class ConciergeReservationPageModule {}
