import { TestBed, inject } from '@angular/core/testing';

import { RootClassesService } from './root-classes.service';

describe('RootClassesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RootClassesService]
    });
  });

  it('should be created', inject([RootClassesService], (service: RootClassesService) => {
    expect(service).toBeTruthy();
  }));
});
