import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembershipPage } from './membership.page';

const routes: Routes = [
  {
    path: '',
    component: MembershipPage
  },
  {
    path: 'view-membership/:id',
    loadChildren: () => import('./view-membership/view-membership.module').then( m => m.ViewMembershipPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipPageRoutingModule {}
