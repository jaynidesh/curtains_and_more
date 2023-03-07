import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewExclusiveAccessPage } from './view-exclusive-access.page';

const routes: Routes = [
  {
    path: '',
    component: ViewExclusiveAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewExclusiveAccessPageRoutingModule {}
