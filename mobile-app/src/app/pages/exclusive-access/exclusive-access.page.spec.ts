import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExclusiveAccessPage } from './exclusive-access.page';

describe('ExclusiveAccessPage', () => {
  let component: ExclusiveAccessPage;
  let fixture: ComponentFixture<ExclusiveAccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExclusiveAccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExclusiveAccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
