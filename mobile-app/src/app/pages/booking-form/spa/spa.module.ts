import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpaPageRoutingModule } from './spa-routing.module';

import { SpaPage } from './spa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SpaPage]
})
export class SpaPageModule {}
