import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyTimelineComponent } from './opty-timeline.component';

describe('OptyTimelineComponent', () => {
  let component: OptyTimelineComponent;
  let fixture: ComponentFixture<OptyTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
