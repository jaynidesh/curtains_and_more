import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoisyLesBainsResortClubhousePageRoutingModule } from './choisy-les-bains-resort-clubhouse-routing.module';

import { ChoisyLesBainsResortClubhousePage } from './choisy-les-bains-resort-clubhouse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoisyLesBainsResortClubhousePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChoisyLesBainsResortClubhousePage]
})
export class ChoisyLesBainsResortClubhousePageModule {}
