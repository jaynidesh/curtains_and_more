import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmblemPageRoutingModule } from './emblem-routing.module';

import { EmblemPage } from './emblem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmblemPageRoutingModule
  ],
  declarations: [EmblemPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class EmblemPageModule {}
