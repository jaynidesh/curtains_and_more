import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeShowroomPrivePage } from './le-showroom-prive.page';

const routes: Routes = [
  {
    path: '',
    component: LeShowroomPrivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeShowroomPrivePageRoutingModule {}
