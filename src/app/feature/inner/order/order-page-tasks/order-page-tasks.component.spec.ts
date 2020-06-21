import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPageTasksComponent } from './order-page-tasks.component';

describe('OrderPageTasksComponent', () => {
  let component: OrderPageTasksComponent;
  let fixture: ComponentFixture<OrderPageTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPageTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPageTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
