import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTasksComponent } from './order-tasks.component';

describe('OrderTasksComponent', () => {
  let component: OrderTasksComponent;
  let fixture: ComponentFixture<OrderTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
