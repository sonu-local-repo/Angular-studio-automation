import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListTableViewComponent } from './order-list-table-view.component';

describe('OrderListTableViewComponent', () => {
  let component: OrderListTableViewComponent;
  let fixture: ComponentFixture<OrderListTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
