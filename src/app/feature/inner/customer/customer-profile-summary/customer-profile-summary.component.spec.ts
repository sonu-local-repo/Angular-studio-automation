import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProfileSummaryComponent } from './customer-profile-summary.component';

describe('CustomerProfileSummaryComponent', () => {
  let component: CustomerProfileSummaryComponent;
  let fixture: ComponentFixture<CustomerProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProfileSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
