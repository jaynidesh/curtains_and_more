import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExclusiveAccessPageRoutingModule } from './exclusive-access-routing.module';

import { ExclusiveAccessPage } from './exclusive-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExclusiveAccessPageRoutingModule
  ],
  declarations: [ExclusiveAccessPage]
})
export class ExclusiveAccessPageModule {}
