import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourPrivilegesPageRoutingModule } from './your-privileges-routing.module';

import { YourPrivilegesPage } from './your-privileges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourPrivilegesPageRoutingModule
  ],
  declarations: [YourPrivilegesPage]
})
export class YourPrivilegesPageModule {}
