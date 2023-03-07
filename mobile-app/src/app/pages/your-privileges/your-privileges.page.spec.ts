import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YourPrivilegesPage } from './your-privileges.page';

describe('YourPrivilegesPage', () => {
  let component: YourPrivilegesPage;
  let fixture: ComponentFixture<YourPrivilegesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourPrivilegesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YourPrivilegesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
