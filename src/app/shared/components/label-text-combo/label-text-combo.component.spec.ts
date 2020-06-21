import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTextComboComponent } from './label-text-combo.component';

describe('LabelTextComboComponent', () => {
  let component: LabelTextComboComponent;
  let fixture: ComponentFixture<LabelTextComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelTextComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTextComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
