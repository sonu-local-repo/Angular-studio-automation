import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseItemModalComponent } from './choose-item-modal.component';

describe('ChooseItemModalComponent', () => {
  let component: ChooseItemModalComponent;
  let fixture: ComponentFixture<ChooseItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseItemModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
