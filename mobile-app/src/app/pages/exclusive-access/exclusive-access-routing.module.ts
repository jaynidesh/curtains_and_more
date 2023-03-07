import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExclusiveAccessPage } from './exclusive-access.page';

const routes: Routes = [
  {
    path: '',
    component: ExclusiveAccessPage
  },
  {
    path: ':id',
    loadChildren: () => import('./view-exclusive-access/view-exclusive-access.module').then( m => m.ViewExclusiveAccessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExclusiveAccessPageRoutingModule {}
