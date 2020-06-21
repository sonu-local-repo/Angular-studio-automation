import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListTableViewComponent } from './employee-list-table-view.component';

describe('EmployeeListTableViewComponent', () => {
  let component: EmployeeListTableViewComponent;
  let fixture: ComponentFixture<EmployeeListTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeListTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
