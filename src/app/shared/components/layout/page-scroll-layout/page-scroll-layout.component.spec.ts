import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageScrollLayoutComponent } from './page-scroll-layout.component';

describe('PageScrollLayoutComponent', () => {
  let component: PageScrollLayoutComponent;
  let fixture: ComponentFixture<PageScrollLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageScrollLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageScrollLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
