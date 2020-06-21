import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetRedirectComponent } from './password-reset-redirect.component';

describe('PasswordResetRedirectComponent', () => {
  let component: PasswordResetRedirectComponent;
  let fixture: ComponentFixture<PasswordResetRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordResetRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
