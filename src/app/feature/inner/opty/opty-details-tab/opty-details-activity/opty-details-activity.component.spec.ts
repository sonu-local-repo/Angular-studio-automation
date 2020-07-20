import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsActivityComponent } from './opty-details-activity.component';

describe('OptyDetailsActivityComponent', () => {
  let component: OptyDetailsActivityComponent;
  let fixture: ComponentFixture<OptyDetailsActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
