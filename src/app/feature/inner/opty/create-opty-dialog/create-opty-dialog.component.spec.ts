import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOptyDialogComponent } from './create-opty-dialog.component';

describe('CreateOptyDialogComponent', () => {
  let component: CreateOptyDialogComponent;
  let fixture: ComponentFixture<CreateOptyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOptyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
