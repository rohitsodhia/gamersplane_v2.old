import { TestBed, inject } from '@angular/core/testing';

import { PmService } from './pm.service';

describe('PmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PmService]
    });
  });

  it('should be created', inject([PmService], (service: PmService) => {
    expect(service).toBeTruthy();
  }));
});
