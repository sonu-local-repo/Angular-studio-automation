import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsTabComponent } from './opty-details-tab.component';

describe('OptyDetailsTabComponent', () => {
  let component: OptyDetailsTabComponent;
  let fixture: ComponentFixture<OptyDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
