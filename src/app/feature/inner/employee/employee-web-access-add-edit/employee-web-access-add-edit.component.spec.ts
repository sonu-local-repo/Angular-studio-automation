import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWebAccessAddEditComponent } from './employee-web-access-add-edit.component';

describe('EmployeeWebAccessAddEditComponent', () => {
  let component: EmployeeWebAccessAddEditComponent;
  let fixture: ComponentFixture<EmployeeWebAccessAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWebAccessAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWebAccessAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
