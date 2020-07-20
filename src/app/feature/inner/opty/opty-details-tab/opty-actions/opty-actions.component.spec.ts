import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyActionsComponent } from './opty-actions.component';

describe('OptyActionsComponent', () => {
  let component: OptyActionsComponent;
  let fixture: ComponentFixture<OptyActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
