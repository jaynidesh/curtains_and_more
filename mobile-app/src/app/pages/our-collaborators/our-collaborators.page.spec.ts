import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OurCollaboratorsPage } from './our-collaborators.page';

describe('OurCollaboratorsPage', () => {
  let component: OurCollaboratorsPage;
  let fixture: ComponentFixture<OurCollaboratorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurCollaboratorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OurCollaboratorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
