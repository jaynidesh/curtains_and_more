import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OurCollaboratorsPageRoutingModule } from './our-collaborators-routing.module';

import { OurCollaboratorsPage } from './our-collaborators.page';
import { AccordionComponent } from '../../components/accordion/accordion.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OurCollaboratorsPageRoutingModule
  ],
  declarations: [OurCollaboratorsPage, AccordionComponent]
})
export class OurCollaboratorsPageModule {}
