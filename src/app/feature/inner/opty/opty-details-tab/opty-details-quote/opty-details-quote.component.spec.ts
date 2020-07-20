import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptyDetailsQuoteComponent } from './opty-details-quote.component';

describe('OptyDetailsQuoteComponent', () => {
  let component: OptyDetailsQuoteComponent;
  let fixture: ComponentFixture<OptyDetailsQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptyDetailsQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptyDetailsQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
