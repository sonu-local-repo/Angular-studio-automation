import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileSummaryComponent } from './employee-profile-summary.component';

describe('EmployeeProfileSummaryComponent', () => {
  let component: EmployeeProfileSummaryComponent;
  let fixture: ComponentFixture<EmployeeProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeProfileSummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
