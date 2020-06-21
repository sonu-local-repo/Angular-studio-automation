import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEffectsComponent } from './order-effects.component';

describe('OrderEffectsComponent', () => {
  let component: OrderEffectsComponent;
  let fixture: ComponentFixture<OrderEffectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEffectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
