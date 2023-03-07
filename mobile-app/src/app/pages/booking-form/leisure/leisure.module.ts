import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeisurePageRoutingModule } from './leisure-routing.module';

import { LeisurePage } from './leisure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeisurePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LeisurePage]
})
export class LeisurePageModule {}
