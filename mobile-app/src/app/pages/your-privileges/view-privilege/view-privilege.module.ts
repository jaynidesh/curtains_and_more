import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPrivilegePageRoutingModule } from './view-privilege-routing.module';

import { ViewPrivilegePage } from './view-privilege.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPrivilegePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [ViewPrivilegePage]
})
export class ViewPrivilegePageModule {}
