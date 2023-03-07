import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewExclusiveAccessPage } from './view-exclusive-access.page';

describe('ViewExclusiveAccessPage', () => {
  let component: ViewExclusiveAccessPage;
  let fixture: ComponentFixture<ViewExclusiveAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExclusiveAccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewExclusiveAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
