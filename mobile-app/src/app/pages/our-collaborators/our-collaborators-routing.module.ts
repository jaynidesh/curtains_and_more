import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OurCollaboratorsPage } from './our-collaborators.page';

const routes: Routes = [
  {
    path: '',
    component: OurCollaboratorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurCollaboratorsPageRoutingModule {}
