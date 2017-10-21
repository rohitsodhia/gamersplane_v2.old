import { TestBed, inject } from '@angular/core/testing';

import { GlobalResolverService } from './global-resolver.service';

describe('GlobalResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalResolverService]
    });
  });

  it('should be created', inject([GlobalResolverService], (service: GlobalResolverService) => {
    expect(service).toBeTruthy();
  }));
});
