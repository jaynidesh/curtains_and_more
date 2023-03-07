import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FooterMenuPage } from './footer-menu.page';

describe('FooterMenuPage', () => {
  let component: FooterMenuPage;
  let fixture: ComponentFixture<FooterMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
