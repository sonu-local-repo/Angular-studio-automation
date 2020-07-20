import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsInvoiceComponent } from './opty-details-invoice.component';

describe('OptyDetailsInvoiceComponent', () => {
  let component: OptyDetailsInvoiceComponent;
  let fixture: ComponentFixture<OptyDetailsInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
