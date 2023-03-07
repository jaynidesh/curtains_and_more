import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FooterMenuPage } from './footer-menu.page';


const routes: Routes = [
  {
    path: '',
    component: FooterMenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule),
    // canActivate: [AuthGuard],
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../../pages/events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'my-profile',
        loadChildren: () => import('../../pages/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('../../pages/contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'membership',
        loadChildren: () => import('../../pages/membership/membership.module').then( m => m.MembershipPageModule)
      },
      {
        path: 'membership/:id',
        loadChildren: () => import('../../pages/membership/membership.module').then( m => m.MembershipPageModule)
      },
      {
        path: 'exclusive-access',
        loadChildren: () => import('../../pages/exclusive-access/exclusive-access.module').then( m => m.ExclusiveAccessPageModule)
      },
      {
        path: 'your-privileges',
        loadChildren: () => import('../../pages/your-privileges/your-privileges.module').then( m => m.YourPrivilegesPageModule)
      },
      {
        path: 'concierge-reservation',
        loadChildren: () => import('../../pages/concierge-reservation/concierge-reservation.module').then( m => m.ConciergeReservationPageModule)
      },
      {
        path: 'our-collaborators',
        loadChildren: () => import('../../pages/our-collaborators/our-collaborators.module').then( m => m.OurCollaboratorsPageModule)
      },
      {
        path: 'booking',
          children: [
            {
              path: '',
              redirectTo: '/tabs/concierge-reservation',
              pathMatch: 'full'
            },
            {
              path: 'hotel',
              loadChildren: () => import('../../pages/booking-form/hotel/hotel.module').then( m => m.HotelPageModule)
            },
            {
              path: 'spa',
              loadChildren: () => import('../../pages/booking-form/spa/spa.module').then( m => m.SpaPageModule)
            },
            {
              path: 'restaurant',
              loadChildren: () => import('../../pages/booking-form/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
            },
            {
              path: 'leisure',
              loadChildren: () => import('../../pages/booking-form/leisure/leisure.module').then( m => m.LeisurePageModule)
            },
            {
              path: 'choisy-les-bains-resort-clubhouse',
              loadChildren: () => import('../../pages/booking-form/choisy-les-bains-resort-clubhouse/choisy-les-bains-resort-clubhouse.module').then( m => m.ChoisyLesBainsResortClubhousePageModule)
            },
            {
              path: 'le-clubhouse',
              loadChildren: () => import('../../pages/booking-form/le-clubhouse/le-clubhouse.module').then( m => m.LeClubhousePageModule)
            }
          ],
      },
      
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FooterMenuPageRoutingModule {}
