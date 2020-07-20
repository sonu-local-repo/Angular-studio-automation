import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsSidepanelComponent } from './opty-details-sidepanel.component';

describe('OptyDetailsSidepanelComponent', () => {
  let component: OptyDetailsSidepanelComponent;
  let fixture: ComponentFixture<OptyDetailsSidepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsSidepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsSidepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
