import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembershipPageRoutingModule } from './membership-routing.module';

import { MembershipPage } from './membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembershipPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MembershipPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MembershipPageModule {}
