import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPrivilegePage } from './view-privilege.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPrivilegePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPrivilegePageRoutingModule {}
