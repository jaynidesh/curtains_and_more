import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeforeLoginPage } from './before-login.page';

const routes: Routes = [
  {
    path: '',
    component: BeforeLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeforeLoginPageRoutingModule {}
