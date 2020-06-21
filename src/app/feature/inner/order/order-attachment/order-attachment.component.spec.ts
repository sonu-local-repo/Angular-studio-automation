import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAttachmentComponent } from './order-attachment.component';

describe('OrderAttachmentComponent', () => {
  let component: OrderAttachmentComponent;
  let fixture: ComponentFixture<OrderAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
