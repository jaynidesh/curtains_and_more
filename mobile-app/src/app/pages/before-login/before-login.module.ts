import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeforeLoginPageRoutingModule } from './before-login-routing.module';

import { BeforeLoginPage } from './before-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeforeLoginPageRoutingModule
  ],
  declarations: [BeforeLoginPage]
})
export class BeforeLoginPageModule {}
