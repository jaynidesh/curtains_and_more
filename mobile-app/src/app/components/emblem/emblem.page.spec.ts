import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmblemPage } from './emblem.page';

describe('EmblemPage', () => {
  let component: EmblemPage;
  let fixture: ComponentFixture<EmblemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmblemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmblemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
