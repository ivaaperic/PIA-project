import { TestBed } from '@angular/core/testing';

import { ZaduzenaKnjigaService } from './zaduzena-knjiga.service';

describe('ZaduzenaKnjigaService', () => {
  let service: ZaduzenaKnjigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZaduzenaKnjigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
