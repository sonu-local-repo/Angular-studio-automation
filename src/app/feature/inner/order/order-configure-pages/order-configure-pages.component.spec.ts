import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderConfigurePagesComponent } from './order-configure-pages.component';

describe('OrderConfigurePagesComponent', () => {
  let component: OrderConfigurePagesComponent;
  let fixture: ComponentFixture<OrderConfigurePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderConfigurePagesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfigurePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
