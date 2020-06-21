import { TestBed } from '@angular/core/testing';

import { SomethingWentWrongService } from './something-went-wrong.service';

describe('SomethingWentWrongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SomethingWentWrongService = TestBed.get(SomethingWentWrongService);
    expect(service).toBeTruthy();
  });
});
