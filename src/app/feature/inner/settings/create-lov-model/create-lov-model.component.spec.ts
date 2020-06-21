import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLovModelComponent } from './create-lov-model.component';

describe('CreateLovModelComponent', () => {
  let component: CreateLovModelComponent;
  let fixture: ComponentFixture<CreateLovModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLovModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLovModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
