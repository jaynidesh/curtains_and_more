import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoisyLesBainsResortClubhousePage } from './choisy-les-bains-resort-clubhouse.page';

const routes: Routes = [
  {
    path: '',
    component: ChoisyLesBainsResortClubhousePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoisyLesBainsResortClubhousePageRoutingModule {}
