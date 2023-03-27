import { TestBed } from '@angular/core/testing';

import { CitalacService } from './citalac.service';

describe('CitalacService', () => {
  let service: CitalacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitalacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
