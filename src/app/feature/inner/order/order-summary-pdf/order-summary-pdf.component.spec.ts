import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryPdfComponent } from './order-summary-pdf.component';

describe('OrderSummaryPdfComponent', () => {
  let component: OrderSummaryPdfComponent;
  let fixture: ComponentFixture<OrderSummaryPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSummaryPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
