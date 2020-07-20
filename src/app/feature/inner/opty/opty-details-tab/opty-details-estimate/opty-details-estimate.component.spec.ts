import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsEstimateComponent } from './opty-details-estimate.component';

describe('OptyDetailsEstimateComponent', () => {
  let component: OptyDetailsEstimateComponent;
  let fixture: ComponentFixture<OptyDetailsEstimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsEstimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
