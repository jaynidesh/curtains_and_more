import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourPrivilegesPage } from './your-privileges.page';

const routes: Routes = [
  {
    path: '',
    component: YourPrivilegesPage
  },
  {
    path: 'view-privilege/:id',
    loadChildren: () => import('./view-privilege/view-privilege.module').then( m => m.ViewPrivilegePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourPrivilegesPageRoutingModule {}
