import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMembershipPageRoutingModule } from './view-membership-routing.module';

import { ViewMembershipPage } from './view-membership.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMembershipPageRoutingModule
  ],
  declarations: [ViewMembershipPage]
})
export class ViewMembershipPageModule {}
