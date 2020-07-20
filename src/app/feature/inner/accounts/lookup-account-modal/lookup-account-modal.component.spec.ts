import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupAccountModalComponent } from './lookup-account-modal.component';

describe('LookupAccountModalComponent', () => {
  let component: LookupAccountModalComponent;
  let fixture: ComponentFixture<LookupAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
