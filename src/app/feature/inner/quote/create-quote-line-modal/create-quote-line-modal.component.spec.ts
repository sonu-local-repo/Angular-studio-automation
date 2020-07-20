import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuoteLineModalComponent } from './create-quote-line-modal.component';

describe('CreateQuoteLineModalComponent', () => {
  let component: CreateQuoteLineModalComponent;
  let fixture: ComponentFixture<CreateQuoteLineModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuoteLineModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuoteLineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
