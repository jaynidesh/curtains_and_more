import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: 'before-login',
    loadChildren: () => import('./pages/before-login/before-login.module').then( m => m.BeforeLoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/footer-menu/footer-menu.module').then( m => m.FooterMenuPageModule)
  },
  {
    path: 'your-privileges',
    loadChildren: () => import('./pages/your-privileges/your-privileges.module').then( m => m.YourPrivilegesPageModule)
  },
  {
    path: 'le-clubhouse',
    loadChildren: () => import('./pages/le-clubhouse/le-clubhouse.module').then( m => m.LeClubhousePageModule)
  },
  {
    path: 'concierge-reservation',
    loadChildren: () => import('./pages/concierge-reservation/concierge-reservation.module').then( m => m.ConciergeReservationPageModule)
  },
  {
    path: 'our-collaborators',
    loadChildren: () => import('./pages/our-collaborators/our-collaborators.module').then( m => m.OurCollaboratorsPageModule)
  },
  {
    path: 'le-showroom-prive',
    loadChildren: () => import('./pages/le-showroom-prive/le-showroom-prive.module').then( m => m.LeShowroomPrivePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'emblem',
    loadChildren: () => import('./components/emblem/emblem.module').then( m => m.EmblemPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'exclusive-access',
    loadChildren: () => import('./pages/exclusive-access/exclusive-access.module').then( m => m.ExclusiveAccessPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
