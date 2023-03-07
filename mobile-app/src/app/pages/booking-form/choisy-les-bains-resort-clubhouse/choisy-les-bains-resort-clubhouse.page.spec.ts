import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoisyLesBainsResortClubhousePage } from './choisy-les-bains-resort-clubhouse.page';

describe('ChoisyLesBainsResortClubhousePage', () => {
  let component: ChoisyLesBainsResortClubhousePage;
  let fixture: ComponentFixture<ChoisyLesBainsResortClubhousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisyLesBainsResortClubhousePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoisyLesBainsResortClubhousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
