import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FooterMenuPageRoutingModule } from './footer-menu-routing.module';

import { FooterMenuPage } from './footer-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FooterMenuPageRoutingModule
  ],
  declarations: [FooterMenuPage]
})
export class FooterMenuPageModule {}
