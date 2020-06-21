import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWorkflowComponent } from './order-workflow.component';

describe('OrderWorkflowComponent', () => {
  let component: OrderWorkflowComponent;
  let fixture: ComponentFixture<OrderWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
