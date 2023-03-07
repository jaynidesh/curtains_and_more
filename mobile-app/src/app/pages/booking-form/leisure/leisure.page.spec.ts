import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeisurePage } from './leisure.page';

describe('LeisurePage', () => {
  let component: LeisurePage;
  let fixture: ComponentFixture<LeisurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeisurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeisurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
