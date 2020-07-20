import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsJobsComponent } from './opty-details-jobs.component';

describe('OptyDetailsJobsComponent', () => {
  let component: OptyDetailsJobsComponent;
  let fixture: ComponentFixture<OptyDetailsJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
