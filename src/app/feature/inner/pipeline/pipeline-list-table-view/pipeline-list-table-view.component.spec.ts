import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineListTableViewComponent } from './pipeline-list-table-view.component';

describe('PipelineListTableViewComponent', () => {
  let component: PipelineListTableViewComponent;
  let fixture: ComponentFixture<PipelineListTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipelineListTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineListTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
