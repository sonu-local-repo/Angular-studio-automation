import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyJobDetailsComponent } from './opty-job-details.component';

describe('OptyJobDetailsComponent', () => {
  let component: OptyJobDetailsComponent;
  let fixture: ComponentFixture<OptyJobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyJobDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
