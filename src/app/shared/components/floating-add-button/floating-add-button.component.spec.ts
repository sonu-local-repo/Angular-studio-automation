import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingAddButtonComponent } from './floating-add-button.component';

describe('FloatingAddButtonComponent', () => {
  let component: FloatingAddButtonComponent;
  let fixture: ComponentFixture<FloatingAddButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingAddButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
