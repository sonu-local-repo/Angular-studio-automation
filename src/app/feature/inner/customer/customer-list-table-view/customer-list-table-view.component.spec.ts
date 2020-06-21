import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListTableViewComponent } from './customer-list-table-view.component';

describe('CustomerListTableViewComponent', () => {
  let component: CustomerListTableViewComponent;
  let fixture: ComponentFixture<CustomerListTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
