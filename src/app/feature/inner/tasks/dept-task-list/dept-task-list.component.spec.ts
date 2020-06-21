import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptTaskListComponent } from './dept-task-list.component';

describe('DeptTaskListComponent', () => {
  let component: DeptTaskListComponent;
  let fixture: ComponentFixture<DeptTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
