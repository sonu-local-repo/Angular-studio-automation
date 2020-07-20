import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsViewComponent } from './opty-details-view.component';

describe('OptyDetailsViewComponent', () => {
  let component: OptyDetailsViewComponent;
  let fixture: ComponentFixture<OptyDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
