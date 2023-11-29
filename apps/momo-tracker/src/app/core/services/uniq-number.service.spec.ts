import { TestBed } from '@angular/core/testing';

import { UniqNumberService } from './uniq-number.service';

describe('UniqNumberService', () => {
  let service: UniqNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
