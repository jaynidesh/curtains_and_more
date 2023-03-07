import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConciergeReservationPage } from './concierge-reservation.page';

describe('ConciergeReservationPage', () => {
  let component: ConciergeReservationPage;
  let fixture: ComponentFixture<ConciergeReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciergeReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConciergeReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
