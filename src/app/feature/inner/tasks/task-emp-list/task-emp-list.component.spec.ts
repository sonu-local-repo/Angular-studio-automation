import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEmpListComponent } from './task-emp-list.component';

describe('TaskEmpListComponent', () => {
  let component: TaskEmpListComponent;
  let fixture: ComponentFixture<TaskEmpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskEmpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEmpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
