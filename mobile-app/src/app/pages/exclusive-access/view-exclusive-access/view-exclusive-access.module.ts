import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewExclusiveAccessPageRoutingModule } from './view-exclusive-access-routing.module';

import { ViewExclusiveAccessPage } from './view-exclusive-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewExclusiveAccessPageRoutingModule
  ],
  declarations: [ViewExclusiveAccessPage]
})
export class ViewExclusiveAccessPageModule {}
