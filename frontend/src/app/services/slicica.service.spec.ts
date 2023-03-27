import { TestBed } from '@angular/core/testing';

import { SlicicaService } from './slicica.service';

describe('SlicicaService', () => {
  let service: SlicicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlicicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
