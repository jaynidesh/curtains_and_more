import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeClubhousePage } from './le-clubhouse.page';

describe('LeClubhousePage', () => {
  let component: LeClubhousePage;
  let fixture: ComponentFixture<LeClubhousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeClubhousePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeClubhousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
