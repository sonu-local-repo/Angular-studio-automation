import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOrderDetailsComponent } from './task-order-details.component';

describe('TaskOrderDetailsComponent', () => {
  let component: TaskOrderDetailsComponent;
  let fixture: ComponentFixture<TaskOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
