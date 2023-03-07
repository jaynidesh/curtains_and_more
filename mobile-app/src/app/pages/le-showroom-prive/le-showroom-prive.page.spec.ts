import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeShowroomPrivePage } from './le-showroom-prive.page';

describe('LeShowroomPrivePage', () => {
  let component: LeShowroomPrivePage;
  let fixture: ComponentFixture<LeShowroomPrivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeShowroomPrivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeShowroomPrivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
