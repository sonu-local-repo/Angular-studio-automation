import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsSubtabComponent } from './opty-details-subtab.component';

describe('OptyDetailsSubtabComponent', () => {
  let component: OptyDetailsSubtabComponent;
  let fixture: ComponentFixture<OptyDetailsSubtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsSubtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsSubtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
