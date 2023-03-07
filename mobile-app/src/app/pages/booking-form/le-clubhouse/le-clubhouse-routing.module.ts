import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeClubhousePage } from './le-clubhouse.page';

const routes: Routes = [
  {
    path: '',
    component: LeClubhousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeClubhousePageRoutingModule {}
