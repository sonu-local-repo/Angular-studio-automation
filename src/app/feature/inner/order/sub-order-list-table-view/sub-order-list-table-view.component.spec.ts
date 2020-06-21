import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrderListTableViewComponent } from './sub-order-list-table-view.component';

describe('SubOrderListTableViewComponent', () => {
  let component: SubOrderListTableViewComponent;
  let fixture: ComponentFixture<SubOrderListTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubOrderListTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubOrderListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
