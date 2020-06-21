import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProfileSummaryComponent } from './order-profile-summary.component';

describe('OrderProfileSummaryComponent', () => {
  let component: OrderProfileSummaryComponent;
  let fixture: ComponentFixture<OrderProfileSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProfileSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProfileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
