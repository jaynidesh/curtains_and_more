import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmblemPage } from './emblem.page';

const routes: Routes = [
  {
    path: '',
    component: EmblemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmblemPageRoutingModule {}
