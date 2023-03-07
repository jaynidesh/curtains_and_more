import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPrivilegePage } from './view-privilege.page';

describe('ViewPrivilegePage', () => {
  let component: ViewPrivilegePage;
  let fixture: ComponentFixture<ViewPrivilegePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPrivilegePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPrivilegePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
