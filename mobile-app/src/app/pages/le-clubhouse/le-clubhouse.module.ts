import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeClubhousePageRoutingModule } from './le-clubhouse-routing.module';

import { LeClubhousePage } from './le-clubhouse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeClubhousePageRoutingModule
  ],
  declarations: [LeClubhousePage]
})
export class LeClubhousePageModule {}
