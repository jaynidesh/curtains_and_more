import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeisurePage } from './leisure.page';

const routes: Routes = [
  {
    path: '',
    component: LeisurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeisurePageRoutingModule {}
