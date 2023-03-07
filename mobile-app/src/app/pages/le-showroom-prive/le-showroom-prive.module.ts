import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeShowroomPrivePageRoutingModule } from './le-showroom-prive-routing.module';

import { LeShowroomPrivePage } from './le-showroom-prive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeShowroomPrivePageRoutingModule
  ],
  declarations: [LeShowroomPrivePage]
})
export class LeShowroomPrivePageModule {}
