import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsScheduleComponent } from './opty-details-schedule.component';

describe('OptyDetailsScheduleComponent', () => {
  let component: OptyDetailsScheduleComponent;
  let fixture: ComponentFixture<OptyDetailsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
